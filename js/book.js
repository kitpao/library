export default class Book {
  constructor(author, title, pages = 0, read = false) {
    return {
      author, title, pages, read,
    };
  }
}