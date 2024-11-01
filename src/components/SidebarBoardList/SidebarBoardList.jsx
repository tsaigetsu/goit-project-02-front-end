// import { useDispatch, useSelector } from "react-redux";
import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import s from "./SidebarBoardList.module.css";
// import { useEffect } from "react";

const SidebarBoardList = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchBoardsThunk());
  // }, [dispatch]);
  // const data = useSelector((state) => selectBoards(state));
  return (
    <ul className={s.ul}>
      {/* нужен скролл */}
      <li className={s.myBoardsText}>My boards</li>
      <li className={s.createBoard}>
        <p className={s.createBoardText}>Create a new board</p>
        <button className={s.createBoardBtn}>+</button>
      </li>
      {/* {data.map((item) => ( */}
      <SidebarBoardItem
      // key={item.id} name={item.name} id={item.id}
      />
      {/* ))} */}
    </ul>
  );
};

export default SidebarBoardList;
