import React, { Component } from "react";
import PropTypes from "prop-types";
class Book extends Component {
  _isMounted = false;
  static propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { bookInfo, onChange } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  bookInfo.imageLinks
                    ? bookInfo.imageLinks.smallThumbnail
                    : bookInfo.previewLink
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={bookInfo.shelf ? bookInfo.shelf : "none"}
                onChange={(e) => onChange(bookInfo, e.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookInfo.title}</div>
          <div className="book-authors">
            {bookInfo.authors &&
              bookInfo.authors.map((author, index) => (
                <span key={index}>{author}</span>
              ))}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
