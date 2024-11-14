import css from './MainDashboard.module.css';
import ColumnsList from '../ColumnsList/ColumnsList.jsx';

const MainDashboard = ({ boardId, filter }) => {
  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <ColumnsList boardId={boardId} filter={filter} />
      </div>
    </>
  );
};

export default MainDashboard;
