import Column from "../Column/Column";
import css from "./ColumnsList.module.css";

const ColumnsList = ({ columns }) => {
  return (
    <>
      <div className={css.positionWrapper}>
        <div className={css.wrapperList}>
          <ul className={css.columns}>
            {columns.map((column) => (
              <li key={column.id}>
                <Column title={column.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default ColumnsList;
