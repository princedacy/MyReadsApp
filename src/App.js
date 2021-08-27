import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
  };
  /**
   * @description This is a lifecycle that will be invoked whenever the component mounts
   * it will executes the function that fetches all books from an API
   */
  componentDidMount() {
    this.fetchBooks();
  }
  /**
   * @description This function fetches all books from API
   */
  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }));
    });
  };
  /**
   * @description This function updates the book shelves with the update API
   * @param {object} book Book to update
   * @param {string} shelf Shelf to update to
   * @returns returns a function to change the state of the book shelf
   */
  changeBookShelf = (book, shelf) => {
    if (shelf !== "none") {
      BooksAPI.update(book, shelf);
      return this.changeBookState(book, shelf);
    }
  };
  /**
   *
   * @returns returns a function that sets the state
   */
  changeBookState = (book, shelf) => {
    const { books } = this.state;
    const booksState = books.filter((b) => {
      return b.id !== book.id;
    });
    book.shelf = shelf;
    booksState.push(book);
    return this.setState({ books: booksState });
  };
  render() {
    const currentlyReading = this.state.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = this.state.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const read = this.state.books.filter((book) => book.shelf === "read");
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title={"Currently Reading"}
                  books={currentlyReading}
                  onChangeBookShelf={this.changeBookShelf}
                />
                <BookShelf
                  title={"Want to Read"}
                  books={wantToRead}
                  onChangeBookShelf={this.changeBookShelf}
                />
                <BookShelf
                  title={"Read"}
                  books={read}
                  onChangeBookShelf={this.changeBookShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
