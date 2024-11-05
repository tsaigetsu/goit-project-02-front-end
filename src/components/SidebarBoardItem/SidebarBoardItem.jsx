import ScreensPage from "../../pages/ScreensPage/ScreensPage";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardItem.module.css";

const SidebarBoardItem = ({ iconId, id, name, onDelete }) => {
  return (
    <>
      <li className={`${s.li} ${s.isActiveProject}`}>
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
          <button className={s.btn}>
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
      <ScreensPage boardId={id} title={name} />
    </>
  );
};

export default SidebarBoardItem;
