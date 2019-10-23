//ES5 OOP book

// Book Constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor (methods to the ui)
function UI(){}

  // creando prototypos
  //agregando a la booklist
  UI.prototype.addBookTolist = function(book){

    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
  

    list.appendChild(row);
  }
  // Limpiando Campos
  UI.prototype.clearFields = function(){
    document.getElementById('title').value =""
    document.getElementById('author').value=""
    document.getElementById('isbn').value =""
  }
  // Mostrar Alertas
  UI.prototype.showAlert = function(message,className){
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    // Timeout after 3sec
    setTimeout(function(){
      document.querySelector('.alert').remove()
    },3000);
  }

  // Delete book
  UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
      //dom reversing
      //removemos el tr completo;
      target.parentElement.parentElement.remove();
    }
  }

// Local Storage Constructor
const Store = new Function()
  //set the static method; to the constructor;
  Store.getBooks = function(){
    let books;
    if(localStorage.getItem('books')=== null){
      books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;  
  }

  Store.displayBooks = function(){
    const books = Store.getBooks();  
    books.forEach(function(book){
      //instance the class to add book ui;
      const ui = new UI;
      // Add book to UI
      ui.addBookToList(book);
    });
  }

  Store.addBook = function(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }

  Store.removeBook = function(isbn){
    const books = Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1)
      }
    });

    localStorage.setItem('books',JSON.stringify(books))
  }

//set Store Class; 


//DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

// Event Listeners Add Book
document.getElementById('book-form').addEventListener('submit',function(e){
  // Get Form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book      
  const book = new Book(title,author,isbn);

  // Instantiate UI

  const ui = new UI();

  // validate
  if(title === ''|| author ==='' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields','error');
  } else {
    // Add book to list
    ui.addBookTolist(book); 
    // Store ADD book
    Store.addBook(book);
    // Show success
    ui.showAlert('Book added!','success');
    // clear fields
    ui.clearFields()
    }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
 
  const ui = new UI();
  //delete Book
  ui.deleteBook(e.target);
  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // show alert after delete
  ui.showAlert('Book Removed!','success');
  e.preventDefault();
})