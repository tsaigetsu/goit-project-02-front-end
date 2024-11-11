import css from "./ScreensPage.module.css";
import { selectBoards, selectedBoard } from "../../redux/boards/selectors.js";
import { useState } from "react";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";
import DefaultText from "../../components/DefaultText/DefaultText.jsx";
import NewBoardForm from "../../components/NewBoardForm/NewBoardForm.jsx";
import { useSelector } from "react-redux";
import backgrounds from "../../data/backgrounds.json";

const ScreensPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useSelector(selectBoards);
  const board = useSelector(selectedBoard);
  console.log("board", board);

  // const onOpen = () => {
  //   setIsOpen(true);
  // };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSaveBoard = (newBoard) => {
    console.log("New board saved:", newBoard);
    setIsOpen(false);
  };

  const backgroundUrl = (board?.backgroundId && board.backgroundId !== 'nobg') 
  ? backgrounds.desktop[board.backgroundId].normal 
  : null;

  return (
    <>
      <section className={css.wrapperScreenPage}>
        {boards.length === 0 || board === null ? (
          <DefaultText />
        ) : (
          <div className={css.screensPage__content}>
            <HeaderDashboard
              title={board.title}
              // onFilterChange={setFilter}
              // Передаємо функцію оновлення фільтра
              className={css.headerDashboard}
            />
            <MainDashboard
                // filter={filter}
                background={backgroundUrl}
              className={css.mainDashboard}
            />
          </div>
        )}
      </section>
      {isOpen && (
        <NewBoardForm isOpen={isOpen} onClose={onClose} onSave={handleSaveBoard} />
      )}
    </>
  );
};

export default ScreensPage;
