import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import css from "./HomePage.module.css";
const HomePage = () => {
  return (
    <>
      <section className={css.wrapperHomePage}>
        <Sidebar />
        <ScreensPage />
      </section>
    </>
  );
};

export default HomePage;
