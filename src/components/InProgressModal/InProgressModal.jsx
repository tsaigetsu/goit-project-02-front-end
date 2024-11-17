import s from './InProgressModal.module.css';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { useEffect, useRef } from 'react';
// import Column from "../Column/Column.jsx";
// import { selectColumnsByBoard } from "../../redux/columns/selectors.js";
const InProgressModal = ({
  filteredColumns,
  handleMoveCard,
  setIsModalChange,
  // onStatusChange,
}) => {
  const modalRef = useRef(null);

  const handleOutsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalChange(false);
    }
  };

  const handleEscape = event => {
    if (event.key === 'Escape') {
      setIsModalChange(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsModalChange]);

  return (
    <div
    // className={s.overlay}
    // onClick={handleBackdropClick}
    >
      <ul
        className={s.modalInProgr}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
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
    </div>
  );
};

export default InProgressModal;
