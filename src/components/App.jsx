import { Component } from 'react';
import style from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

const API_LINK = 'https://pixabay.com/api/';
const API_KEY = '32705986-6617e254891a5833ed9977223';

//example link https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],

    debug: true,
  };

  //get data from API
  getData = async (search, page) => {
    const response = await fetch(
      API_LINK +
        `?key=${API_KEY}&q=${search}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`
    );
    const data = await response.json();
    this.setState({ images: data });
    console.log(this.state.images);
  };

  handleSearch = value => {
    this.setState({ search: value.value });
  };

  //do something when component update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      console.log('search jest inne od poprzedniego!');
      this.getData(this.state.search, this.state.page);
    }
  }

  render() {
    return (
      <div className={style.container}>
        <header className={style.header}>
          <SearchBar onSubmit={this.handleSearch} />
        </header>
        <main></main>
      </div>
    );
  }
}

export default App;
