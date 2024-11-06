import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./HeaderDashboard.module.css";

const HeaderDashboard = ({ titleBoard }) => {
  return (
    <>
      <div className={css.wrapperHeaderDashboard}>
        <div className={css.container}>
          <p className={css.titleBoard}>{titleBoard || "Untitled Board"}</p>
          <button className={css.btnFilters}>
            <SvgIcon id="icon-filter" width="16" height="16" />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default HeaderDashboard;
