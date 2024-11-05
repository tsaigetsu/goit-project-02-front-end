import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NewBoardForm from "../NewBoardForm/NewBoardForm";
import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardList.module.css";
import { useEffect } from "react";
import { selectBoards } from "../../redux/boards/selectors";
import {
  addBoardsThunk,
  fetchBoardsThunk,
} from "../../redux/boards/operations";

const SidebarBoardList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const data = useSelector((state) => selectBoards(state));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => setIsModalOpen(false);

  const handleSaveBoard = (newBoard) => {
    dispatch(addBoardsThunk(newBoard));
    onClose();
  };

  return (
    <>
      <ul className={s.ul}>
        {/* нужен скролл */}
        <li className={s.myBoardsText}>My boards</li>
        <li className={s.createBoard}>
          <p className={s.createBoardText}>Create a new board</p>
          <button className={s.createBoardBtn} onClick={handleOpenModal} >
            <SvgIcon
              id="icon-plus"
              className={s.createIcon}
              width="20"
              height="20"
            />
          </button>
        </li>
        {data.map((item) => (
          <SidebarBoardItem key={item._id} name={item.title} id={item._id} />
        ))}
      </ul>
      {isModalOpen && <NewBoardForm isOpen={isModalOpen} onClose={onClose} onSave={handleSaveBoard} />}
    </>
  );
};

export default SidebarBoardList;
