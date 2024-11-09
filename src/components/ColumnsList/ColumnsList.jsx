import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
// import { selectColumnsByBoard } from "../../redux/columns/selectors.js";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn.jsx";
// import { useSelector } from "react-redux";

const ColumnsList = ({ boardId, filter, setIsOpen, columns }) => {
  console.log("columns", columns);

  // useEffect(() => {
  //   dispatch(fetchCardsThunk());
  // }, [dispatch]);

  return (
    <section className={css.wrapperList}>
      <ul className={css.columnsList}>
        {columns.map((column) => {
          return (
            <li key={column._id} className={css.itemList}>
              <Column column={column} boardId={boardId} />
            </li>
          );
        })}
        {/* {columns.map((column) => {
          // Фільтруємо задачі у колонці
          const filteredTasks = column.tasks.filter((task) => {
            if (!filter) return true; // Якщо фільтр не заданий, показуємо всі задачі
            return task.priority === filter; // Фільтруємо задачі за пріоритетом
          });

          return (
            <li key={column._id} className={css.itemList}>
              <Column
                column={{ ...column, tasks: filteredTasks }}
                boardId={boardId}
              />
            </li>
          );
        })} */}

        <AddAnotherColumn setIsOpen={() => setIsOpen(true)} />
      </ul>
    </section>
  );
};
export default ColumnsList;
