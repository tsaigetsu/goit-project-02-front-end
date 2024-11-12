import React, { useState, useCallback } from "react";
import { ModalDelete } from "../ModalDelete/ModalDelete.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/cards/operations.js";
// import InProgressModal from "../InProgressModal/InProgressModal.jsx";

const Card = React.memo(({ id, title, description, deadline, columnId, priority }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  // console.log("card id", id);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onDelete = useCallback(() => {
    if (columnId && id) {
      dispatch(deleteCard(id));
      closeModal();
    }
  }, [columnId, id, dispatch]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  console.log("Rendering card:", id);

  return (
    <>
      <div className={s.color}>
        <div className={s.cardWrapper}>
          <h4 className={s.titleCard}>{title}</h4>
          <p className={s.description}>{description}</p>
          <div className={s.cardFooter}>
            <div className={s.box}>
              <div className={s.boxPriority}>
                <span className={s.title}>Priority</span>
                <div className={s.priority}>
                  <div className={s.ellipse}></div>
                  <span className={s.titlePriority}>{priority}</span>
                </div>
              </div>
              <div className={s.boxDeadline}>
                <span className={s.title}>Deadline</span>
                <span className={s.titleDeadline}>{deadline}</span>
              </div>
            </div>
            <div className={s.boxIcons}>
              <button className={s.btnIcon}>
                <SvgIcon
                  id="icon-bell-01"
                  className={s.svgIcon}
                  width="16"
                  height="16"
                />
              </button>
              <button className={s.btnIcon}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  className={s.svgIcon}
                  width="16"
                  height="16"
                />
              </button>
              <button
                className={s.btnIcon}
                // {onClick={onEdit}}
              >
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
