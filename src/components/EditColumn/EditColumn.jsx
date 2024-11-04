import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./EditColumn.module.css";

//принимает в пропсах стейт контролирующий открытие и закрытие окна isModalOpen, setIsModalOpen
const EditColumn = ({ setIsEdit }) => {
  const closeModal = () => {
    setIsEdit(false);
  };

  const handleAddColumn = () => {
    // const newColumn = { title: "" };
    setIsEdit(false);
  };
  return (
    <>
      <div className={css.section}>
        <div className={css.overlay}>
          <div className={css.container}>
            <p className={css.title}>Edit column</p>
            <button className={css.btnClose} onClick={closeModal}>
              <SvgIcon id="icon-x-close" width="18" height="18" />
            </button>
            <input type="text" className={css.inputTitle} placeholder="To Do" />
            <button
              className={css.btnAdd}
              type="submit"
              onClick={handleAddColumn}
            >
              <SvgIcon id="icon-normalBtnBlack" width="28" height="28" />
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditColumn;
