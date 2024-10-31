import LogoComponent from "../LogoComponent/LogoComponent";
import NeedHelpComponent from "../NeedHelpComponent/NeedHelpComponent";
import SidebarBoardList from "../SidebarBoardList/SidebarBoardList";
import s from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside>
      <div className={s.overlay} />
      <div className={s.aside}>
        <nav className={s.nav}>
          <LogoComponent />
          <SidebarBoardList />
          <NeedHelpComponent />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
