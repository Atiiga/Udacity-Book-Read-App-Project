import React from "react";
// import * as BooksAPI from './BooksAPI'
//import "./App.css";
import CategorySelector from "./CategorySeclector";

class ShelfCategory extends React.Component {
  render() {
    const ShelfCategoryBooks = this.props.books;
    //console.log("Shelf Category", this.props.CategorySelector);

    //const bookImage = ShelfCategoryBooks.
    return (
      /*Shelf currently Reading*/
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {ShelfCategoryBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${
                          book.imageLinks ? book.imageLinks.thumbnail : ""
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default ShelfCategory;
