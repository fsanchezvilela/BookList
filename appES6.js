class Book {
  constructor(title,author,isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
}

class UI{ 
  addBookToList(book){
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    console.log(row);
    //append 
    list.appendChild(row);
  }

  showAlert(message,className){
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

  deleteBook(target){
    if(target.className === 'delete'){
      //dom reversing
      //removemos el tr completo;
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value =""
    document.getElementById('author').value=""
    document.getElementById('isbn').value =""
  }

}

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

  console.log(ui);

  // validate
  if(title === ''|| author ==='' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields','error');
  } else {
    // Add book to list
    ui.addBookToList(book); 
    // Show success
    ui.showAlert('Book added!','success');
    // clear fields
    ui.clearFields()
    }

  console.log(ui);

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
  
  const ui = new UI();
  //delete Book
  ui.deleteBook(e.target);

  // show alert after delete
  ui.showAlert('Book Removed!','success');
  e.preventDefault();
})