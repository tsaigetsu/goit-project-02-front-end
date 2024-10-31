import s from "./SidebarBoardItem.module.css";

const SidebarBoardItem = () => {
  return (
    <li className={s.li}>
      <div className={s.boardName}>
        <svg width="18" height="18"></svg>
        <p>{name}BoardName</p>
      </div>
      <div className={s.boardBtns}>
        <button>
          <svg width="16" height="16"></svg>
        </button>
        <button>
          <svg width="16" height="16"></svg>
        </button>
      </div>
    </li>
  );
};

export default SidebarBoardItem;
