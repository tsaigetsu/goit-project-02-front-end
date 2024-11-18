import { useMemo, useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import css from './Column.module.css';
import EditColumn from '../EditColumn/EditColumn';
import { ModalDelete } from '../ModalDelete/ModalDelete';
import CardManager from '../CardManager/CardManager';
import { onDeleteColumn } from '../../redux/columns/operations';
import { useDispatch } from 'react-redux';
import AddCardPopup from '../AddCardPopup/AddCardPopup';

const Column = ({ title, columnId, boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onDelete = () => {
    if (columnId && boardId) {
      dispatch(onDeleteColumn(columnId));
      closeModal();
    }
  };
  const handleOpenPopup = useMemo(() => () => setIsOpen(true), []);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={css.itemList}>
        <div className={css.container}>
          <p className={css.columnName}>{title || 'Untitled Column'}</p>
          <div className={css.boxIcon}>
            <button className={css.btnIcon} onClick={() => setIsEdit(true)}>
              <SvgIcon
                id="icon-pencil-01"
                className={css.svgBtn}
                width="16"
                height="16"
              />
            </button>
            <button className={css.btnIcon} onClick={openModal}>
              <SvgIcon
                id="icon-trash-04"
                className={css.svgBtn}
                width="16"
                height="16"
              />
            </button>
          </div>
        </div>
        <CardManager columnId={columnId} />
        <div className={css.btnContainer}>
          <button className={css.cardManagerButton} onClick={handleOpenPopup}>
            <div className={css.svg}>
              <SvgIcon
                id="icon-plus"
                className={css.svgIcon}
                width="14"
                height="14"
              />
            </div>
            Add another card
          </button>
        </div>
        {isEdit && (
          <EditColumn
            title={title}
            columnId={columnId}
            boardId={boardId}
            setIsEdit={setIsEdit}
          />
        )}
      </li>
      {isOpen && <AddCardPopup setIsOpen={setIsOpen} columnId={columnId} />}
      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={onDelete}
        typeItems={'column'}
        titleItems={title || 'Untitled Column'}
      />
    </>
  );
};
export default Column;
