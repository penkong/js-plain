//
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//
class UI {
  addBookToList(book) {
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
  }

  showAlert(msg, cls) {
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
  }

  deleteItem(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// local storage class
class Store {
  static getBook() {
    let books;
    if (!localStorage.getItem('books')) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = Store.getBook();
    books.forEach(book => {
      const ui = new UI();
      // add book
      ui.addBookToList(book);
    });
  }

  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    //add to ls
    Store.addBook(book);
    //
    ui.showAlert('Book added!', 'success');
    // clear
    ui.clearFields();
  }
});

document.getElementById('book-list').addEventListener('click', e => {
  e.preventDefault();
  const ui = new UI();
  ui.deleteItem(e.target);
  // re ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('book removed', 'succes');
});
