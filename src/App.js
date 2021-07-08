import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelves from "./Components/Shelves";
import Search from "./Components/Search";
import Header from "./Components/Header";
import { Link, Route } from "react-router-dom";
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchedBooks: [],
    isLoading: true,
  };
  updateSearchComponentState = (state) => {
    this.setState({ showSearchPage: state });
  };

  componentDidMount() {
    BooksAPI.getAll().then((result) => this.setState({ books: result }));
  }
  changeCategory(selectedBook, shelfCategory) {
    BooksAPI.update(selectedBook, shelfCategory).then((result) => {
      selectedBook.shelf = shelfCategory;
    });
    let selectedBooks = this.state.books.filter(
      (book) => book.id !== selectedBook.id
    );
    selectedBooks.push(selectedBook);
    this.setState({ books: selectedBook });
    this.setState({ search: [] });
    this.componentDidMount();
  }

  searchQuery = (searchValue) => {
    if (searchValue.length !== 0) {
      BooksAPI.search(searchValue).then((searchedBooks) => {
        let searchValueResult = [];
        for (const searchBook of searchedBooks) {
          for (book of this.state.books) {
            if (searchBook.id === book.id) searchBook.shelf = book.shelf;
          }
        }
        searchValueResult.push(searchedBook);
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              {/* Header component*/}
              <Header />
              {/* Shelves Component*/}
              <Shelves
                booksFromAPI={this.state.books}
                changeCategory={this.changeCategory}
              />
              {/* Search component*/}
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              searchBooks={this.state.search}
              searchQuery={this.searchQuery}
              changeCategory={this.changeCategory}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
