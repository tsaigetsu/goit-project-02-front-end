import SvgIcon from "../SvgIcon/SvgIcon"; 
import css from "./HeaderDashboard.module.css";
import Filters from "../Filters/Filters"; 

const HeaderDashboard = ({ titleBoard, onFilterChange, onBackgroundChange }) => {
  return (
    <div className={css.wrapperHeaderDashboard}>
      <div className={css.container}>
        <p className={css.titleBoard}>{titleBoard || "Untitled Board"}</p>
        <button className={css.btnFilters}>
          <SvgIcon id="icon-filter" width="16" height="16" />
          <span>Filters</span>
        </button>
        <Filters onBackgroundChange={onBackgroundChange} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};

export default HeaderDashboard;
