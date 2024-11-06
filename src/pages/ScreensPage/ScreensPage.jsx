import css from "./ScreensPage.module.css";

import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

const ScreensPage = ({ board }) => {
  console.log(board, "screens");

  return (
    <>
      <section className={css.wrapperScreenPage}>
        <div className={css.screensPage__content}>
          <HeaderDashboard
            titleBoard={board.title}
            className={css.headerDashboard}
          />
          <MainDashboard board={board} className={css.mainDashboard} />
        </div>
      </section>
    </>
  );
};

export default ScreensPage;
