import SvgIcon from "../../components/SvgIcon/SvgIcon.jsx";
import { useState, createContext, useContext } from "react";
import css from "./Header.module.css";
import { SidebarContext } from "../Layout/Layout.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";

// Компонент заголовка
export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Створення контексту
  const ThemeContext = createContext("light");

  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Функція для зміни теми
  const changeTheme = (newTheme) => {
    setIsModalOpen(false); // Закриваємо модальне вікно після вибору теми
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`my-component ${css["theme-" + theme]} ${css.headerContainer}`}
    >
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <header className={css.header}>
          {/* <button onClick={toggleSidebar} className={css.hamburgerButton}>
                      <span className={css.hamburgerIcon}></span>
                    </button> */}
          <button
            onClick={() => {
              // console.log("Hamburger button clicked");
              toggleSidebar();
            }}
            className={`${css.hamburgerButton} ${isSidebarOpen ? css.hide : ''}`}
          >
            <span className={css.hamburgerIcon}></span>
          </button>
          <div className={css.themeSelector}>
            <div className={css.theme}>
              <p>Theme</p>
              <button className={css.themeButton} onClick={toggleModal}>
                <SvgIcon
                  id="checkMark"
                  className={css.welcomeIcon}
                  width="16"
                  height="16"
                />
              </button>
              {isModalOpen && (
                <div className={css.modal}>
                  <ul>
                    <li onClick={() => changeTheme("light")}>Light</li>
                    <li onClick={() => changeTheme("dark")}>Dark</li>
                    <li onClick={() => changeTheme("violet")}>Violet</li>
                  </ul>
                </div>
              )}
            </div>
            <UserInfo />
          </div>
        </header>
      </ThemeContext.Provider>
    </div>
  );
}
