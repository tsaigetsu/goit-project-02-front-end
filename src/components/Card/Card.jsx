import React, { useState, useCallback, useEffect } from 'react';
import { ModalDelete } from '../ModalDelete/ModalDelete.jsx';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import s from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, moveCardToColumn } from '../../redux/cards/operations.js';
import EditCardPopup from '../EditCardPopup/EditCardPopup.jsx';
import InProgressModal from '../InProgressModal/InProgressModal.jsx';
import { selectedBoard } from '../../redux/boards/selectors.js';

const Card = React.memo(({ card }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChange, setIsModalChange] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const dispatch = useDispatch();
  const { _id, title, description, deadline, columnId, priority } = card;
  const board = useSelector(selectedBoard);
  const { columns } = board;

  const colorPriority = [
    { color: '#8fa1d0', priority: 'low' },
    { color: '#E09CB5', priority: 'medium' },
    { color: '#BEDBB0', priority: 'high' },
    { color: '#B7B7B7', priority: 'without priority' },
  ];

  const selectedColorObj = colorPriority.find(
    item => item.priority === priority
  );
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onDelete = useCallback(() => {
    if (columnId && _id) {
      dispatch(deleteCard(_id));
      closeModal();
    }
  }, [columnId, _id, dispatch, closeModal]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const toggleChangeModal = useCallback(() => {
    setIsModalChange(prevState => !prevState);
  }, []);

  const filteredColumns = columns.filter(col => col._id !== columnId);

  const handleMoveCard = columnId => {
    dispatch(moveCardToColumn({ cardId: _id, columnId }));
    setIsModalChange(false);
  };
  useEffect(() => {
    const checkDeadline = () => {
      const deadlineDate = new Date(deadline);
      const currentDate = new Date();

      if (currentDate > deadlineDate) {
        setIsDeadlinePassed(true);
      } else {
        setIsDeadlinePassed(false);
      }
    };

    checkDeadline();

    const intervalId = setInterval(checkDeadline, 86400000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  function formatDateForCard(deadline) {
    const dateDeadline = new Date(deadline);
    const day = dateDeadline.getDate().toString().padStart(2, '0');
    const month = (dateDeadline.getMonth() + 1).toString().padStart(2, '0');
    const year = dateDeadline.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const formattedDate = formatDateForCard(deadline);

  return (
    <>
      <div className={s.cardholder}>
        <div className={s.cardWrapper}>
          <div
            className={s.color}
            style={{
              backgroundColor: selectedColorObj
                ? selectedColorObj.color
                : 'without priority',
            }}
          ></div>
          <div className={s.card}>
            <h4 className={s.titleCard}>{title}</h4>
            <p className={s.description}>{description}</p>
            <div className={s.cardFooter}>
              <div className={s.box}>
                <div className={s.boxPriority}>
                  <span className={s.title}>Priority</span>
                  <div className={s.priority}>
                    <div
                      className={s.ellipse}
                      style={{
                        backgroundColor: selectedColorObj
                          ? selectedColorObj.color
                          : 'without priority',
                      }}
                    ></div>
                    <span className={s.titlePriority}>{priority}</span>
                  </div>
                </div>
                <div className={s.boxDeadline}>
                  <span className={s.title}>Deadline</span>
                  <span className={s.titleDeadline}>{formattedDate}</span>
                </div>
              </div>
              <div className={s.boxIcons}>
                <button
                  className={`${s.btnIcon} ${
                    !isDeadlinePassed ? s.deadlineShadow : ''
                  }`}
                >
                  {isDeadlinePassed && (
                    <SvgIcon
                      id="icon-bell-01"
                      className={s.svgIcon}
                      width="16"
                      height="16"
                      style={{
                        filter: 'drop-shadow(0px 0px 6px rgb(57 168 62))',
                        stroke: 'rgb(77 144 80)',
                      }}
                    />
                  )}
                </button>

                <button
                  className={`${s.btnIcon} ${s.changeColumn} ${
                    filteredColumns.length === 0 ? s.disabled : ''
                  }`}
                  onClick={toggleChangeModal}
                  disabled={filteredColumns.length === 0}
                >
                  <SvgIcon
                    id="icon-arrow-circle-broken-right"
                    className={s.svgIcon}
                    width="16"
                    height="16"
                  />
                  {isModalChange && (
                    <InProgressModal
                      setIsModalChange={setIsModalChange}
                      filteredColumns={filteredColumns}
                      handleMoveCard={handleMoveCard}
                    />
                  )}
                </button>
                <button className={s.btnIcon} onClick={() => setIsEdit(true)}>
                  <SvgIcon
                    id="icon-pencil-01"
                    className={s.svgIcon}
                    width="16"
                    height="16"
                  />
                </button>
                <button className={s.btnIcon} onClick={openModal}>
                  <SvgIcon
                    id="icon-trash-04"
                    className={s.svgIcon}
                    width="16"
                    height="16"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <EditCardPopup card={card} setIsEdit={setIsEdit} />}

      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={onDelete}
        typeItems={'card'}
        titleItems={title || 'Untitled Card'}
      />
    </>
  );
});

Card.displayName = 'Card';

export default Card;
