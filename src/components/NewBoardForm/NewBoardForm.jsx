import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./NewBoardForm.module.css";
import icons from "../../data/icons.json";
import backgrounds from "../../data/backgroungs.json";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(32, "Title cannot exceed 32 characters"),
});

const NewBoardForm = ({ isOpen, onClose, onSave }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [hasText, setHasText] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      icon: icons[0].id,
      background: "nobg",
    },
  });

  const selectedIcon = watch("icon");
  const selectedBackground = watch("background");

  const handleFormClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      reset();
      onClose();
    }, 300);
  };

  const onInputChange = (e) => {
    setHasText(e.target.value.length > 0);
    clearErrors("title");
  };

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      iconId: data.icon,
      backgroundId: data.background,
    };

    console.log("Board created:", payload);
    onSave(payload);
    handleFormClose();
  };

  if (!isOpen && !isExiting) return null;

  return (
    <div
      className={`${s.modalOverlay} ${isExiting ? s.fadeOut : ""}`}
      onClick={handleFormClose}
    >
      <div
        className={`${s.modalContainer} ${isExiting ? s.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.modalCloseBtn} onClick={handleFormClose}>
          <SvgIcon
            id="icon-x-close"
            className={s.closeBtnIcon}
            width="18"
            height="18"
          />
        </button>
        <h2>New board</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле для назви дошки */}
          <div className={s.inputGroup}>
            <input
              type="text"
              placeholder="Title"
              className={hasText ? s.focused : ""}
              {...register("title")}
              onChange={(e) => {
                onInputChange(e);
                setValue("title", e.target.value);
              }}
              onFocus={() => setHasText(true)}
              onBlur={(e) => setHasText(e.target.value.length > 0)}
            />
            {errors.title && <p className={s.error}>{errors.title.message}</p>}
          </div>

          {/* Список іконок як радіо-кнопки */}
          <label>Icons</label>
          <div className={s.icons}>
            {icons.map((icon) => (
              <label key={icon.id} className={s.iconButton}>
                <input
                  type="radio"
                  value={icon.id}
                  {...register("icon")}
                  checked={selectedIcon === icon.id}
                  onChange={() => setValue("icon", icon.id)}
                />
                <SvgIcon
                  width="18"
                  height="18"
                  id={icon.iconName}
                  className={s.radioIcon}
                />
              </label>
            ))}
          </div>

          {/* Список фонів як радіо-кнопки */}
          <label>Background</label>
          <div className={s.backgrounds}>
            <label
              className={`${s.backgroundIcon} ${
                selectedBackground === "nobg" ? s.selected : ""
              }`}
            >
              <input
                type="radio"
                value="nobg"
                {...register("background")}
                checked={selectedBackground === "nobg"}
                onChange={() => setValue("background", "nobg")}
              />
              <SvgIcon
                width="16"
                height="16"
                id="icon-image-05"
                className={s.radioIcon}
              />
            </label>
            {backgrounds.map((bg) => (
              <label
                key={bg.id}
                className={`${s.backgroundButton} ${
                  selectedBackground === bg.id ? s.selected : ""
                }`}
                style={{ backgroundImage: bg.url ? `url(${bg.url})` : "nobg" }}
              >
                <input
                  type="radio"
                  value={bg.id}
                  {...register("background")}
                  checked={selectedBackground === bg.id}
                  onChange={() => setValue("background", bg.id)}
                />
              </label>
            ))}
          </div>

          {/* Кнопка "Create" */}
          <button type="submit" className={s.createBtn}>
            <SvgIcon
              id="icon-normalBtnBlack"
              width="16"
              height="16"
              className={s.createBtnIcon}
            />
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

NewBoardForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NewBoardForm;

// import { useState } from "react";
// import "./App.css";
// import NewBoardForm from "./components/NewBoardForm/NewBoardForm";
// import EditBoardForm from './components/EditBoardForm/EditBoardForm';

// function App() {
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   // Начальные данные для EditBoardForm
//   const initialData = {
//     title: "My Saved Board",
//     icon: "icon-star-04",
//     background: "/src/assets/images/jpgs/desktop/sky2x.jpg",
//   };

//   // Функции для открытия и закрытия форм
//     const handleCreateOpen = () => setIsCreateOpen(true);
//     const handleCreateClose = () => setIsCreateOpen(false);

//     const handleEditOpen = () => setIsEditOpen(true);
//     const handleEditClose = () => setIsEditOpen(false);

//     const handleSave = (data) => {
//         console.log("Board saved:", data);
//         handleCreateClose();
//     };

//     const handleUpdate = (data) => {
//         console.log("Board updated:", data);
//         handleEditClose();
//     };

//   return (
//     <div className="App">
//       <button onClick={handleCreateOpen}>Create new board</button>
//       <button onClick={handleEditOpen}>Edit board</button>

//       {/* NewBoardForm */}
//       {isCreateOpen && (
//         <NewBoardForm
//           isOpen={isCreateOpen}
//           onClose={handleCreateClose}
//           onSave={handleSave}
//         />
//       )}

//       {/* EditBoardForm */}
//       {isEditOpen && (
//         <EditBoardForm
//           isOpen={isEditOpen}
//           onClose={handleEditClose}
//           initialTitle={initialData.title}
//           initialIcon={initialData.icon}
//           initialBackground={initialData.background}
//           onSave={handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
