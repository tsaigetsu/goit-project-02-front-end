import { useCallback, useEffect, useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import css from './EditColumn.module.css';
import { onEditColumn } from '../../redux/columns/operations';
import { useDispatch } from 'react-redux';

//принимает в пропсах стейт контролирующий открытие и закрытие окна isModalOpen, setIsModalOpen
const EditColumn = ({ title, setIsEdit, columnId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);

  const handleUpdateColumn = () => {
    setIsEdit(false);
    const updateColumn = { title: newTitle };
    dispatch(onEditColumn({ columnId, updateColumn }));
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        closeModal(); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener('keydown', handleEscape);

    // Очищаем подписку при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  // Обработчик для клика по бекдропу
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal(); // Закрываем модалку при клике по бекдропу
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
