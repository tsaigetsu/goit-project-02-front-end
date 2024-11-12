import { useState } from "react";
import { ModalDelete } from "../ModalDelete/ModalDelete.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/cards/operations.js";
import EditCardPopup from "../EditCardPopup/EditCardPopup.jsx";

const Card = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { _id, title, description, deadline, columnId, priority } = card;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const colorPriority = [
    { color: " #8fa1d0", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: "#BEDBB0", priority: "high" },
    { color: "rgba(255, 255, 255, 0.3)", priority: "without priority" },
  ];

  const selectedColorObj = colorPriority.find(
    (item) => item.priority === priority
  );

  const onDelete = () => {
    if (columnId && _id) {
      dispatch(deleteCard(_id));
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
              <button className={s.btnIcon} onClick={() => setIsEdit(true)}>
                <SvgIcon id="icon-pencil-01" width="16" height="16" />
              </button>
              <button className={s.btnIcon} onClick={openModal}>
                <SvgIcon id="icon-trash-04" width="16" height="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <EditCardPopup card={card} setIsEdit={setIsEdit} />}

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
