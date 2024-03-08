import { Component } from 'react';
import style from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleSearch = value => {
    this.setState({ searchValue: value });
  };

  componentDidUpdate() {
    console.log('update: ', this.state.searchValue);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div className={style.container}>
        <header className={style.header}>
          <SearchBar onSubmit={this.handleSearch} />
        </header>
        <main>
          {searchValue === '' ? (
            <p>Write in field above to search for images and photos</p>
          ) : (
            <ImageGallery gallery={[{ id: 1 }]} />
          )}
        </main>
      </div>
    );
  }
}

export default App;
