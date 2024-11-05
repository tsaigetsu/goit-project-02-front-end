import { useSelector } from "react-redux";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice";

const ColumnsList = ({ boardId }) => {
  const columns = useSelector((state) => selectColumnsByBoard(state, boardId));
  return (
    <>
      <div className={css.positionWrapper}>
        <div className={css.wrapperList}>
          <ul className={css.columnsList}>
            {columns.map((column) => (
              <li key={column.id} className={css.itemList}>
                <Column column={column} boardId={boardId} />
              </li>
            ))}
          </ul>
          <AddAnotherColumn
          //   onAddColumn={handleAddColumn}
          //   boardId={boardId}
          />
        </div>
      </div>
    </>
  );
};
export default ColumnsList;
