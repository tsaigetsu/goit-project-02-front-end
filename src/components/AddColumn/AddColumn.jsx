// import { useEffect } from "react";
import { useState } from "react";
// import Column from "../Column/Column";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddColumn.module.css";
import ColumnsList from "../ColumnsList/ColumnsList";
// import { selectColumns } from "../../redux/columns/slice";
// import { useDispatch } from "react-redux";

const AddColumn = ({ onAddColumn, setIsAddColumnVisible, boardId }) => {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const dispatch = useDispatch();

  const closeModal = () => {
    setIsAddColumnVisible(false);
  };

  const handleAddColumn = () => {
    const newColumn = { title, boardId };
    if (title.trim()) {
      onAddColumn(newColumn);
    }

    setIsAddColumnVisible(false);
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
            type="submit"
            onClick={handleAddColumn}
          >
            <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
            Add
          </button>
          {/* <Column /> */}
        </div>
        {isOpen && <ColumnsList setIsOpen={setIsOpen} />}
        {/* {isColumnVisible && <Column title={title} />} */}
      </div>
    </>
  );
};
export default AddColumn;
