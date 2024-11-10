
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";

const CardManager = () => {


  return (
    <div className={s.cardManager}>
      <CardList 
      />

      <button
        className={s.cardManagerButton}

      >
        <SvgIcon
          id="icon-normalBtnBlack"
          className={s.createIcon}
          width="28"
          height="28"
        />
        Add another card
      </button>

    </div>
  );
};

 export default CardManager;

