import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  imageSelection = image => {
    this.props.selectedImage(image);
  };

  render() {
    const { gallery } = this.props;
    return (
      <ul className={style.list}>
        {gallery.map(element => (
          <ImageGalleryItem
            key={element.id}
            element={element}
            clickedImage={this.imageSelection}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
