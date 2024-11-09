import SvgIcon from "../../components/SvgIcon/SvgIcon.jsx";
import { useState, createContext, useContext, useRef, useEffect } from "react";
import css from "./Header.module.css";
import { SidebarContext } from "../Layout/Layout.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";

export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ThemeContext = createContext("light");

  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const changeTheme = (newTheme) => {
    setIsModalOpen(false);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`my-component ${css["theme-" + theme]} ${css.headerContainer}`}
    >
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <header className={css.header}>
          <button
            onClick={() => {
              toggleSidebar();
            }}
            className={`${css.hamburgerButton} ${
              isSidebarOpen ? css.hide : ""
            }`}
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
                  stroke="currentColor"
                />
              </button>
              {isModalOpen && (
                <div className={css.modal} ref={modalRef}>
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
