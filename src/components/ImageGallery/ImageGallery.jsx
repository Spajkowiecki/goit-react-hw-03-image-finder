import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { gallery } = this.props;
    return (
      <ul>
        {gallery.map(element => {
          return <ImageGalleryItem imageData={element} />;
        })}
      </ul>
    );
  }
}

export default ImageGallery;
