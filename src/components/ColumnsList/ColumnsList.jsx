import Column from '../Column/Column';
import css from './ColumnsList.module.css';
import { useSelector } from 'react-redux';
import AddAnotherColumn from '../AddAnotherColumn/AddAnotherColumn.jsx';
import { useRef } from 'react';

import { selectedBoard } from '../../redux/boards/selectors.js';

const ColumnsList = () => {
  const containerRef = useRef(null);
  const board = useSelector(selectedBoard);
  const { columns } = board;

  return (
    <section className={css.wrapperList}>
      <ul ref={containerRef} className={css.columnsList}>
        {columns.length > 0 &&
          columns.map(column => {
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

        <AddAnotherColumn
          className={`add-button ${columns.length > 0 ? 'shifted' : ''}`}
        />
      </ul>
    </section>
  );
};
export default ColumnsList;
