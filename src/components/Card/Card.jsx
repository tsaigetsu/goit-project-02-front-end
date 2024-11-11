import { useState } from "react";
import { ModalDelete } from "../ModalDelete/ModalDelete.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/cards/operations.js";

const Card = ({ id, title, description, deadline, columnId, priority }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("card id", id);

  const onDelete = () => {
    if (columnId && id) {
      dispatch(deleteCard(id));
      closeModal();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                <SvgIcon id="icon-bell-01" width="16" height="16" />
              </button>
              <button className={s.btnIcon}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  width="16"
                  height="16"
                />
              </button>
              <button
                className={s.btnIcon}
                // {onClick={onEdit}}
              >
                <SvgIcon id="icon-pencil-01" width="16" height="16" />
              </button>
              <button className={s.btnIcon} onClick={openModal}>
                <SvgIcon id="icon-trash-04" width="16" height="16" />
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
};

export default Card;
