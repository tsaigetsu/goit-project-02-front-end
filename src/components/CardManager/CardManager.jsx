import React, { useState, useMemo } from "react";
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";
import AddCardPopup from "../AddCardPopup/AddCardPopup.jsx";
import { useSelector } from "react-redux";
import { selectCardsInColumn } from "../../redux/columns/selectors.js";

// Мемоизируем компонент CardList для предотвращения лишних ререндеров
const MemoizedCardList = React.memo(CardList);

const CardManager = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cards = useSelector((state) => selectCardsInColumn(state, columnId));

  // Мемоизация обработчика открытия модального окна
  const handleOpenPopup = useMemo(() => () => setIsOpen(true), []);

  return (
    <div className={s.cardManager}>
      {cards.length > 0 && <MemoizedCardList cards={cards} />}

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
      {isOpen && <AddCardPopup setIsOpen={setIsOpen} columnId={columnId} />}
    </div>
  );
};

export default React.memo(CardManager);
