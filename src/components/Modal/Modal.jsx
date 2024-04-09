import { Component } from 'react';
import style from './Modal.module.css';

class Modal extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={style.modalPosition}>
        <div className={style.backdrop}></div>
        <div className={style.modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
