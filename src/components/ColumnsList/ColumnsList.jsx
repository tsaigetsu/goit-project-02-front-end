import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice.js";
import { useSelector } from "react-redux";

const ColumnsList = () =>
  // { filter }

  {
    const columns = useSelector(selectColumnsByBoard);
    console.log("colummmns", columns);

    return (
      <section className={css.wrapperList}>
        <ul className={css.columnsList}>
          {columns &&
            columns.map((column) => {
              // Фільтруємо задачі у колонці
              // const filteredTasks = column.tasks.filter((task) => {
              //   if (!filter) return true; // Якщо фільтр не заданий, показуємо всі задачі
              //   return task.priority === filter; // Фільтруємо задачі за пріоритетом
              // });

              return (
                <Column
                  key={column._id}
                  title={column.title}
                  columnId={column._id}
                  boardId={column.boardId}
                  // column={{ ...column, tasks: filteredTasks }}
                />
              );
            })}
        </ul>
      </section>
    );
  };
export default ColumnsList;
