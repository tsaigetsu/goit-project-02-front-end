import { useEffect } from "react";
import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/columns/slice";

import { fetchBoardsThunk } from "../../redux/boards/operations";

const MainDashboard = ({ board }) => {
  // const boards = useSelector(selectBoards);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  console.log("bardId", board.id);

  useEffect(() => {
    if (board.id) {
      dispatch(fetchBoardsThunk(board.id));
    }
  }, [dispatch, board.id]);

  if (loading) return <p>Loading columns...</p>;
  if (error) return <p>Error loading columns: {error}</p>;

  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <div className={css.wrapperText}>
          <div className={css.columnsWrapper}>
            <ColumnsList boardId={board.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
