import { useDispatch, useSelector } from "react-redux";
import AddAnotherColumn from "../AddAnotherColumn/AddAnotherColumn";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice";
import { useState } from "react";
import AddColumn from "../AddColumn/AddColumn";
import { onAddColumn } from "../../redux/columns/operations";

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
  const handleSaveColumn = (title) => {
    console.log("Adding column with title:", title);

    dispatch(onAddColumn({ title: title, boardId }));
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
