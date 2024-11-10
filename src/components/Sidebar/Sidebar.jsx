import LogoComponent from "../LogoComponent/LogoComponent";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import NeedHelpComponent from "../NeedHelpComponent/NeedHelpComponent";
import SidebarBoardList from "../SidebarBoardList/SidebarBoardList";
import s from "./Sidebar.module.css";
import { useContext } from "react";
import { SidebarContext } from "../Layout/Layout.jsx";
// import ThemeContext from "../Layout/ThemeContext.jsx";

const Sidebar = ({ onSelectBoard }) => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  // const { theme } = useContext(ThemeContext);

  const handleClick = (event) => {
    event.stopPropagation();
    if (event.target.classList.contains(s.overlay)) {
      toggleSidebar();
    }
  };
// my-component ${s["theme-" + theme]} ${s.sidebarContainer} - додати в aside в className щоб змінювалися стилі по темі
  return (
    <aside className={`${s.aside} ${isSidebarOpen ? s.open : ""}`}>
      <div className={s.overlay} onClick={handleClick} />
      <nav className={s.nav}>
        <div className={s.topElements}>
          <LogoComponent className={s.top} />
          <SidebarBoardList className={s.list} onSelectBoard={onSelectBoard} />
        </div>
        <div className={s.bottomElements}>
          <NeedHelpComponent className={s.bottom} />
          <LogOutBtn className={s.bottom} />
        </div>
      </nav>
      </aside>
  );
};

export default Sidebar;
