import React from "react";
import { Link } from "react-router-dom";
import ShelfCategory from "./ShelfCategory";

class Search extends React.Component {
  render() {
    const { searchQuery } = this.props;
    console.log("Try ", this.props.searchBooks);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchBooks > 0 ? (
              this.props.searchBooks.map((book) => (
                <li key={book.id}>
                  <ShelfCategory
                    book={book}
                    changeCategory={this.props.changeCategory}
                  />
                </li>
              ))
            ) : (
              <li />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
