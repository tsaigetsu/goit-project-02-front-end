import React, { useState, useCallback, useEffect } from "react";
import { ModalDelete } from "../ModalDelete/ModalDelete.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, moveCardToColumn } from "../../redux/cards/operations.js";
import EditCardPopup from "../EditCardPopup/EditCardPopup.jsx";
import InProgressModal from "../InProgressModal/InProgressModal.jsx";
import { selectedBoard } from "../../redux/boards/selectors.js";

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
    { color: " #8fa1d0", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: "#BEDBB0", priority: "high" },
    { color: "rgba(255, 255, 255, 0.3)", priority: "without priority" },
  ];

  const selectedColorObj = colorPriority.find(
    (item) => item.priority === priority
  );

  const onDelete = useCallback(() => {
    if (columnId && _id) {
      dispatch(deleteCard(_id));
      closeModal();
    }
  }, [columnId, _id, dispatch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onChange = () => {
    setIsModalChange(true);
  };

  const filteredColumns = columns.filter((col) => col._id !== columnId);

  const handleMoveCard = (columnId) => {
    dispatch(moveCardToColumn({ cardId: _id, columnId }));
    setIsModalChange(false);
  };
  useEffect(() => {
    const checkDeadline = () => {
      // Преобразуем строку в объект даты
      const deadlineDate = new Date(deadline);
      const currentDate = new Date();

      // Сравниваем текущую дату с дедлайном
      if (currentDate > deadlineDate) {
        setIsDeadlinePassed(true); // Если текущая дата больше дедлайна, то истек
      } else {
        setIsDeadlinePassed(false); // Если дедлайн не истек
      }
    };

    // Проверка дедлайна сразу после рендеринга
    checkDeadline();

    // Проверяем каждый день
    const intervalId = setInterval(checkDeadline, 86400000); // 86400000ms = 1 день

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(intervalId);
  }, [deadline]);
  return (
    <>
      <div
        className={s.color}
        style={{
          backgroundColor: selectedColorObj
            ? selectedColorObj.color
            : "without priority",
        }}
      >
        <div className={s.cardWrapper}>
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
                        : "without priority",
                    }}
                  ></div>
                  <span className={s.titlePriority}>{priority}</span>
                </div>
              </div>
              <div className={s.boxDeadline}>
                <span className={s.title}>Deadline</span>
                <span className={s.titleDeadline}>{deadline}</span>
              </div>
            </div>
            <div className={s.boxIcons}>
              <button
                className={`${s.btnIcon} ${
                  !isDeadlinePassed ? s.deadlineShadow : ""
                }`}
              >
                <SvgIcon
                  id="icon-bell-01"
                  className={s.svgIcon}
                  width="16"
                  height="16"
                  style={{
                    filter: isDeadlinePassed
                      ? "drop-shadow(0px 0px 6px rgb(57 168 62))"
                      : "none",
                    stroke: isDeadlinePassed
                      ? "rgb(77 144 80)"
                      : "var(--svg-btns-color)",
                  }}
                />
              </button>
              <button className={s.btnIcon} onClick={onChange}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  className={s.svgIcon}
                  width="16"
                  height="16"
                />
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
      {isEdit && <EditCardPopup card={card} setIsEdit={setIsEdit} />}
      {isModalChange && (
        <InProgressModal
          setIsModalChange={setIsModalChange}
          filteredColumns={filteredColumns}
          handleMoveCard={handleMoveCard}
        />
      )}
      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={onDelete}
        typeItems={"card"}
        titleItems={title || "Untitled Card"}
      />
    </>
  );
});

// Устанавливаем displayName для компонента
Card.displayName = "Card";

export default Card;
