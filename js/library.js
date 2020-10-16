// const myLibrary = [{
//   author: 'julio',
//   title: 'julio',
//   pages: 35,
//   read: true,
// },
// {
//   author: 'kitzia',
//   title: 'kitzia',
//   pages: 29,
//   read: true,
// }];
const myLibrary = [];

function Book(author = 'anonymous', title, pages = 0, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  return myLibrary;
}

function generateBookHTML(book) {
  const row = document.createElement('tr');
  const bookInfo = Object.values(book);

  bookInfo.forEach(property => {
    const column = document.createElement('td');
    column.textContent = property;
    row.appendChild(column);
  });

  return row;
}

function displayLibrary() { 
  const containerTable = document.querySelector('.library');
  myLibrary.forEach(book => {
    const eachBook = generateBookHTML(book);
    containerTable.appendChild(eachBook);
  });
}

function addLastBook() {
  const containerTable = document.querySelector('.library');

  const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

  containerTable.appendChild(lastBook);
}
function showForm() {
  const modalForm = document.querySelector('.modal');
  modalForm.classList.add('modal-active');
}

function hiddeForm() {
  const modalForm = document.querySelector('.modal');
  modalForm.classList.remove('modal-hidden');
}

function createBook() {
  const form = document.forms[0];

  form.onsubmit = function(e) {
    e.preventDefault();

    const book = new Book();

    book.author = form.elements.author.value;
    book.title = form.elements.title.value;
    book.pages = +form.elements.pages.value;
    book.read = Boolean(form.elements.read.value);

    addBookToLibrary(book);
    addLastBook();
    hiddeForm();
  };
}


displayLibrary();
