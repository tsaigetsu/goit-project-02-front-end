import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./LogoComponent.module.css";

const LogoComponent = () => {
  return (
    <h1 className={s.header}>
      <SvgIcon id="icon-icon" className="logoIcon" width="32" height="32" />
      <p className={s.logoText}>Task Pro</p>
    </h1>
  );
};

export default LogoComponent;
