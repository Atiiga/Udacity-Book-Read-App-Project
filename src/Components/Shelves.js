import React from "react";
// import * as BooksAPI from './BooksAPI'
//import "./App.css";
import ShelfCategory from "./ShelfCategory";

class Shelves extends React.Component {
  render() {
    const booksFromAPI = this.props.booksFromAPI;
    const currentlyReading = booksFromAPI.filter(
      (bookCategory) => bookCategory.shelf === "currentlyReading"
    );
    const wantToRead = booksFromAPI.filter(
      (bookCategory) => bookCategory.shelf === "wantToRead"
    );
    const read = booksFromAPI.filter(
      (bookCategory) => bookCategory.shelf === "read"
    );
    return (
      <div className="list-books-content">
        <div>
          {/*Shelf currently Reading*/}
          <ShelfCategory
            books={currentlyReading}
            changeCategory={this.props.changeCategory}
            title="Currently Reading"
          />

          {/*Shelf want to  Read*/}
          <ShelfCategory
            books={wantToRead}
            changeCategory={this.props.changeCategory}
            title="Want To Read"
          />

          {/*Shelf  Read*/}
          <ShelfCategory
            books={read}
            changeCategory={this.props.changeCategory}
            title="Read"
          />
        </div>
      </div>
    );
  }
}

export default Shelves;
