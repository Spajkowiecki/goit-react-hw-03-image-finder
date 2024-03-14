import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { gallery } = this.props;
    return (
      <ul className={style.list}>
        {gallery.hits.map(element => {
          return (
            <li key={element.id}>
              <ImageGalleryItem element={element} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
