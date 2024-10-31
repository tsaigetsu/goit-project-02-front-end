import css from "./RegisterForm.module.css";
import { NavLink } from "react-router-dom";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

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

const RegisterForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validateFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);

    reset();
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.container}>
        <nav className={css.linkContainer}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : `${css.link}`
            }
            to="/auth/register"
          >
            Registration
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : `${css.link}`
            }
            to="/auth/login"
          >
            Log In
          </NavLink>
        </nav>
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
              ></button>
            </label>
          </div>
          <button type="submit" className={css.btn}>
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
