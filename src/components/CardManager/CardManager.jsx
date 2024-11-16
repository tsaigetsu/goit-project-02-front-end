import React, { useState, useMemo } from 'react';
import CardList from '../CardList/CardList.jsx';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import s from './CardManager.module.css';
import AddCardPopup from '../AddCardPopup/AddCardPopup.jsx';
import { useSelector } from 'react-redux';
import { selectCardsFromColumn } from '../../redux/cards/selectors.js';
// import { selectedBoard } from "../../redux/boards/slice.js";

// Мемоизируем компонент CardList для предотвращения лишних ререндеров
const MemoizedCardList = React.memo(CardList);

const CardManager = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const board = useSelector(selectedBoard);
  // const { tasks } = board;

  const tasks = useSelector(state => selectCardsFromColumn(state, columnId));

  // Мемоизация обработчика открытия модального окна
  const handleOpenPopup = useMemo(() => () => setIsOpen(true), []);

  return (
    <div className={s.cardManager}>
      {tasks.length > 0 && <MemoizedCardList columnId={columnId} />}
      <div className={s.btnContainer}>
        <button className={s.cardManagerButton} onClick={handleOpenPopup}>
          <div className={s.svg}>
            <SvgIcon
              id="icon-plus"
              className={s.svgIcon}
              width="14"
              height="14"
            />
          </div>
          Add another card
        </button>
      </div>
      {isOpen && <AddCardPopup setIsOpen={setIsOpen} columnId={columnId} />}
    </div>
  );
};

export default React.memo(CardManager);
