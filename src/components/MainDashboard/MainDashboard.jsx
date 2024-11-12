import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList.jsx";

const MainDashboard = ({ filter }) => {
  return (
    <div className={css.wrapperMainDashboard} >
      <ColumnsList filter={filter} />
    </div>
  );
};

export default MainDashboard;
