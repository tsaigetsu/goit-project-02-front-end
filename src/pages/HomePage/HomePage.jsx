import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import css from "./HomePage.module.css";
const HomePage = () => {
  return (
    <section className={css.homePage}>
      <Sidebar />
      <div className={css.homePage__content}>
        <Header />
        <ScreensPage />
      </div>
    </section>
  );
};

export default HomePage;
