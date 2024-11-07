import css from "./ScreensPage.module.css";
import { selectBoards, selectedBoard } from "../../redux/boards/selectors.js";
import { useState } from "react";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";
import DefaultText from "../../components/DefaultText/DefaultText.jsx";
import NewBoardForm from "../../components/NewBoardForm/NewBoardForm.jsx";
import { useSelector } from "react-redux";

const ScreensPage = ({ board }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(null); // Стан для фільтра
  const boards = useSelector(selectBoards);
  const boardById = useSelector(selectedBoard);
  console.log("board", board);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <section className={css.wrapperScreenPage}>
        {boards.length === 0 ? (
          <DefaultText />
        ) : (
          <div className={css.screensPage__content}>
            <HeaderDashboard
              titleBoard={board.title}
              onFilterChange={setFilter} // Передаємо функцію оновлення фільтра
              className={css.headerDashboard}
            />
            <MainDashboard board={board} filter={filter} className={css.mainDashboard} />

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
