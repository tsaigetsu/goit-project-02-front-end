import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./HeaderDashboard.module.css";

const HeaderDashboard = () => {
  return (
    <>
      <section className={css.container}>
        <div className={css.wrapper}>
          {/* {(це заголовок, який змінюється в залежності від того,
          яка дошка відкрита.)} */}
          <span className={css.titleBoard}>Project Office</span>
          <button className={css.btnFilters}>
            <SvgIcon id="icon-filter" width="16" height="16" />
            <span>Filters</span>
          </button>
        </div>
      </section>
    </>
  );
};
export default HeaderDashboard;
