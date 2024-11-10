import SvgIcon from "../../components/SvgIcon/SvgIcon.jsx";
import { useState, useContext, useRef, useEffect } from "react";
import css from "./Header.module.css";
import { SidebarContext } from "../Layout/Layout.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import ThemeContext from "../Layout/ThemeContext.jsx"; 


export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);
  const { theme, changeTheme } = useContext(ThemeContext);

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
      <div
        className={`my-component ${css["theme-" + theme]} ${css.headerContainer}`}
      >
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          <header className={css.header}>
            <button
              onClick={() => {
                toggleSidebar();
              }}
              className={`${css.hamburgerButton} ${isSidebarOpen ? css.hide : ''}`}
            >
              <span className={css.hamburgerIcon}></span>
            </button>
          <div className={css.themeSelector}>
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
                      <li onClick={() => changeTheme("light", setIsModalOpen)}>Light</li>
                      <li onClick={() => changeTheme("dark", setIsModalOpen)}>Dark</li>
                      <li onClick={() => changeTheme("violet", setIsModalOpen)}>Violet</li>
                    </ul>
                  </div>
                )}
              </div>
              </div>
              <UserInfo />
            </div>
          </header>
        </ThemeContext.Provider>
      </div>
  );
}
