import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddAnotherCard.module.css";
import AddCardPopup from "../AddCardPopup/AddCardPopup";
import { useState } from "react";

const AddAnotherCard = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const handleAddCard = () => {
    setIsCardVisible(true);
  };
  return (
    <>
      <div className={css.section}>
        <button className={css.btnAdd} type="submit" onClick={handleAddCard}>
          <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
          Add another card
        </button>
        {isCardVisible && <AddCardPopup setIsCardVisible={setIsCardVisible} />}
      </div>
    </>
  );
};
export default AddAnotherCard;
