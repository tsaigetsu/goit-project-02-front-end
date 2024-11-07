import { useSelector } from "react-redux";
import Column from "../Column/Column";
import css from "./ColumnsList.module.css";
import { selectColumnsByBoard } from "../../redux/columns/slice";

const ColumnsList = ({ boardId }) => {
  const columns = useSelector((state) => selectColumnsByBoard(state));

  console.log("columns", columns);

  // useEffect(() => {
  //   dispatch(fetchCardsThunk());
  // }, [dispatch]);

  return (
    <>
      <section className={css.wrapperList}>
        <ul className={css.columnsList}>
          {columns.map((column) => (
            <li key={column._id} className={css.itemList}>
              <Column column={column} boardId={boardId} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default ColumnsList;
