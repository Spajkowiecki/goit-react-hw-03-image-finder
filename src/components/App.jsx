import { Component } from 'react';
import style from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
//import Notiflix from 'notiflix';
import axios from 'axios';

const API_LINK = 'https://pixabay.com/api/';
const API_KEY = '32705986-6617e254891a5833ed9977223';

//example link https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  state = {
    firstPageLoad: true,
    //1. first state what i need is checking that data is loading and array for storing data
    search: '',
    images: [],
    isLoading: false,
    //2. next what will be need, is to handle an error from response
    error: null,
    //3. actual page
    totalHits: 0,
    total: 0,
    activePage: 1,
  };

  /*
   1. 'pobieram dane z API' w czasie ładowania obrazów wyświetlam:
       - <Loader> (aby to zrobić zmieniam stan isLoading, na początku i na końcu funkcji)
   */

  getPhotos = async () => {
    const { search, activePage } = this.state;
    this.setState({ isLoading: true });
    try {
      const { data } = await axios(
        API_LINK +
          `?key=${API_KEY}&q=${search}&page=${activePage}&per_page=12&image_type=photo&orientation=horizontal`
      );
      console.log('DATA FROM API: ', data);
      this.setState({
        images: data.hits,
        total: data.total,
        totalHits: data.totalHits,
      });
    } catch (error) {
      this.setState({ error });
      console.log('ERROR: ', error);
    } finally {
      console.log('Finished Loading Data!');
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSearch = value => {
    this.setState({ search: value.value });
  };

  handleNextPage = () => {
    this.setState(prev => ({
      activePage: prev.activePage + 1,
    }));
  };

  componentDidMount() {
    this.getPhotos();
  }

  //Nie wiem czemu to działa a wczesniej wpadało w nieskończoną pętlę
  componentDidUpdate(prevState, prevProps) {
    if (
      prevProps.search !== this.state.search ||
      prevProps.activePage !== this.state.activePage
    ) {
      this.getPhotos();
    }
  }

  /// NIE WIEM CZEMU TO NIZEJ DZIAŁA
  /**
   * 
   *  shouldComponentUpdate(nextState, nextProps) {
    if (this.state.search !== nextState.search) {
      return true;
    }
    return false;
  }
  */
  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={style.container}>
        <header className={style.header}>
          <SearchBar onSubmit={this.handleSearch} />
        </header>
        <main>
          {error && <p>Something went wrong...</p>}
          <ImageGallery gallery={images} />
          {isLoading && <Loader />}
        </main>
        <button onClick={this.handleNextPage}>Next Page</button>
      </div>
    );
  }
}

export default App;
