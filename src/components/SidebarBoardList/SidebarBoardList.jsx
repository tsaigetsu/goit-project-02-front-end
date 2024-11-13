import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NewBoardForm from "../NewBoardForm/NewBoardForm";
import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardList.module.css";
import { selectBoards } from "../../redux/boards/selectors.js";
import {
  addBoardsThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  getBoardByIdThunk,
  updateBoardThunk,
} from "../../redux/boards/operations.js";
import icons from "../../data/icons.json";
import EditBoardForm from "../EditBoardForm/EditBoardForm.jsx";

import toast from "react-hot-toast";

const SidebarBoardList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [selectedBoardData, setSelectedBoardData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const boards = useSelector(selectBoards);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveBoard = async (newBoard) => {
    dispatch(addBoardsThunk(newBoard));
    setIsModalOpen(false);
  };

  const handleSelectBoard = async (boardId) => {
    try {
      const board = await dispatch(getBoardByIdThunk(boardId)).unwrap();

      setSelectedBoardData(board);
      setActiveBoardId(boardId);
    } catch (error) {
      toast.error(error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
    }
  };

  const getIconNameById = (id) => {
    const icon = icons.find((icon) => icon.id === id);
    return icon ? icon.iconName : "icon-default";
  };

  const handleEdit = async (boardId) => {
    try {
      const boardData = await dispatch(getBoardByIdThunk(boardId)).unwrap();
      setSelectedBoardData(boardData);
      setIsEditModalOpen(true);
    } catch (error) {
      toast.error(error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
    }
  };

  const handleSaveChanges = async (updatedBoard) => {
    try {
      await dispatch(
        updateBoardThunk({
          boardId: selectedBoardData._id,
          ...updatedBoard,
        })
      );
      setIsEditModalOpen(false);
      setSelectedBoardData(null);
    } catch (error) {
      toast.error(error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
    }
  };

  const handleDelete = async (boardId) => {
    console.log("boardId", boardId);
    try {
      await dispatch(deleteBoardThunk(boardId));

      dispatch(fetchBoardsThunk());

      if (boardId === activeBoardId) {
        setActiveBoardId(null);
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
    }
  };

  return (
    <>
      <div className={s.myBoards}>
        <p className={s.myBoardsText}>My boards</p>
        <div className={s.createBoard}>
          <p className={s.createBoardText}>Create a new board</p>
          <button className={s.createBoardBtn} onClick={handleOpenModal}>
            <SvgIcon
              id="icon-plus"
              className={s.createIcon}
              width="20"
              height="20"
            />
          </button>
        </div>
        <ul className={s.ul}>
          {boards.map((board) => (
            <SidebarBoardItem
              key={board._id}
              name={board.title}
              id={board._id}
              iconId={getIconNameById(board.iconId)}
              onDelete={() => handleDelete(board._id)}
              onSelect={() => handleSelectBoard(board._id)}
              isActive={board._id === activeBoardId}
              onEdit={() => handleEdit(board._id)}
            />
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <NewBoardForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBoard}
        />
      )}
      {isEditModalOpen && selectedBoardData && (
        <EditBoardForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialTitle={selectedBoardData.title}
          initialIcon={selectedBoardData.iconId}
          initialBackground={selectedBoardData.backgroundId}
          onSave={handleSaveChanges}
        />
      )}
    </>
  );
};

export default SidebarBoardList;
