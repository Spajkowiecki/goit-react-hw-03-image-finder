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
    isLoading: false,
    images: [],
    //
    debug: true,
  };

  //get data from API
  getData = async (search, page) => {
    this.setState({ isLoading: true });
    const response = await fetch(
      API_LINK +
        `?key=${API_KEY}&q=${search}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`
    );
    const data = await response.json();
    this.setState({ images: data });
    if (this.state.images.length > 0) {
      this.setState({ isLoading: false });
      console.log(this.state.isLoading);
    }
  };

  handleSearch = value => {
    this.setState({ search: value.value });
  };

  componentDidMount() {
    const { search, page } = this.state;
    this.getData(search, page);
  }

  componentDidUpdate(prevState, prevProps) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.getData(search, page);
    }
  }

  render() {
    const { images } = this.state;
    //console.log('state: ', images);
    return (
      <div className={style.container}>
        <header className={style.header}>
          <SearchBar onSubmit={this.handleSearch} />
        </header>
        <main>
          {
            // checking if images are undefined
            images === undefined ? (
              <p>Ładowanie...</p>
            ) : (
              <ImageGallery gallery={images} />
            )
          }
        </main>
      </div>
    );
  }
}

export default App;
