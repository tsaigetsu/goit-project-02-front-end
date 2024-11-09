import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./HeaderDashboard.module.css";
// import Filters from "../Filters/Filters";
import { useSelector } from "react-redux";
import { selectedBoard } from "../../redux/boards/selectors";

const HeaderDashboard = ({ title, onFilterChange, onBackgroundChange }) => {
  const board = useSelector(selectedBoard);
  console.log("selectedBoard", board);

  return (
    <div className={css.wrapperHeaderDashboard}>
      <div className={css.container}>
        <p className={css.titleBoard}>{title}</p>
        <button className={css.btnFilters}>
          <SvgIcon id="icon-filter" width="16" height="16" />
          <span>Filters</span>
        </button>

        {/* <Filters
          onBackgroundChange={onBackgroundChange}
          onFilterChange={onFilterChange}
        /> */}
      </div>
    </div>
  );
};

export default HeaderDashboard;
