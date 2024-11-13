import css from "./AddAnotherColumn.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useState } from "react";
import AddColumn from "../AddColumn/AddColumn";

const AddAnotherColumn = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={css.section}>
        <button
          className={css.btnAdd}
          type="button"
          onClick={() => setIsOpen(true)}
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
      {isOpen && <AddColumn setIsOpen={setIsOpen} />}
    </>
  );
};
export default AddAnotherColumn;
