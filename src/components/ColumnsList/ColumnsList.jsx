import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";

const ColumnsList = ({ columns }) => {
  return (
    <>
      <div className={css.positionWrapper}>
        <div className={css.wrapperList}>
          <ul className={css.columnsList}>
            {columns.map((column) => (
              <li key={column.id} className={css.itemList}>
                <Column title={column.title} />
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
