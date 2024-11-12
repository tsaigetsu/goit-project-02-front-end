import { useState } from "react";
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";
import AddCardPopup from "../AddCardPopup/AddCardPopup.jsx";
import { useSelector } from "react-redux";
import { selectCardsFromColumn } from "../../redux/cards/selectors.js";
// import { selectedBoard } from "../../redux/boards/slice.js";

const CardManager = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const board = useSelector(selectedBoard);
  // const { tasks } = board;

  const tasks = useSelector((state) => selectCardsFromColumn(state, columnId));
  console.log("cards", tasks);

  return (
    <div className={s.cardManager}>
      {tasks.length > 0 && <CardList columnId={columnId} />}

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
