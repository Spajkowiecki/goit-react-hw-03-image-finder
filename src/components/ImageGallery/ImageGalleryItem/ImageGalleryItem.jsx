import { Component } from 'react';
import style from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { imageData } = this.props;
    return (
      <li className={style.image} key={imageData.id}>
        <img src={imageData.webformatURL} alt={imageData.tags} />
      </li>
    );
  }
}

export default ImageGalleryItem;
