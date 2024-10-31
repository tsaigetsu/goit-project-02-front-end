import s from "./SidebarBoardItem.module.css";

const SidebarBoardItem = () => {
  return (
    <li className={`${s.li} ${s.isActiveProject}`}>
      <div className={s.boardName}>
        <svg width="18" height="18" className={s.svgProjectName}></svg>
        <p>{name}BoardName</p>
      </div>
      <div className={s.boardBtns}>
        <button className={s.btn}>
          <svg width="16" height="16">
            <use xlinkHref="../../assets/symbol-defs.svg#icon-icon"></use>
          </svg>
        </button>
        <button className={s.btn}>
          <svg width="16" height="16">
            <use xlinkHref="../../assets/symbol-defs.svg#icon-icon"></use>
          </svg>
        </button>
        <div className={s.activeLine}></div>
      </div>
    </li>
  );
};

export default SidebarBoardItem;
