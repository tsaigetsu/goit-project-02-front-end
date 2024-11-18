import ReactModal from 'react-modal';
import style from './ModalDelete.module.css';

export const ModalDelete = ({
  isOpen,
  onClose,
  onConfirm,
  typeItems,
  titleItems,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={style.modal}
      overlayClassName={style.overlay}
      ariaHideApp={false}
    >
      <div className={style.modalContent}>
        <h2 className={style.title}>Confirm Delete</h2>
        <p>
          Are you sure you want
          <br />
          to delete {typeItems}&nbsp;{titleItems}?
        </p>
        <div className={style.buttons}>
          <button onClick={onConfirm} className={style.confirmButton}>
            Yes
          </button>
          <button onClick={onClose} className={style.cancelButton}>
            No
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
