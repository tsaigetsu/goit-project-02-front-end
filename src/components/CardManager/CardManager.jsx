import { useState } from "react";
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";
import AddCardPopup from "../AddCardPopup/AddCardPopup.jsx";
import { useSelector } from "react-redux";
import { selectCardsInColumn } from "../../redux/columns/selectors.js";

const CardManager = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cards = useSelector((state) => selectCardsInColumn(state, columnId));

  return (
    <div className={s.cardManager}>
      {cards.length > 0 && <CardList cards={cards} />}

      <button className={s.cardManagerButton} onClick={() => setIsOpen(true)}>
        <SvgIcon
          id="icon-normalBtnBlack"
          className={s.createIcon}
          width="28"
          height="28"
        />
        Add another card
      </button>
      {isOpen && <AddCardPopup setIsOpen={setIsOpen} columnId={columnId} />}
    </div>
  );
};

export default CardManager;
