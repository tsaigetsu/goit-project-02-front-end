import css from "./ScreensPage.module.css";

import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

const ScreensPage = () => {
  return (
    <>
      <div className={css.section}>
        <div className={css.container}>
          <HeaderDashboard className={css.headerDashboard} />
          <MainDashboard className={css.mainDashboard} />
        </div>
      </div>
    </>
  );
};

export default ScreensPage;
