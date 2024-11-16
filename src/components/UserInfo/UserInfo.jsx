import css from './UserInfo.module.css';
import EditProfile from '../EditProfile/EditProfile.jsx';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/auth/operations.js';
import ThemedIcon from '../ThemedIcon/ThemedIcon.jsx';

export default function UserInfo() {
  const userData = useSelector(state => state.auth.user);

  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();

  const handleEditModal = () => {
    setIsEditModal(true);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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
