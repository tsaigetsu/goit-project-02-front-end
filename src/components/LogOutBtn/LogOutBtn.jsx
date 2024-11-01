import { useDispatch } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./LogOutBtn.module.css";
import { logoutThunk } from "../../redux/auth/operation";
const LogOutBtn = () => {
  const dispatch = useDispatch();
  return (
    <button className={s.btn} onClick={() => dispatch(logoutThunk())}>
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
