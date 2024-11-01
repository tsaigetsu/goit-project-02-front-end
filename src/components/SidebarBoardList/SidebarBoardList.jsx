import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import s from "./SidebarBoardList.module.css";

const SidebarBoardList = () => {
  return (
    <ul className={s.ul}>
      <li className={s.myBoardsText}>My boards</li>
      <li className={s.createBoard}>
        <p className={s.createBoardText}>Create a new board</p>
        <button className={s.createBoardBtn}>+</button>
      </li>
      <SidebarBoardItem /> {/* в подальшому метод map */}
      <SidebarBoardItem />
    </ul>
  );
};

export default SidebarBoardList;
