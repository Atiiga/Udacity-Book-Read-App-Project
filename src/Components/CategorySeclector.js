import React from "react";

class CategorySelector extends React.Component {
  render() {
    const { changeCategory, book } = this.props;
    return (
      <select
        value={this.props.book.shelf}
        onChange={(event) => changeCategory(book, event.target.value)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default CategorySelector;
