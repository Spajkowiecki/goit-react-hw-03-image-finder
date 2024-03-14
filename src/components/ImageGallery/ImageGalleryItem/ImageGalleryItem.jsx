import { Component } from 'react';
import style from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { element } = this.props;
    return (
      <a className={style.element} href={element.largeImageURL}>
        <img src={element.webformatURL} alt={element.tags}></img>
      </a>
    );
  }
}

export default ImageGalleryItem;
