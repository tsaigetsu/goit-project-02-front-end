// import { useDispatch } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./SidebarBoardItem.module.css";

const SidebarBoardItem = ({ name }) => {
  // const dispatch = useDispatch();
  return (
    <li className={`${s.li} ${s.isActiveProject}`}>
      {/* добавить динамику для второго класса */}
      <div className={s.boardName}>
        <SvgIcon
          id="icon-Project" //  заменить на айди иконки с бека
          className={s.projectIcon}
          width="18"
          height="18"
        />
        <p className={s.p}>{name}BoardName</p>
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
        <button
          className={s.btn}
          // onClick={() => dispatch(deleteBoardThunk(id))}
        >
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
  );
};

export default SidebarBoardItem;
