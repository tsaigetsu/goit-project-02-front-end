import css from "./ScreensPage.module.css";
import { selectBoards, selectedBoard } from "../../redux/boards/selectors.js";
import { useState } from "react";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";
import DefaultText from "../../components/DefaultText/DefaultText.jsx";
import NewBoardForm from "../../components/NewBoardForm/NewBoardForm.jsx";
import { useSelector } from "react-redux";

const ScreensPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useSelector(selectBoards);
  const board = useSelector(selectedBoard);
  console.log("board!!!!!", board);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <section className={css.wrapperScreenPage}>
        {boards.length === 0 || board === null || board === undefined ? (
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
              className={css.mainDashboard}
              boardId={board._id}
            />
          </div>
        )}
      </section>
      {isOpen && (
        <NewBoardForm isOpen={isOpen} onClose={onClose} onSave={onOpen} />
      )}
    </>
  );
};

export default ScreensPage;
