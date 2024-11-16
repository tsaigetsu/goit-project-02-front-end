import ColumnsList from '../ColumnsList/ColumnsList.jsx';

const MainDashboard = ({ boardId, filter }) => {
  return (
    <>
      <ColumnsList boardId={boardId} filter={filter} />
    </>
  );
};

export default MainDashboard;
