import css from "./ScreensPage.module.css";
import { selectBoards } from "../../redux/boards/selectors";
import { useSelector, useState } from "react";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

const ScreensPage = ({ board }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const board = useSelector(selectBoards);
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
          <p className={css.text}>
            Before starting your project, it is essential
            <span>
              <button className={css.spanBtn}>to create a board</button>
            </span>
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        ) : (
          <div className={css.screensPage__content}>
            <HeaderDashboard
              titleBoard={board.title}
              className={css.headerDashboard}
            />
            <MainDashboard board={board} className={css.mainDashboard} />
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
