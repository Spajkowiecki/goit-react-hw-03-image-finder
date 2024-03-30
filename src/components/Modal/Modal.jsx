import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  render() {
    const { children, closeModal } = this.props;
    return (
      <div className={style.backdrop}>
        <button onClick={closeModal} className={style.closeButton}>
          X
        </button>
        <div className={style.modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func,
};

export default Modal;
