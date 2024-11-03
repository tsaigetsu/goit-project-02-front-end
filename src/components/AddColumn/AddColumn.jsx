import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./AddColumn.module.css";

//принимает в пропсах стейт контролирующий открытие и закрытие окна isModalOpen, setIsModalOpen
const AddColumn = ({ setIsModalOpen }) => {
  //закрываем кнопкой {х}
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //при добавлении колонки, закрываем окно и добавляем колонку
  const handleAddColumn = () => {
    // const newColumn = { title: "" };
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={css.section}>
        <div className={css.container}>
          <p className={css.title}>Add column</p>
          <button className={css.btnClose} onClick={closeModal}>
            <SvgIcon id="icon-x-close" width="18" height="18" />
          </button>
          <input type="text" className={css.inputTitle} placeholder="Title" />
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
    </>
  );
};
export default AddColumn;
