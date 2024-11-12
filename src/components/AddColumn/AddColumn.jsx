import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddColumn.module.css";

const AddColumn = ({ onCreateColumn, setIsOpen }) => {
  const [title, setTitle] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };
  // console.log(title);

  const handleAddColumn = () => {
    if (title.trim()) {
      onCreateColumn(title);
      setTitle("");
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener("keydown", handleEscape);

    // Очищаем подписку при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);

  // Обработчик для клика по бекдропу
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(); // Закрываем модалку при клике по бекдропу
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
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button
            className={css.btnAdd}
            type="button"
            onClick={handleAddColumn}
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
