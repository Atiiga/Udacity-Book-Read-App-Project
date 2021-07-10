import React from "react";
import CategorySelector from "./CategorySeclector";

class SearchedBooks extends React.Component {
  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                this.props.imageLinks ? book.imageLinks.thumbnail : "No Cover"
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <CategorySelector
              book={book}
              changeCategory={this.props.changeCategory}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default SearchedBooks;
