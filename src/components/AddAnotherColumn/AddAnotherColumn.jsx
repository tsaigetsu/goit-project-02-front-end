import { useState } from "react";
import css from "./AddAnotherColumn.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import AddColumn from "../AddColumn/AddColumn";
import { useDispatch } from "react-redux";

const AddAnotherColumn = ({ boardId, onAddColumn }) => {
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModalAddColumn = () => {
    setIsAddColumnVisible(true);
  };

  const handleAddColumn = (title) => {
    if (title.trim()) {
      dispatch(onAddColumn({ title, boardId }));
    }
    setIsAddColumnVisible(false);
  };
  return (
    <>
      <div className={css.section}>
        <button
          className={css.btnAdd}
          type="submit"
          onClick={handleOpenModalAddColumn}
        >
          <div className={css.svg}>
            <SvgIcon id="icon-plus" width="14" height="14" />
          </div>
          Add another column
        </button>
        {isAddColumnVisible && (
          <AddColumn
            onAddColumn={handleAddColumn}
            setIsAddColumnVisible={setIsAddColumnVisible}
          />
        )}
      </div>
    </>
  );
};
export default AddAnotherColumn;
