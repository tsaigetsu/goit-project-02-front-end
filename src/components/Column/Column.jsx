import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./Column.module.css";
import EditColumn from "../EditColumn/EditColumn";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import CardManager from "../CardManager/CardManager";
import { onDeleteColumn } from "../../redux/columns/operations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectColumnsByBoard } from "../../redux/columns/slice";

const Column = ({ title, columnId, boardId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = useSelector(selectColumnsByBoard);
  // const { title, _id } = column;

  // console.log("title", title);
  console.log("columns", columns);

  const onDelete = () => {
    if (columnId && boardId) {
      dispatch(onDeleteColumn({ columnId, boardId }));
      closeModal();
      // if (value !== '') {
      //   dispatch(changeFilter(''));
      // }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={css.itemList}>
        <div className={css.section}>
          <div className={css.wrapper}>
            <div className={css.container}>
              <p>{title || "Untitled Column"}</p>
              <div className={css.boxIcon}>
                <button
                  className={css.btnIcon}
                  // onChange={onEdit}
                  onClick={() => setIsEdit(true)}
                >
                  <SvgIcon id="icon-pencil-01" width="16" height="16" />
                </button>
                <button className={css.btnIcon} onClick={openModal}>
                  <SvgIcon id="icon-trash-04" width="16" height="16" />
                </button>
              </div>
            </div>
            <CardManager columnId={columnId} />

            {isEdit && (
              <EditColumn
                title={title}
                columnId={columnId}
                boardId={boardId}
                setIsEdit={setIsEdit}
                // isEdit={isEdit}
              />
            )}
          </div>
        </div>
      </li>

      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={onDelete}
        typeItems={"column"}
        titleItems={title || "Untitled Column"}
      />
    </>
  );
};
export default Column;
