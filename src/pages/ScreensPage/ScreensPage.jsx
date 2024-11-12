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
  // console.log("board", board);

  // Мемоизация для backgroundUrl
  const backgroundStyles = useMemo(() => {
    if (!board?.backgroundId || board.backgroundId === "nobg") {
      return {
        "--background-mobile-normal": "none",
        "--background-mobile-large": "none",
        "--background-tablet-normal": "none",
        "--background-tablet-large": "none",
        "--background-desktop-normal": "none",
        "--background-desktop-large": "none",
      };
    }

    const bg = backgrounds;
    const backgroundId = board.backgroundId;

    return {
      "--background-mobile-normal": `url(${bg.mobile[backgroundId]?.normal || ""})`,
      "--background-mobile-large": `url(${bg.mobile[backgroundId]?.large || ""})`,
      "--background-tablet-normal": `url(${bg.tablet[backgroundId]?.normal || ""})`,
      "--background-tablet-large": `url(${bg.tablet[backgroundId]?.large || ""})`,
      "--background-desktop-normal": `url(${bg.desktop[backgroundId]?.normal || ""})`,
      "--background-desktop-large": `url(${bg.desktop[backgroundId]?.large || ""})`,
    };
  }, [board]);

  // Мемоизация функций с использованием useCallback
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSaveBoard = useCallback(() => {
    // console.log("New board saved:", newBoard);
    setIsOpen(false);
  }, []);

  return (
    <>
      <section
        className={css.wrapperScreenPage}
        style={backgroundStyles}
      >
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
