import { useSelector } from "react-redux";
import { selectColumnsByBoard } from "../../redux/columns/slice.js";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";

const ColumnsList = ({ filter }) => {
  const columns = useSelector(selectColumnsByBoard);
  console.log("columns567", columns);

  //const columns = useSelector(selectColumnsByBoard); ПРОВЕРИТЬ РАБОТУ И ВЫБРАТЬ ОДИН ИЗ ДВУХ

  // useEffect(() => {
  //   dispatch(fetchCardsThunk());
  // }, [dispatch]);

  return (
    <section className={css.wrapperList}>
      <ul className={css.columnsList}>
        {columns.map((column) => {
          // Фільтруємо задачі у колонці
          const filteredTasks = column.tasks.filter((task) => {
            if (!filter) return true; // Якщо фільтр не заданий, показуємо всі задачі
            return task.priority === filter; // Фільтруємо задачі за пріоритетом
          });

          return (
            <li key={column._id} className={css.itemList}>
              <Column
                column={{ ...column, tasks: filteredTasks }}
                // boardId={columns.boardId}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default ColumnsList;
