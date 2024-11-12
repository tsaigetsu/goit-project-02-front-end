import React, { useState, useMemo, useCallback } from "react";
import css from "./ScreensPage.module.css";
import { selectBoards, selectedBoard } from "../../redux/boards/selectors.js";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";
import DefaultText from "../../components/DefaultText/DefaultText.jsx";
import NewBoardForm from "../../components/NewBoardForm/NewBoardForm.jsx";
import { useSelector } from "react-redux";
import backgrounds from "../../data/backgrounds.json";

// Мемоизируем компоненты для предотвращения лишних ререндеров
const MemoizedHeaderDashboard = React.memo(HeaderDashboard);
const MemoizedMainDashboard = React.memo(MainDashboard);
const MemoizedDefaultText = React.memo(DefaultText);

const ScreensPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useSelector(selectBoards);
  const board = useSelector(selectedBoard);
  console.log("board", board);

  // Мемоизация для backgroundUrl
  const backgroundUrl = useMemo(() => {
    return board?.backgroundId && board.backgroundId !== "nobg"
      ? backgrounds.desktop[board.backgroundId]?.normal
      : null;
  }, [board]);

  // Мемоизация функций с использованием useCallback
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSaveBoard = useCallback((newBoard) => {
    console.log("New board saved:", newBoard);
    setIsOpen(false);
  }, []);

  // const onOpen = () => {
  //   setIsOpen(true);
  // };

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  // const handleSaveBoard = (newBoard) => {
  //   console.log("New board saved:", newBoard);
  //   setIsOpen(false);
  // };

  // const backgroundUrl = (board?.backgroundId && board.backgroundId !== 'nobg') 
  // ? backgrounds.desktop[board.backgroundId].normal 
  // : null;

  return (
    <>
      <section className={css.wrapperScreenPage}>
        {boards.length === 0 || board === null ? (
          <MemoizedDefaultText onOpen={onOpen} />
        ) : (
          <div className={css.screensPage__content}>
            <MemoizedHeaderDashboard
              title={board.title}
              // onFilterChange={setFilter}
              className={css.headerDashboard}
            />
            <MemoizedMainDashboard
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

export default React.memo(ScreensPage);
