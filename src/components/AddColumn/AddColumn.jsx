import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddColumn.module.css";

const AddColumn = ({ onCreateColumn, setIsOpen }) => {
  const [title, setTitle] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(title);

  const handleAddColumn = () => {
    if (title.trim()) {
      onCreateColumn(title);
      setTitle("");
      closeModal();
    }
  };
  return (
    <>
      <div className={css.overlay}>
        <div className={css.container}>
          <p className={css.title}>Add column</p>
          <button className={css.btnClose} onClick={closeModal}>
            <SvgIcon id="icon-x-close" width="18" height="18" />
          </button>
          <input
            type="text"
            className={css.inputTitle}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
