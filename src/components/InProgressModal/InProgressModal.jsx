import s from "./InProgressModal.module.css";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
// import Column from "../Column/Column.jsx";
import { useSelector } from "react-redux";
import { selectColumnsByBoard } from "../../redux/columns/selectors.js";
import { selectedBoard } from "../../redux/boards/selectors.js";

const InProgressModal = ({
  // isModalChange,
  // columnId,
  setIsModalChange,
  // onStatusChange,
}) => {
  // if (!isModalChange) return null;
  const board = useSelector(selectedBoard);
  // const columns = useSelector(selectColumnsByBoard);
  console.log("board", board);
  const { columns } = board;

  return (
    <div className={s.overlayInProgr} onClick={() => setIsModalChange(false)}>
      <ul className={s.modalInProgr} onClick={(e) => e.stopPropagation()}>
        {columns.map((column) => (
          <>
            <li key={column._id} className={s.item}>
              <span className={s.title}>{column.title}</span>
              <span className={s.icon}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  className={s.svgIcon}
                  width="16"
                  height="16"
                />
              </span>
            </li>
          </>
        ))}
      </ul>

      {/* <div className={s.modalContentInProgr}>
          <div
            className={s.modalOption}
            onClick={() => onStatusChange("In progress")}
          >
            <p className={`${s.statusText} ${s.inProgress}`}>
              In progress
              <div className={s.arrowDiv}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  className={s.iconArrowRight}
                  width="16"
                  height="16"
                />
              </div>
            </p>
          </div>
          <div className={s.modalOption} onClick={() => onStatusChange("Done")}>
            <p className={`${s.statusText} ${s.done}`}>
              Done
              <div className={s.arrowDiv}>
                <SvgIcon
                  id="icon-arrow-circle-broken-right"
                  className={s.iconArrowRight}
                  width="16"
                  height="16"
                />
              </div>
            </p>
          </div>
        </div> */}
    </div>
  );
};

export default InProgressModal;
