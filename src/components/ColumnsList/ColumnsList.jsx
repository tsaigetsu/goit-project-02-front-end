import Column from '../Column/Column';
import css from './ColumnsList.module.css';
import { useSelector } from 'react-redux';
import AddAnotherColumn from '../AddAnotherColumn/AddAnotherColumn.jsx';
import { useRef } from 'react';
import { selectFilteredCardsByBoard } from '../../redux/boards/selectors.js';

const ColumnsList = () => {
  const containerRef = useRef(null);
  const columns = useSelector(state => selectFilteredCardsByBoard(state));

  return (
    <>
      <ul ref={containerRef} className={css.columnsList}>
        {columns.length > 0 &&
          columns.map(column => {
            return (
              <Column
                column={column}
                key={column._id}
                title={column.title}
                columnId={column._id}
                boardId={column.boardId}
              />
            );
          })}

        <AddAnotherColumn
          className={`add-button ${columns.length > 0 ? 'shifted' : ''}`}
        />
      </ul>
    </>
  );
};
export default ColumnsList;
