import { useEffect, useState } from "react";
import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColumnsByBoard,
  selectError,
  selectLoading,
} from "../../redux/columns/slice";

import { fetchBoardsThunk } from "../../redux/boards/operations";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import AddColumn from "../AddColumn/AddColumn";
import { onCreateColumn } from "../../redux/columns/operations";

const MainDashboard = ({ board, filter }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const columns = useSelector(selectColumnsByBoard);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const boardId = board.id;
  const dispatch = useDispatch();
  const columns = useSelector((state) => selectColumnsByBoard(state));
  console.log("bardId", boardId);
  console.log("columns", columns);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardsThunk(boardId));
    }
  }, [dispatch, boardId]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleSaveColumn = (newTitle) => {
    console.log("Adding column with title:", newTitle);
    const newColumn = { title: newTitle, boardId: boardId };
    console.log("NewColumn:", newColumn);
    // console.log("boardId:", boardId);
    dispatch(onCreateColumn(newColumn));
    setIsOpen(false);
  };
  if (loading) return <p>Loading columns...</p>;
  if (error) return <p>Error loading columns: {error}</p>;

  return (
    <>
      <div className={css.wrapperMainDashboard}>
        {!columns.length === 0 ? (
          <div>
            <div className={css.columnsWrapper}>
              <ColumnsList boardId={boardId} filter={filter} />
            </div>
          </div>
        ) : (
          <AddAnotherColumn setIsOpen={handleOpenModal} />
        )}
      </div>
      {isOpen && (
        <AddColumn onAddColumn={handleSaveColumn} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default MainDashboard;
