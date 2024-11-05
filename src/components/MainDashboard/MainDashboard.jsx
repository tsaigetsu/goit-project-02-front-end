import { useEffect, useState } from "react";
import css from "./MainDashboard.module.css";
// import EditProfile from "../EditProfile/Editprofile";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import ColumnsList from "../ColumnsList/ColumnsList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColumnsByBoard,
  selectError,
  selectLoading,
} from "../../redux/columns/slice";
import { fetchColumns, onAddColumn } from "../../redux/columns/operations";
import NewBoardForm from "../NewBoardForm/NewBoardForm";

const MainDashboard = ({ boardId }) => {
  // Получаем колонки для текущей доски по boardId
  const columns = useSelector((state) => selectColumnsByBoard(state, boardId));
  //получить борды с помощь useSelector
  const boards = ["1", "2"];

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Загружаем колонки при первом рендере
  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [dispatch, boardId]);

  const handleAddColumn = (title) => {
    // Диспатч для добавления новой колонки с заголовком
    dispatch(onAddColumn({ boardId, newColumn: { title } }));
  };

  if (loading) return <p>Loading columns...</p>;
  if (error) return <p>Error loading columns: {error}</p>;

  const handleAddBoard = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={css.container1}>
        <div className={css.wrapper1}>
          <div className={css.wrapperText}>
            {!boards.length > 0 ? (
              <p className={css.text}>
                Before starting your project, it is essential{" "}
                <span>
                  <button className={css.spanBtn} onClick={handleAddBoard}>
                    to create a board
                  </button>
                </span>
                to visualize and track all the necessary tasks and milestones.
                This board serves as a powerful tool to organize the workflow
                and ensure effective collaboration among team members.
              </p>
            ) : (
              <div className={css.columnsWrapper}>
                <div className={css.columnsList}>
                  <ColumnsList columns={columns} />
                </div>
                <AddAnotherColumn
                  onAddColumn={handleAddColumn}
                  boardId={boardId}
                />
              </div>
            )}
            {/* {isOpen && <EditProfile />} */}
            {isOpen && <NewBoardForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
