import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./EditBoardForm.module.css";
import icons from "../../data/icons.json";
import backgrounds from "../../data/backgrounds.json";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(32, "Title cannot exceed 32 characters"),
});

const EditBoardForm = ({
  isOpen,
  onClose,
  initialTitle,
  initialIcon,
  initialBackground,
  onSave,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [hasText, setHasText] = useState(!!initialTitle);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    clearErrors,
    setFocus
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialTitle || "",
      icon: initialIcon || icons[0].id,
      background: initialBackground || "nobg",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFocus("title");
    };
  }, [isOpen, setFocus]);

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

    console.log("Submitting updated board data:", payload);
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
        <h2>Edit board</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле для назви дошки */}
          <div className={s.inputGroup}>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className={hasText ? s.focused : ""}
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
            {/* {backgrounds.map((bg) => (
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
            ))} */}
            {Object.keys(backgrounds.desktop).map((bgId) => (
              <label
                key={bgId}
                className={`${s.backgroundButton} ${selectedBackground === bgId ? s.selected : ""}`}
                style={{
                  backgroundImage: `url(${backgrounds.desktop[bgId].normal})`
                }}
              >
                <input
                  type="radio"
                  value={bgId}
                  {...register("background")}
                  checked={selectedBackground === bgId}
                  onChange={() => setValue("background", bgId)}
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
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

EditBoardForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialTitle: PropTypes.string,
  initialIcon: PropTypes.string,
  initialBackground: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default EditBoardForm;
