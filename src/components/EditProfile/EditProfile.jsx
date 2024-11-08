import css from "./EditProfile.module.css";

import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SvgIcon from "../SvgIcon/SvgIcon";

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

const EditProfile = ({ isOpen, onClose }) => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  if (!isOpen) return null;
  // const { name, email, photo } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "", //указываем текущее значение
      email: "", //указываем текущее значение
      password: "",
    },
    resolver: yupResolver(validateFormSchema),
    mode: "onChange",
  });

  // const handleCloseModal = () => {
  //   setVisibleModal(false);
  // };

  const onSubmit = (data) => {
    console.log(data);
    //сохраняем новые данные юзера
    reset();
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
            <SvgIcon id="icon-user-black" width="68" height="68" />
            {/* { ? (
            ) : (
              <img src={photo} alt="User Avatar" />
            )} */}

            <button className={css.btnAvatar}>
              <SvgIcon id="icon-plus" width="10" height="10" />
            </button>
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
              {errors.name && touchedFields.name && (
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
              {errors.email && touchedFields.email && (
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
              {errors.password && touchedFields.password && (
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
