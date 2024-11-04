import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddAnotherCard.module.css";

const AddAnotherCard = () => {
  const handleAddCard = () => {};
  return (
    <>
      <div className={css.section}>
        <button className={css.btnAdd} type="submit" onClick={handleAddCard}>
          <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
          Add another card
        </button>
      </div>
    </>
  );
};
export default AddAnotherCard;
