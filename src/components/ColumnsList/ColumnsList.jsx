import { useDispatch, useSelector } from "react-redux";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice";
import { useState } from "react";
import AddColumn from "../AddColumn/AddColumn";
import { onCreateColumn } from "../../redux/columns/operations";

const ColumnsList = ({ boardId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const columns = useSelector((state) => selectColumnsByBoard(state, boardId));
  
  console.log("columns", columns);

  // useEffect(() => {
  //   dispatch(fetchCardsThunk());
  // }, [dispatch]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleSaveColumn = (newTitle) => {
    console.log("Adding column with title:", newTitle);
    const newColumn = { title: newTitle };
    console.log("NewColumn:", newTitle);
    console.log("boardId:", boardId);
    dispatch(onCreateColumn({ boardId, newColumn }));
    setIsOpen(false);
  };
  return (
    <>
      <section className={css.wrapperList}>
        <ul className={css.columnsList}>
          {columns.map((column) => (
            <li key={column.id} className={css.itemList}>
              <Column column={column} boardId={boardId} />
            </li>
          ))}
        </ul>
        <AddAnotherColumn setIsOpen={handleOpenModal} />
      </section>

      {isOpen && (
        <AddColumn onAddColumn={handleSaveColumn} setIsOpen={setIsOpen} />
      )}
    </>
  );
};
export default ColumnsList;
