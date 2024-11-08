import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NewBoardForm from "../NewBoardForm/NewBoardForm";
import SidebarBoardItem from "../SidebarBoardItem/SidebarBoardItem";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardList.module.css";
import { useEffect } from "react";
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

const SidebarBoardList = ({ onSelectBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBoardData, setSelectedBoardData] = useState(null);

  const handleEdit = (boardId) => {
    dispatch(getBoardByIdThunk(boardId)).then((data) => {
      setSelectedBoardData(data);
      setIsEditModalOpen(true);
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const data = useSelector((state) => selectBoards(state));
  console.log("data", data);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => setIsModalOpen(false);

  const handleSaveBoard = (newBoard) => {
    dispatch(addBoardsThunk(newBoard));
    onClose();
  };

  const handleSelectBoard = (id, title) => {
    setActiveBoardId(id);
    onSelectBoard({ id, title });
  };

  const getIconNameById = (id) => {
    const icon = icons.find((icon) => icon.id === id);
    return icon ? icon.iconName : "icon-default";
  };
  const handleSaveChanges = (updatedBoard) => {
    dispatch(
      updateBoardThunk({
        boardId: selectedBoardData._id,
        title: updatedBoard.title,
        iconId: updatedBoard.iconId,
        backgroundId: updatedBoard.backgroundId,
      })
    );
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={s.myBoards}>
        {/* нужен скролл */}
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
          {data.map((item) => (
            <SidebarBoardItem
              key={item._id}
              name={item.title}
              id={item._id}
              iconId={getIconNameById(item.iconId)}
              onDelete={() => dispatch(deleteBoardThunk(item._id))}
              onSelect={() => handleSelectBoard(item._id, item.title)}
              isActive={item._id === activeBoardId}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <NewBoardForm
          isOpen={isModalOpen}
          onClose={onClose}
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
