import { useEffect, useState } from "react";
import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList.jsx";
import { useDispatch, useSelector } from "react-redux";
// import { selectError, selectLoading } from "../../redux/columns/selectors.js";
import { getBoardByIdThunk } from "../../redux/boards/operations.js";
import AddColumn from "../AddColumn/AddColumn.jsx";
import { onCreateColumn } from "../../redux/columns/operations.js";
import { selectedBoard } from "../../redux/boards/selectors.js";

const MainDashboard = ({ boardId, filter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardByIdThunk(boardId));
    }
  }, [boardId, dispatch]);

  const board = useSelector((state) => selectedBoard(state));
  console.log("Board", board);
  console.log("boardId", boardId);
  console.log("columns by board", board.columns);
  // const columns = board.columns;

  const handleSaveColumn = (newTitle) => {
    const newColumn = { title: newTitle, boardId: boardId };
    dispatch(onCreateColumn(newColumn));
    setIsOpen(false);
  };

  // if (!board) {
  //   return <p>Loading board...</p>; // Відображаємо повідомлення, поки дані завантажуються
  // }
  // if (loading) return <p>Loading columns...</p>;
  // if (error) return <p>Error loading columns: {error}</p>;

  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <div>
          <div className={css.columnsWrapper}>
            <ColumnsList
              // columns={columns}
              boardId={boardId}
              filter={filter}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
        {/* <AddAnotherColumn setIsOpen={() => setIsOpen(true)} /> */}
      </div>
      {isOpen && (
        <AddColumn onCreateColumn={handleSaveColumn} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default MainDashboard;
