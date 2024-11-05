import css from "./ScreensPage.module.css";

import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

const ScreensPage = () => {
  return (
    <>
      <section className={css.wrapperScreenPage}>
        <HeaderDashboard className={css.headerDashboard} />
        <MainDashboard className={css.mainDashboard} />
      </section>
    </>
  );
};

export default ScreensPage;
