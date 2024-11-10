import { useState } from "react";
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";
import AddCardPopup from "../AddCardPopup/AddCardPopup.jsx";

const CardManager = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.cardManager}>
      <CardList />

      <button className={s.cardManagerButton} onClick={() => setIsOpen(true)}>
        <SvgIcon
          id="icon-normalBtnBlack"
          className={s.createIcon}
          width="28"
          height="28"
        />
        Add another card
      </button>
      {isOpen && <AddCardPopup />}
    </div>
  );
};

export default CardManager;
