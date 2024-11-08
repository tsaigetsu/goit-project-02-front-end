import css from "./LoginForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const validateFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_\-+=<>?,.:;'"`~[\]{}|\\/]+$/,
      "Password can contain only Latin letters, numbers, and special characters"
    )
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters"),
});

const LoginForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validateFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(loginThunk(data));

    reset();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("home");
    }
  }, [isLoggedIn, navigate]);

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
                <SvgIcon
                  id="icon-eye"
                  className={css.toggleBtnIcon}
                  width="18"
                  height="18"
                />
              </button>
            </label>
          </div>
          <button type="submit" className={css.btn}>
            Log In Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
