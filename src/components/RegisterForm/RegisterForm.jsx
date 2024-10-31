import { useState } from "react";
import css from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  return (
    <div className={css.mainContainer}>
      <div className={css.container}>
        <nav className={css.linkContainer}>
          <a className={css.link} to="/auth/register">
            Registration
          </a>
          <a className={css.link} to="/auth/login">
            Log In
          </a>
        </nav>
        <form className={css.formContainer}>
          <div className={css.inputContainer}>
            <label className={css.label}>
              <input
                type="text"
                placeholder="Enter your name"
                className={css.input}
              />
            </label>
            <label className={css.label}>
              <input
                type="text"
                placeholder="Enter your email"
                className={css.input}
              />
            </label>
            <label className={css.label}>
              <input
                type={visiblePassword ? "text" : "password"}
                placeholder="Create a password"
                className={css.input}
              />
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
