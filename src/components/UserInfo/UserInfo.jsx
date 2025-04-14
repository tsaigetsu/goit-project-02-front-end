import css from './UserInfo.module.css';
import EditProfile from '../EditProfile/EditProfile.jsx';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/auth/selectors.js';
import { useState } from 'react';
import ThemedIcon from '../ThemedIcon/ThemedIcon.jsx';
import Loader from '../Loader/Loader.jsx';

export default function UserInfo() {
  const userData = useSelector(selectUserData);
  const [isEditModal, setIsEditModal] = useState(false);
  const handleEditModal = () => {
    setIsEditModal(true);
  };

  if (!userData) return <Loader />;

  return (
    <div className={css.userInfo}>
      <>
        <button onClick={handleEditModal} className={css.userInfoModal}>
          <p className={css.userName}>{userData.name}</p>
          {!userData?.photo ? (
            <ThemedIcon width="68" height="68" className={css.userSvg} />
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
