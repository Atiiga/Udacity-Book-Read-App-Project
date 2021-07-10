import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelves from "./Components/Shelves";
import Search from "./Components/Search";
import Header from "./Components/Header";
import { Link, Route } from "react-router-dom";
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.changeCategory = this.changeCategory.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
        isLoading: false,
      })
    );
  }

  //Fuction to search for a book(s)
  searchQuery = (searchValue) => {
    if (searchValue.length !== 0) {
      BooksAPI.search(searchValue)
        .then((searchedBooks) => {
          let searchValueResult = [];
          for (const searchBook of searchedBooks) {
            for (const book of this.state.books) {
              if (searchBook.id === book.id) searchBook.shelf = book.shelf;
            }
            searchValueResult.push(searchBook);
          }
          return searchValueResult;
        })
        .then((searchedBooks) => {
          this.setState((prevState) => ({ searchedBooks }));
        })
        .catch((searchBooks) => this.setState({ searchedBooks: [] }));
    } else {
      this.setState({ searchBooks: [] });
    }
  };
  //Fuction to move to or select book category
  changeCategory(selectedBook, shelfCategory) {
    BooksAPI.update(selectedBook, shelfCategory).then((result) => {
      selectedBook.shelf = shelfCategory;
    });
    let selectedBooks = this.state.books.filter(
      (book) => book.id !== selectedBook.id
    );
    selectedBooks.push(selectedBook);
    this.setState({ books: selectedBooks });
    this.setState({ searchedBooks: [] });
    this.componentDidMount();
  }

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
              searchBooks={this.state.searchedBooks}
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
