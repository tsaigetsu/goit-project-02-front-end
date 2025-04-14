import { useCallback, useEffect, useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import css from './EditColumn.module.css';
import { onEditColumn } from '../../redux/columns/operations';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const EditColumn = ({ title, setIsEdit, columnId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);

  const handleUpdateColumn = () => {
    setIsEdit(false);
    const updateColumn = { title: newTitle };
    dispatch(onEditColumn({ columnId, updateColumn }))
      .unwrap()
      .then(() => {
        toast.success('Column updated successfully!', {
          duration: 3000,
          position: 'top-center',
          icon: '✔️',
        });
      })
      .catch(error => {
        toast.error('Failed to update column: ' + error.message, {
          duration: 3000,
          position: 'top-center',
          icon: '❌',
        });
      });
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        closeModal(); // Вызываем функцию закрытия модалки
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleUpdateColumn();
    }
  };
  return (
    <>
      <div className={css.section}>
        <div className={css.overlay} onClick={handleBackdropClick}>
          <div className={css.container}>
            <p className={css.title}>Edit column</p>
            <button className={css.btnClose} onClick={closeModal}>
              <SvgIcon id="icon-x-close" width="18" height="18" />
            </button>
            <input
              autoFocus
              type="text"
              className={css.inputTitle}
              placeholder="To Do"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={css.btnAdd}
              type="submit"
              onClick={handleUpdateColumn}
            >
              <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditColumn;
