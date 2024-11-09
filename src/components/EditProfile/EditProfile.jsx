import css from "./EditProfile.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useDispatch } from "react-redux";
import { updateUserAvatar } from "../../redux/auth/operations.js";

const validateFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name must contain only letters")
    .min(2, "Name is too short")
    .max(50, "Name is too long"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const EditProfile = ({ userData, onClose }) => {
  const dispatch = useDispatch();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      password: "", // Пусть будет пустым, если не передан пароль
    },
    resolver: yupResolver(validateFormSchema),
    mode: "onChange",
  });
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data) => {
    console.log("Data", data);
    const updatedUserData = {
      name: data.name,
      email: data.email,
    };
    dispatch(updateUserAvatar(updatedUserData)); //сохраняем новые данные юзера
    onClose();
  };
  // Обработчик выбора файла
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      dispatch(updateUserAvatar(formData)); // Отправляем новый аватар на сервер
    }
  };
  // Функция для открытия диалога выбора файла
  const handleClick = () => {
    fileInputRef.current.click(); // Программно вызываем клик на скрытый инпут
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.container}>
        <div className={css.wrapperTitle}>
          <p className={css.title}>Edit profile</p>
        </div>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <SvgIcon id="icon-x-close" width="18" height="18" />
        </button>

        <div className={css.wrapperAvatar}>
          <div className={css.avatar}>
            {!userData?.photo ? (
              <SvgIcon id="icon-user-black" width="68" height="68" />
            ) : (
              <img src={userData.photo} alt="User Avatar" />
            )}

            <button className={css.btnAvatar} onClick={handleClick}>
              <SvgIcon id="icon-plus" width="10" height="10" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // Привязываем ссылку к инпуту
              style={{ display: "none" }} // Скрываем input
              onChange={handleAvatarChange} // Обработчик изменения файла
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
          <div className={css.inputContainer}>
            <label className={css.label}>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className={css.input}
              />
              {errors.name && (
                <div className={css.error}>{errors.name.message}</div>
              )}
            </label>
            <label className={css.label}>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter your email"
                className={css.input}
              />
              {errors.email && (
                <div className={css.error}>{errors.email.message}</div>
              )}
            </label>
            <label className={css.label}>
              <input
                {...register("password")}
                type={visiblePassword ? "text" : "password"}
                placeholder="Create a password"
                className={css.input}
              />
              {errors.password && (
                <div className={css.error}>{errors.password.message}</div>
              )}
              <button
                type="button"
                className={css.toggleBtn}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                <SvgIcon id="icon-eye" width="18" height="18" />
              </button>
            </label>
          </div>
          <button type="submit" className={css.btn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
