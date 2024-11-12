import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./LogoComponent.module.css";

const LogoComponent = () => {
  return (
    <h1 className={s.header}>
      <div className={s.logoContainer}>
        <SvgIcon
          id="icon-lightning"
          className={s.logoIcon}
          width="20"
          height="20"
        />{" "}
      </div>
      <p className={s.logoText}>Task Pro</p>
    </h1>
  );
};

export default LogoComponent;
