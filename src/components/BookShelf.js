import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
  };
  state = {};
  render() {
    const { title, books, onChangeBookShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book bookInfo={book} key={book.id} onChange={onChangeBookShelf}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
