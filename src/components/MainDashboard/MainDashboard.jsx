import ColumnsList from '../ColumnsList/ColumnsList.jsx';
import css from '../MainDashboard/MainDashboard.module.css';

const MainDashboard = () => {
  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <ColumnsList />
      </div>
    </>
  );
};

export default MainDashboard;
