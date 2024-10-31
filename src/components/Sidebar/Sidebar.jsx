import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import s from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div>
      <div className={s.overlay} />
      <aside className={s.aside}>
        <nav>
          <h1 className={s.header}>
            <svg className={s.iconLogo} width="32" height="32">
              <use xlinkHref="../../assets/symbol-defs.svg#icon-logo"></use>
            </svg>
            <p className={s.logoText}>Task Pro</p>
          </h1>
          <p className={s.myBoardsText}>My boards</p>
          <div className={s.createBoard}>
            <p className={s.createBoardText}>Create a new board</p>
            <button className={s.createBoardBtn}>+</button>
          </div>
        </nav>
        <ul className={s.ul}>
          <SidebarBoardItem />
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
