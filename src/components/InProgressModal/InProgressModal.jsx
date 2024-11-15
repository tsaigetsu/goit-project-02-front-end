import s from './InProgressModal.module.css';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { useEffect } from 'react';
// import Column from "../Column/Column.jsx";
// import { selectColumnsByBoard } from "../../redux/columns/selectors.js";

const InProgressModal = ({
  filteredColumns,
  handleMoveCard,
  setIsModalChange,
  // onStatusChange,
}) => {
  // if (!isModalChange) return null;
  // const columns = useSelector(selectColumnsByBoard);
  // const { columns } = board;
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsModalChange(false); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener('keydown', handleEscape);

    // Очищаем подписку при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsModalChange]);

  // Обработчик для клика по бекдропу
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      setIsModalChange(false); // Закрываем модалку при клике по бекдропу
      console.log('close');
    }
  };
  return (
    <div
      // className={s.overlay}
      onClick={handleBackdropClick}
    >
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
    </div>
  );
};

export default InProgressModal;
