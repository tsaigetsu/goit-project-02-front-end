import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./LogOutBtn.module.css";
const LogOutBtn = () => {
  return (
    <button className={s.btn}>
      <SvgIcon
        id="icon-pencil-01"
        className="logOutIcon"
        width="32"
        height="32"
      />
      Log out
    </button>
  );
};

export default LogOutBtn;
