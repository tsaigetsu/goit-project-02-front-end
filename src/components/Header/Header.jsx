import SvgIcon from "../../components/SvgIcon/SvgIcon.jsx";
import { useState, useContext, useRef, useEffect } from "react";
import css from "./Header.module.css";
import { SidebarContext } from "../Layout/Layout.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import ThemeContext from "../Layout/ThemeContext.jsx";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    <div className={`${css.headerContainer}`}>
      <header className={css.header}>
        <button
          onClick={() => {
            toggleSidebar();
          }}
          className={`${css.hamburgerButton} ${isSidebarOpen ? css.hide : ""}`}
        >
          <span className={css.hamburgerIcon}></span>
        </button>
        <div className={css.themeSelector}>
          <div className={css.themeSelector}>
            <div className={css.theme}>
              <button className={css.themeButton} onClick={toggleModal}>
                <p>Theme</p>
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
                    <li
                      onClick={() => toggleTheme("light")}
                      className={theme === "light" ? css.activeTheme : ""}
                    >
                      Light
                    </li>
                    <li
                      onClick={() => toggleTheme("dark")}
                      className={theme === "dark" ? css.activeTheme : ""}
                    >
                      Dark
                    </li>
                    <li
                      onClick={() => toggleTheme("violet")}
                      className={theme === "violet" ? css.activeTheme : ""}
                    >
                      Violet
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <UserInfo />
        </div>
      </header>
    </div>
  );
}
