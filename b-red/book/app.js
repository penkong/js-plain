//
// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// ui constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // create el tr
  const row = document.createElement('tr');
  // insert col
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function(msg, cls) {
  const div = document.createElement('div');
  // add class
  div.className = `alert ${cls}`;
  // text
  div.appendChild(document.createTextNode(msg));
  // insert
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

UI.prototype.deleteItem = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  // validate
  if (title === '' || author === '' || isbn === '') {
    // err (msg, class)
    ui.showAlert('please fill all fields', 'error');
  } else {
    // add book to list
    ui.addBookToList(book);
    ui.showAlert('Book added!', 'success');
    // clear
    ui.clearFields();
  }
});

document.getElementById('book-list').addEventListener('click', e => {
  e.preventDefault();
  const ui = new UI();
  ui.deleteItem(e.target);
  ui.showAlert('book removed', 'succes');
});
