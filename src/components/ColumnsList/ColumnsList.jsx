import { useSelector } from "react-redux";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice.js";

const ColumnsList = ({ boardId, filter }) => {
  const columns = useSelector((state) => selectColumnsByBoard(state));
//const columns = useSelector(selectColumnsByBoard); ПРОВЕРИТЬ РАБОТУ И ВЫБРАТЬ ОДИН ИЗ ДВУХ


  console.log("columns", columns);
  console.log("boardId", boardId);
  // useEffect(() => {
  //   dispatch(fetchCardsThunk());
  // }, [dispatch]);

  return (
    <section className={css.wrapperList}>
      <ul className={css.columnsList}>
        {columns.map((column) => {
          // Фільтруємо задачі у колонці
          const filteredTasks = column.tasks.filter(task => {
            if (!filter) return true; // Якщо фільтр не заданий, показуємо всі задачі
            return task.priority === filter; // Фільтруємо задачі за пріоритетом
          });

          return (
            <li key={column._id} className={css.itemList}>
              <Column column={{ ...column, tasks: filteredTasks }} boardId={boardId} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default ColumnsList;
