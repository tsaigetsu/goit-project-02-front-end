import css from './UserInfo.module.css';
import EditProfile from '../EditProfile/EditProfile.jsx';
import { useSelector } from 'react-redux';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { selectUserData } from '../../redux/auth/selectors.js';
import { useState } from 'react';

export default function UserInfo() {
  const userData = useSelector(selectUserData); //данные при регистрации приходят
  // console.log('userData', userData);

  const [isEditModal, setIsEditModal] = useState(false);

  const handleEditModal = () => {
    setIsEditModal(true);
  };

  return (
    <div className={css.userInfo}>
      <>
        <button onClick={handleEditModal} className={css.userInfoModal}>
          <p className={css.userName}>{userData.name}</p>
          {!userData?.photo ? (
            <SvgIcon
              id="icon-user-black"
              width="68"
              height="68"
              className={css.userSvg}
            />
          ) : (
            <img
              src={userData.photo}
              alt="User Avatar"
              className={css.userImg}
            />
          )}
        </button>
        {isEditModal && (
          <EditProfile
            userData={userData}
            onClose={() => setIsEditModal(false)}
          />
        )}
      </>
    </div>
  );
}
