import s from './InProgressModal.module.css';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
// import Column from "../Column/Column.jsx";
// import { selectColumnsByBoard } from "../../redux/columns/selectors.js";

const InProgressModal = ({
  filteredColumns,
  handleMoveCard,
  // onStatusChange,
}) => {
  // if (!isModalChange) return null;
  // const columns = useSelector(selectColumnsByBoard);
  // const { columns } = board;

  return (
    <ul className={s.modalInProgr} onClick={e => e.stopPropagation()}>
      {filteredColumns.map(column => (
        <li
          key={column._id}
          className={s.item}
          onClick={() => handleMoveCard(column._id)}
        >
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
      ))}
    </ul>
  );
};

export default InProgressModal;
