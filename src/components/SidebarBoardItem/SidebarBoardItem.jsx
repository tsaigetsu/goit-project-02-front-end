import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardItem.module.css";

const SidebarBoardItem = ({
  iconId,
  id,
  name,
  onSelect,
  isActive,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <li
        className={`${s.li} ${isActive ? s.isActiveProject : ""}`}
        onClick={onSelect}
      >
        {/* добавить динамику для второго класса */}
        <div className={s.boardName}>
          <SvgIcon
            id={iconId} //  заменить на айди иконки с бека
            className={s.projectIcon}
            width="18"
            height="18"
          />
          <p className={s.p}>{name}</p>
        </div>
        <div className={s.boardBtns}>
          <button className={s.btn} onClick={() => onEdit(id)}>
            <SvgIcon
              id="icon-pencil-01"
              className={s.boardIcon}
              width="16"
              height="16"
            />
          </button>
          <button className={s.btn} onClick={() => onDelete(id)}>
            <SvgIcon
              id="icon-trash-04"
              className={s.boardIcon}
              width="16"
              height="16"
            />
          </button>
          <div className={s.activeLine}></div>
        </div>
      </li>
    </>
  );
};

export default SidebarBoardItem;
