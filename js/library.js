class LibraryClass {
  myLibrary = {};

  #id = 0;

  #containerTable = document.querySelector('.library-body');

  #modalForm = document.querySelector('.modal');

  #submitBtn = document.querySelector('.btn-submit');

  #callingBtn = document.querySelector('.btn-cancel');

  #showBtn = document.querySelector('.btn-show');


  #Book = (author, title, pages = 0, read = false) => {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  };

  #resetFields = () => {
    const form = document.forms[0];

    form.reset();
  };

  #deleteBook = (row) => {
    const bookIndexToDelete = row.getAttribute('data-index');
    delete this.myLibrary[bookIndexToDelete];
    this.#containerTable.removeChild(row);
  };

  #createDeleteBtn = (row) => {
    const deleteButton = document.createElement('a');
    const column = document.createElement('td');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'red', 'lighten-3', 'waves-effect', 'waves-light');

    column.appendChild(deleteButton);
    row.appendChild(column);

    deleteButton.addEventListener('click', this.#deleteBook.bind(this, row));
  };

  #notReadStyling = (buttonIcon, icon, book) => {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'red', 'accent-2', 'btn');
    buttonIcon.classList.remove('green');
    buttonIcon.textContent = 'Not read';
    icon.textContent = 'cancel';
    book.read = false;
  };

  #readStyling = (buttonIcon, icon, book) => {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'green', 'btn');
    buttonIcon.classList.remove('red', 'accent-2');
    buttonIcon.textContent = 'Read';
    icon.textContent = 'check_circle';
    book.read = true;
  }

  #toggler = (buttonIcon, icon, book, readColumn) => {
    buttonIcon.addEventListener('click', () => {
      if (book.read) {
        this.#notReadStyling(buttonIcon, icon, book);
      } else {
        this.#readStyling(buttonIcon, icon, book);
      }
      buttonIcon.appendChild(icon);
      readColumn.appendChild(buttonIcon);
    });
  }

  #iconize = (readColumn, book) => {
    const buttonIcon = document.createElement('a');
    const icon = document.createElement('i');

    icon.classList.add('material-icons', 'right');

    if (book.read) {
      this.#readStyling(buttonIcon, icon, book);
    } else {
      this.#notReadStyling(buttonIcon, icon, book);
    }

    buttonIcon.appendChild(icon);
    readColumn.appendChild(buttonIcon);

    this.#toggler(buttonIcon, icon, book, readColumn);
  }

  #generateBookHTML = (book) => {
    const row = document.createElement('tr');

    const {
      author, title, pages, read,
    } = book;

    const bookInfo = [author, title, pages, read];

    row.setAttribute('data-index', this.#id);
    bookInfo.forEach(property => {
      const column = document.createElement('td');

      if (property !== true && property !== false) {
        column.textContent = property;
      }
      row.appendChild(column);
    });

    const readColumn = row.querySelector(':nth-child(4)');

    this.#iconize(readColumn, book);
    this.#createDeleteBtn(row);

    return row;
  }

  #addLastBook = () => {
    const lastBook = this.#generateBookHTML(this.myLibrary[this.#id]);
    this.#containerTable.appendChild(lastBook);
  }

  #hideForm = () => {
    this.#modalForm.classList.remove('modal-active');
  }

  #addBookToLibrary = (book) => {
    switch ('') {
      case book.title:
        this.#hideForm();
        return;
      case book.author:
        book.author = 'Anonymous';
        break;
      default:
        break;
    }
    this.myLibrary[this.#id] = book;
  }

  #createBook = (form) => {
    const book = this.#Book;

    book.author = (form.elements.author.value || 'Anonymous');
    book.title = form.elements.title.value;
    book.pages = +form.elements.pages.value;
    book.read = Boolean(+form.elements.read.value);

    return book;
  }

  #createAndSaveBook = () => {
    const form = document.forms[0];

    form.onsubmit = (e) => {
      e.preventDefault();

      const book = this.#createBook(form);
      if (book.title !== '') {
        this.#addBookToLibrary(book);
        this.#addLastBook();
        this.#id += 1;
      }
      this.#hideForm();
      this.#resetFields();
    };
  }

  #listenForCreateAndSaveBook = () => {
    this.#submitBtn.addEventListener('click', this.#createAndSaveBook);
  }

  #listenForHideForm = () => {
    this.#callingBtn.addEventListener('click', this.#hideForm);
  }

  #showForm = () => {
    this.#modalForm.classList.add('modal-active');
    this.#listenForHideForm();
    this.#listenForCreateAndSaveBook();
  }

  listenForShowForm = () => {
    this.#showBtn.addEventListener('click', this.#showForm);
  }

  displayLibrary = () => {
    const keys = Object.keys(this.myLibrary);
    if (keys) {
      keys.forEach(key => {
        const book = this.myLibrary[key];
        const eachBook = this.#generateBookHTML(book);
        this.#containerTable.appendChild(eachBook);
      });
    }
  }
}

const thisLibrary = new LibraryClass();
thisLibrary.displayLibrary();
thisLibrary.listenForShowForm();
