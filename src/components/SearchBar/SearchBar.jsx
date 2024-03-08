import { Component } from 'react';
import style from './SearchBar.module.css';

class SearchBar extends Component {
  onSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const value = form.elements.searchField.value;
    this.props.onSubmit({ value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          name="searchField"
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}

export default SearchBar;
