import { useSelector } from "react-redux";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice.js";

const ColumnsList = ({ filter }) => {
  const columns = useSelector(selectColumnsByBoard);

  return (
    <section className={css.wrapperList}>
      <ul className={css.columnsList}>
        {columns &&
          columns.map((column) => {
            // Фільтруємо задачі у колонці
            const filteredTasks = column.tasks.filter((task) => {
              if (!filter) return true; // Якщо фільтр не заданий, показуємо всі задачі
              return task.priority === filter; // Фільтруємо задачі за пріоритетом
            });

            return (
              <li key={column._id} className={css.itemList}>
                <Column column={{ ...column, tasks: filteredTasks }} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};
export default ColumnsList;
