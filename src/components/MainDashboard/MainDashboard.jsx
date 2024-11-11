import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList.jsx";

const MainDashboard = ({ filter, background }) => {
  return (
    <div
      className={css.wrapperMainDashboard}
      style={{ backgroundImage: background ? `url(${background})` : "none" }}
    >
      <ColumnsList filter={filter} />
    </div>
  );
};

export default MainDashboard;
