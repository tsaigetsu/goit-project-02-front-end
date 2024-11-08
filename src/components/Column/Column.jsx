import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./Column.module.css";
import EditColumn from "../EditColumn/EditColumn";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import CardManager from "../CardManager/CardManager";
// import { onDeleteColumn } from "../../redux/columns/operations";
// import { useDispatch } from "react-redux";

const Column = ({ column, boardId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, _id } = column;

  console.log("title", title);
  // console.log(column);

  const onDelete = () => {
    // if (column._id && boardId) {
    //   dispatch(onDeleteColumn({ columnId: column._id, boardId }));
    //   closeModal();
    //   // if (value !== '') {
    //   //   dispatch(changeFilter(''));
    //   // }
    // }
  };
  const onEdit = () => {
    setIsEdit(true);
    // if (value !== "") {
    //   dispatch(changeFilter(""));
    // }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={css.section}>
        <div className={css.wrapper}>
          <div className={css.container}>
            <p>{title || "Untitled Column"}</p>
            <div className={css.boxIcon}>
              <button className={css.btnIcon} onClick={onEdit}>
                <SvgIcon id="icon-pencil-01" width="16" height="16" />
              </button>
              <button className={css.btnIcon} onClick={openModal}>
                <SvgIcon id="icon-trash-04" width="16" height="16" />
              </button>
            </div>
          </div>
          <CardManager columnId={_id} />

          {isEdit && (
            <EditColumn
              column={column}
              boardId={boardId}
              setIsEdit={setIsEdit}
              // isEdit={isEdit}
            />
          )}
        </div>
      </div>
      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={onDelete}
        typeItems={"column"}
        titleItems={column.title || "Untitled Column"}
      />
    </>
  );
};
export default Column;
