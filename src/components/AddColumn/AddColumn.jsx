import { useEffect, useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import css from './AddColumn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { onCreateColumn } from '../../redux/columns/operations';
import { selectedBoard } from '../../redux/boards/selectors';
import toast from 'react-hot-toast';

const AddColumn = ({ setIsOpen }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsOpen(false);
  };
  const board = useSelector(selectedBoard);
  const { _id } = board;

  const handleSaveColumn = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      toast.error('Please enter a title for the column', {
        position: 'top-right',
        duration: 3000,
      });
      return;
    }

    if (trimmedTitle.length < 2) {
      toast.error('Title must be at least 2 characters', {
        position: 'top-right',
        duration: 3000,
      });

      return;
    }

    if (trimmedTitle.length > 32) {
      toast.error('Title cannot exceed 32 characters', {
        position: 'top-right',
        duration: 3000,
      });
      return;
    }

    const newColumn = { title: trimmedTitle, boardId: _id };
    dispatch(onCreateColumn(newColumn))
      .unwrap()
      .then(() => {
        toast.success('Column created successfully!', {
          duration: 3000,
          position: 'top-center',
          icon: '✔️',
        });
      })
      .catch(error => {
        toast.error('Failed to create column: ' + error.message, {
          duration: 3000,
          position: 'top-center',
          icon: '❌',
        });
      });
    setIsOpen(false);
    setTitle('');
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsOpen();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsOpen]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      setIsOpen();
    }
  };
  return (
    <>
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.container}>
          <p className={css.title}>Add column</p>
          <button className={css.btnClose} onClick={closeModal}>
            <SvgIcon
              id="icon-x-close"
              className={css.svgCloseBtn}
              width="18"
              height="18"
            />
          </button>
          <input
            type="text"
            className={css.inputTitle}
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <button
            className={css.btnAdd}
            type="button"
            onClick={handleSaveColumn}
          >
            <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
            Add
          </button>
        </div>
      </div>
    </>
  );
};
export default AddColumn;
