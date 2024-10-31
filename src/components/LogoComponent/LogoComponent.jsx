import s from "./LogoComponent.module.css";

const LogoComponent = () => {
  return (
    <h1 className={s.header}>
      <svg className={s.iconLogo} width="32" height="32">
        <use xlinkHref="../../assets/symbol-defs.svg#icon-icon"></use>
      </svg>
      <p className={s.logoText}>Task Pro</p>
    </h1>
  );
};

export default LogoComponent;
