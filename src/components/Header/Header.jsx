import SvgIcon from '../../components/SvgIcon/SvgIcon.jsx';
import React, { useState, createContext, useContext} from 'react';
import css from './Header.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { SidebarContext } from '../Layout/Layout.jsx'; 


// Компонент заголовка
export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Створення контексту
    const ThemeContext = createContext('light');

    const { toggleSidebar } = useContext(SidebarContext);
    
    const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    };

  // Функція для зміни теми
  const changeTheme = (newTheme) => {
    setIsModalOpen(false); // Закриваємо модальне вікно після вибору теми
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };


  return (
      <div className={`my-component ${css['theme-' + theme]} ${css.headerContainer}`}>
          <ThemeContext.Provider value={{ theme, changeTheme }}>
                  <header className={css.header}>
                    {/* <button onClick={toggleSidebar} className={css.hamburgerButton}>
                      <span className={css.hamburgerIcon}></span>
                    </button> */}
                  <button onClick={() => { 
  console.log("Hamburger button clicked"); 
  toggleSidebar(); 
}} className={css.hamburgerButton}>
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
                  <li onClick={() => changeTheme('light')}>Light</li>
                  <li onClick={() => changeTheme('dark')}>Dark</li>
                  <li onClick={() => changeTheme('violet')}>Violet</li>
                </ul>
              </div>
                          )}
                      </div>
                      
                      <div className={css.userInfo}>
                      <p>Name</p>
                      <button className={css.userInfoModal}>
                      </button>
                      </div>
                  </div>
                  
                  </header>
          </ThemeContext.Provider>
    </div>
  );
}

