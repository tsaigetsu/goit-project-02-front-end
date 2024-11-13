import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SvgIcon from "../SvgIcon/SvgIcon";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as yup from "yup";
import s from "./ModalNeedHelp.module.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  comment: yup
    .string()
    .required("Comment is required")
    .min(5, "Comment must be at least 5 characters"),
});

const ModalNeedHelp = ({ isOpen, onClose }) => {
  const user = useSelector(selectUserData);
  console.log("user", user);

  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: user.email,
      comment: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFocus("email");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, setFocus]);

  const handleFormClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      reset();
      onClose();
    }, 300);
  };

  // const onSubmit = (data) => {
  //     console.log("Need help:", data);
  //     reset();
  //     handleFormClose();
  // };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Need help:", data);
      reset();
      handleFormClose();
      toast.success("Email sent to tech support. We'll reply soon!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isExiting) return null;

  return (
    <div
      className={`${s.overlay} ${isExiting ? s.fadeOut : ""}`}
      onClick={handleFormClose}
    >
      <div
        className={`${s.modal} ${isExiting ? s.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.closeBtn} onClick={handleFormClose}>
          <SvgIcon
            id="icon-x-close"
            className={s.closeBtnIcon}
            width="18"
            height="18"
          />
        </button>
        <h2>Need help</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Поле для ввода email */}
          <div className={s.emailContainer}>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className={s.input}
            />
            {errors.email && (
              <div className={s.errorText}>{errors.email.message}</div>
            )}
          </div>

          {/* Поле для комментария */}
          <div className={s.commentContainer}>
            <textarea
              placeholder="Comment"
              {...register("comment")}
              className={s.textarea}
            />
            {errors.comment && (
              <div className={s.errorText}>{errors.comment.message}</div>
            )}
          </div>

          {/* Кнопка отправки */}
          {/* <button type="submit" className={s.sendBtn}>Send</button> */}
          <button type="submit" className={s.sendBtn} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

ModalNeedHelp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalNeedHelp;
