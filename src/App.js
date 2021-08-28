import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import SearchBook from "./components/SearchBook";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    searchResults: [],
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

  /**
   * @description search the book from the API
   * @param {string} query
   */
  searchBook = (query) => {
    BooksAPI.search(query).then((searchResults) => {
      return this.setState({ searchResults });
    });
  };
  render() {
    const currentlyReading = this.state.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = this.state.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const read = this.state.books.filter((book) => book.shelf === "read");
    const searchResults = this.state.searchResults;
    console.log('search', this.state.searchResults)
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
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
              {/* <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
                </button>
              </div> */}
              <Link to="/search" className="open-search">
                Add a book
              </Link>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook
              searchBook={this.searchBook}
              searchResults={searchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
