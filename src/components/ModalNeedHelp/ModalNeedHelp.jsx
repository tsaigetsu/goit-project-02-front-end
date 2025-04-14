import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SvgIcon from '../SvgIcon/SvgIcon';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import * as yup from 'yup';
import s from './ModalNeedHelp.module.css';
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../redux/auth/selectors';
import { sendHelpCommentThunk } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  comment: yup
    .string()
    .required('Comment is required')
    .min(5, 'Comment must be at least 5 characters'),
});

const ModalNeedHelp = ({ isOpen, onClose }) => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

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
      comment: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFocus('email');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      await dispatch(sendHelpCommentThunk(data))
        .unwrap()
        .then(() => {
          toast.success("Email sent to tech support. We'll reply soon!", {
            duration: 3000,
            position: 'top-center',
            icon: '✔️',
          });
        })
        .catch(() => {});
      reset();
      handleFormClose();
    } catch (error) {
      console.error('Error sending data:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isExiting) return null;

  return (
    <div
      className={`${s.overlay} ${isExiting ? s.fadeOut : ''}`}
      onClick={handleFormClose}
    >
      <div
        className={`${s.modal} ${isExiting ? s.fadeOut : ''}`}
        onClick={e => e.stopPropagation()}
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
              {...register('email')}
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
              {...register('comment')}
              className={s.textarea}
            />
            {errors.comment && (
              <div className={s.errorText}>{errors.comment.message}</div>
            )}
          </div>

          {/* Кнопка отправки */}
          {/* <button type="submit" className={s.sendBtn}>Send</button> */}
          <button type="submit" className={s.sendBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
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
