import css from "./AddAnotherColumn.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";

const AddAnotherColumn = ({ setIsOpen }) => {
  const handleOpenModalAddColumn = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={css.section}>
        <button
          className={css.btnAdd}
          type="button"
          onClick={handleOpenModalAddColumn}
        >
          <div className={css.svg}>
            <SvgIcon
              id="icon-plus"
              className={css.svgIcon}
              width="14"
              height="14"
            />
          </div>
          Add another column
        </button>
      </div>
    </>
  );
};
export default AddAnotherColumn;
