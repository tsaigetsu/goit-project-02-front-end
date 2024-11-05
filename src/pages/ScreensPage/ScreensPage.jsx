import css from "./ScreensPage.module.css";

import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

const ScreensPage = ({ boardId, title }) => {
  return (
    <>
      <section className={css.wrapperScreenPage}>
        <div className={css.screensPage__content}>
          <HeaderDashboard titleBoard={title} className={css.headerDashboard} />
          <MainDashboard boardId={boardId} className={css.mainDashboard} />
        </div>
      </section>
    </>
  );
};

export default ScreensPage;
