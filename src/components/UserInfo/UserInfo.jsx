import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import { fetchUserProfile } from "../../redux/auth/operations.js";

export default function UserInfo() {
  const userData = useSelector((state) => state.auth.user);
  console.log("userData", userData);

  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();

  const handleEditModal = () => {
    setIsEditModal(true);
  };

  useEffect(() => {
    console.log("userInfo");
    dispatch(fetchUserProfile());
  }, [dispatch]);

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
