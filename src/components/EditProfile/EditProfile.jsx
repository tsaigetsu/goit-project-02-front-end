import css from './EditProfile.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SvgIcon from '../SvgIcon/SvgIcon';
import ThemedIcon from '../ThemedIcon/ThemedIcon.jsx';
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from '../../redux/auth/operations.js';

const validateFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
    .min(2, 'Name is too short')
    .max(18, 'Name is too long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_\-+=<>?,.:;'"`~[\]{}|\\/]+$/,
      'Password must contain Latin letters'
    )
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must not exceed 64 characters'),
});

const EditProfile = ({ userData, onClose }) => {
  const dispatch = useDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      password: '',
    },
    resolver: yupResolver(validateFormSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || '',
        email: userData.email || '',
      });
    }
  }, [userData, reset]);

  const onSubmit = data => {
    const updatedUserData = {
      name: data.name,
      email: data.email,
    };
    dispatch(updateUserAvatar(updatedUserData));
    onClose();
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      dispatch(updateUserAvatar(formData));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.mainContainer} onClick={handleBackdropClick}>
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
              <ThemedIcon
                themeIcons={{
                  light: 'icon-user-white',
                  dark: 'icon-user-black',
                  violet: 'icon-user-violet',
                }}
                width="68"
                height="68"
              />
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
              style={{ display: 'none' }} // Скрываем input
              onChange={handleAvatarChange} // Обработчик изменения файла
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css.formContainer}
          autoComplete="off"
        >
          <div className={css.inputContainer}>
            <label className={css.label}>
              <input
                {...register('name')}
                type="text"
                placeholder="Enter your name"
                className={css.input}
                autoFocus
              />
              {errors.name && (
                <div className={css.error}>{errors.name.message}</div>
              )}
            </label>
            <label className={css.label}>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className={css.input}
              />
              {errors.email && (
                <div className={css.error}>{errors.email.message}</div>
              )}
            </label>
            <label className={css.label}>
              <input
                {...register('password')}
                type={visiblePassword ? 'text' : 'password'}
                placeholder="Create a password"
                className={css.input}
                autoComplete="new-password"
              />
              {errors.password && (
                <div className={css.error}>{errors.password.message}</div>
              )}
              <button
                type="button"
                className={css.toggleBtn}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? (
                  <SvgIcon
                    id="icon-eye"
                    className={css.toggleBtnIcon}
                    width="18"
                    height="18"
                  />
                ) : (
                  <SvgIcon
                    id="icon-eye-off"
                    className={css.toggleBtnIcon}
                    width="18"
                    height="18"
                  />
                )}
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
