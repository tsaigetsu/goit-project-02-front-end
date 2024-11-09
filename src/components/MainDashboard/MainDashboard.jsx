import { useState } from "react";
import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList.jsx";
import { useDispatch, useSelector } from "react-redux";

import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn.jsx";

import AddColumn from "../AddColumn/AddColumn.jsx";
import { onCreateColumn } from "../../redux/columns/operations.js";
import { selectedBoard } from "../../redux/boards/selectors.js";


const MainDashboard = ({ filter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleSaveColumn = (newTitle) => {
    console.log("Adding column with title:", newTitle);
    const newColumn = { title: newTitle, boardId: board._id };
    console.log("NewColumn:", newColumn);
    dispatch(onCreateColumn(newColumn));
    setIsOpen(false);
  };

  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <div>
          <div className={css.columnsWrapper}>
            <ColumnsList filter={filter} />
          </div>
        </div>
        <AddAnotherColumn setIsOpen={handleOpenModal} />
      </div>
      {isOpen && (
        <AddColumn onCreateColumn={handleSaveColumn} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default MainDashboard;
