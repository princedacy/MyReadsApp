import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "../components/Book";

class SearchBook extends Component {
  static propTypes = {
    searchBook: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func
  };
  state = {
    searchText: "",
  };

  handleInput = (query) => {
    this.setState({
      searchText: query,
    });
  };
  
  render() {
    const { searchBook, searchResults, onChangeBookShelf } = this.props;
    const { searchText } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchText}
              onChange={(e) => {
                this.handleInput(e.target.value);
                searchBook(searchText);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length && searchText ? (
              searchResults.map((book) => (
                <Book bookInfo={book} key={book.id} onChange={onChangeBookShelf} />
              ))
            ) : (
              <h1>No results to show.</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
