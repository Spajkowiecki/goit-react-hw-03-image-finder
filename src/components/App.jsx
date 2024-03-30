import { Component } from 'react';
import style from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';

import PropTypes from 'prop-types';

const API_LINK = 'https://pixabay.com/api/';
const API_KEY = '32705986-6617e254891a5833ed9977223';

//example link https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  static defaultProps = {
    // Ustaw domyślne wartości dla zmiennych, które mogą być niezdefiniowane
    search: '',
    isLoading: false,
    totalHits: 0,
    total: 0,
    images: [],
  };

  state = {
    //1. first state what i need is checking that data is loading and array for storing data
    firstPageLoad: true,
    search: '',
    images: [],
    isLoading: false,
    //2. next what will be need, is to handle an error from response
    error: null,
    //3. actual page
    totalHits: 0,
    total: 0,
    activePage: 1,
    //4. modal
    isModalOpen: false,
    selectedImage: null,
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
      // console.log('DATA FROM API: ', data);

      this.setState({
        images: [...this.state.images, ...data.hits],
        total: data.total,
        totalHits: data.totalHits,
      });
    } catch (error) {
      this.setState({ error });
      // console.log('ERROR: ', error);
    } finally {
      // console.log('Finished Loading Data!');
      this.setState({
        isLoading: false,
      });
    }
  };

  showLoadMoreButton = () => {
    const { total, images, activePage } = this.state;
    if (images.length > 0 && total - activePage * 12 > 0) {
      return true;
    }
    if (total - activePage * 12 < 0) {
      return false;
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
    if (prevProps.activePage !== this.state.activePage) {
      this.getPhotos();
    }
    if (prevProps.search !== this.state.search) {
      this.setState({ images: [] });
      this.getPhotos();
    }
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  handleClickEvent = event => {
    if (event.target.tagName !== 'IMG') {
      this.closeModal();
    }
  };

  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickEvent);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickEvent);
  };

  render() {
    const { images, selectedImage, isLoading, isModalOpen, error } = this.state;
    return (
      <div className={style.container}>
        {isModalOpen && (
          <Modal closeModal={this.closeModal}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
        <header className={style.header}>
          <SearchBar onSubmit={this.handleSearch} />
        </header>
        <main>
          {error && <p>Something went wrong...</p>}
          <ImageGallery gallery={images} selectedImage={this.openModal} />
          {isLoading && <Loader />}
        </main>
        {this.showLoadMoreButton() && <Button nextPage={this.handleNextPage} />}
      </div>
    );
  }
}

App.propTypes = {
  // 1. first state: checking if data is loading and array for storing data
  search: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,

  // 2. handling error from response
  error: PropTypes.string,

  // 3. actual page
  totalHits: PropTypes.number,
  total: PropTypes.number,
  activePage: PropTypes.number,

  // 4. modal
  isModalOpen: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;
