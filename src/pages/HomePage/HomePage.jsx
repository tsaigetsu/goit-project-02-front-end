import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import Header from "../../components/Header/Header.jsx";
import css from "./HomePage.module.css";
import { SidebarContext } from "../../components/Layout/Layout.jsx";
import { useContext } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import ThemeContext from "../../components/Layout/ThemeContext.jsx";

const HomePage = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  // console.log(isSidebarOpen);
  const { theme } = useContext(ThemeContext);

  return (
    <Layout>
      <section className={`${css.homePage}  ${css[`theme-${theme}`]}`}>
        <Sidebar
          className={isSidebarOpen ? "aside open" : "aside"}
          // onSelectBoard={onSelectBoard}
        />
        <div className={css.homePage__content}>
          <Header />
          <ScreensPage />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
