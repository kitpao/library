class LibraryClass {

  constructor(){
    const myLibrary = {};
    let id = 0;
  }
  
  containerTable = document.querySelector('.library-body');
  modalForm = document.querySelector('.modal');
  submitBtn = document.querySelector('.btn-submit');
  callingBtn = document.querySelector('.btn-cancel');
  showBtn = document.querySelector('.btn-show');


  Book(author, title, pages = 0, read = false) {
    return {
      author, title, pages, read,
    };
  }

  resetFields() {
    const form = document.forms[0];

    form.reset();
  }

  deleteBook(row) {
    const bookIndexToDelete = row.getAttribute('data-index');
    delete myLibrary[bookIndexToDelete];
    containerTable.removeChild(row);
  }

  createDeleteBtn(row) {
    const deleteButton = document.createElement('a');
    const column = document.createElement('td');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'red', 'lighten-3', 'waves-effect', 'waves-light');

    column.appendChild(deleteButton);
    row.appendChild(column);

    deleteButton.addEventListener('click', deleteBook.bind(this, row));
  }

  notReadStyling(buttonIcon, icon, book) {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'red', 'accent-2', 'btn');
    buttonIcon.classList.remove('green');
    buttonIcon.textContent = 'Not read';
    icon.textContent = 'cancel';
    book.read = false;
  }

  readStyling(buttonIcon, icon, book) {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'green', 'btn');
    buttonIcon.classList.remove('red', 'accent-2');
    buttonIcon.textContent = 'Read';
    icon.textContent = 'check_circle';
    book.read = true;
  }

  toggler(buttonIcon, icon, book, readColumn) {
    buttonIcon.addEventListener('click', () => {
      if (book.read) {
        notReadStyling(buttonIcon, icon, book);
      } else {
        readStyling(buttonIcon, icon, book);
      }
      buttonIcon.appendChild(icon);
      readColumn.appendChild(buttonIcon);
    });
  }

  iconize(readColumn, book) {
    const buttonIcon = document.createElement('a');
    const icon = document.createElement('i');

    icon.classList.add('material-icons', 'right');

    if (book.read) {
      readStyling(buttonIcon, icon, book);
    } else {
      notReadStyling(buttonIcon, icon, book);
    }

    buttonIcon.appendChild(icon);
    readColumn.appendChild(buttonIcon);

    toggler(buttonIcon, icon, book, readColumn);
  }

  generateBookHTML(book) {
    const row = document.createElement('tr');

    const {
      author, title, pages, read,
    } = book;

    const bookInfo = [author, title, pages, read];

    row.setAttribute('data-index', id);
    bookInfo.forEach(property => {
      const column = document.createElement('td');

      if (property !== true && property !== false) {
        column.textContent = property;
      }
      row.appendChild(column);
    });

    const readColumn = row.querySelector(':nth-child(4)');

    iconize(readColumn, book);
    createDeleteBtn(row);

    return row;
  }

  addLastBook() {
    const lastBook = generateBookHTML(myLibrary[id]);
    containerTable.appendChild(lastBook);
  }

  hideForm() {
    modalForm.classList.remove('modal-active');
  }

  addBookToLibrary(book) {
    switch ('') {
      case book.title:
        hideForm();
        return;
      case book.author:
        book.author = 'Anonymous';
        break;
      default:
        break;
    }
    myLibrary[id] = book;
  }

  createBook(form) {
    const book = new Book();

    book.author = form.elements.author.value;
    book.title = form.elements.title.value;
    book.pages = +form.elements.pages.value;
    book.read = Boolean(+form.elements.read.value);

    return book;
  }

  createAndSaveBook() {
    const form = document.forms[0];

    form.onsubmit = (e) => {
      e.preventDefault();

      const book = createBook(form);
      if (book.title !== '') {
        addBookToLibrary(book);
        addLastBook();
        id += 1;
      }
      hideForm();
      resetFields();
    };
  }

  listenForCreateAndSaveBook() {
    submitBtn.addEventListener('click', createAndSaveBook);
  }

  listenForHideForm() {
    callingBtn.addEventListener('click', hideForm);
  }

  showForm() {
    modalForm.classList.add('modal-active');
    listenForHideForm();
    listenForCreateAndSaveBook();
  }

   listenForShowForm() {
    showBtn.addEventListener('click', showForm);
  }

  displayLibrary() {
    const keys = Object.keys(myLibrary);
    if (keys) {
      keys.forEach(key => {
        const book = myLibrary[key];
        const eachBook = generateBookHTML(book);
        containerTable.appendChild(eachBook);
      });
    }
  }
}

libraryModule.displayLibrary();
libraryModule.listenForShowForm();
