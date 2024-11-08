import { useEffect, useState } from "react";
import css from "./MainDashboard.module.css";
import ColumnsList from "../ColumnsList/ColumnsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColumnsByBoard,
  // selectColumnsByBoard,
  selectError,
  selectLoading,
} from "../../redux/columns/selectors.js";

import { getBoardByIdThunk } from "../../redux/boards/operations.js";
// import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn.jsx";
import AddColumn from "../AddColumn/AddColumn.jsx";
import { onCreateColumn } from "../../redux/columns/operations.js";

const MainDashboard = ({ board, filter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { _id } = board;
  // const columns = useSelector(selectColumnsByBoard);
  const columns = useSelector((state) => selectColumnsByBoard(state, _id));
  const dispatch = useDispatch();
  // console.log("bardId", _id);
  console.log("columns by board", columns);
  console.log("Board", board);
  // console.log("isOpen", isOpen);

  useEffect(() => {
    if (_id) {
      dispatch(getBoardByIdThunk(_id));
    }
  }, [dispatch, _id]);

  const handleSaveColumn = (newTitle) => {
    const newColumn = { title: newTitle, boardId: _id };
    console.log("newColumn", newColumn);

    dispatch(onCreateColumn(newColumn));
    setIsOpen(false);
    // const currentBoard = dispatch(getBoardByIdThunk(id));
    // console.log(currentBoard);
  };

  if (loading) return <p>Loading columns...</p>;
  if (error) return <p>Error loading columns: {error}</p>;

  return (
    <>
      <div className={css.wrapperMainDashboard}>
        <div>
          <div className={css.columnsWrapper}>
            <ColumnsList
              columns={columns}
              boardId={_id}
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
