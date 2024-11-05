import { useState } from "react";
import css from "./AddAnotherColumn.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import AddColumn from "../AddColumn/AddColumn";
import ColumnsList from "../ColumnsList/ColumnsList";
import { selectColumnsByBoard } from "../../redux/columns/slice.js";
import { useSelector } from "react-redux";

const AddAnotherColumn = ({ boardId, onAddColumn }) => {
  const columns = useSelector((state) => selectColumnsByBoard(state, boardId));
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const handleOpenModalAddColumn = () => {
    setIsAddColumnVisible(true);
  };

  const handleAddColumn = (title) => {
    onAddColumn(boardId, title); // Вызов функции добавления из MainDashboard
    setIsAddColumnVisible(false);
  };
  return (
    <>
      <div className={css.section}>
        <button
          className={css.btnAdd}
          type="submit"
          onClick={handleOpenModalAddColumn}
        >
          <div className={css.svg}>
            <SvgIcon id="icon-plus" width="14" height="14" />
          </div>
          Add another column
        </button>
        {isAddColumnVisible && (
          <AddColumn
            onAddColumn={handleAddColumn}
            setIsAddColumnVisible={setIsAddColumnVisible}
          />
        )}
        {columns.length > 0 && <ColumnsList columns={columns} />}
      </div>
    </>
  );
};
export default AddAnotherColumn;
