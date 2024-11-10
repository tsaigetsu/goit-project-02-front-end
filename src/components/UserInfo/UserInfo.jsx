import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";

export default function UserInfo() {
  const userData = useSelector((state) => state.auth.user);
  const [isEditModal, setIsEditModal] = useState(false);
  // console.log("userdata", userData);

  const handleEditModal = () => {
    setIsEditModal(true);
  };

  return (
    <div className={css.userInfo}>
      <p>{userData.name}</p>
      <button onClick={handleEditModal} className={css.userInfoModal}>
        {!userData?.photo ? (
          <SvgIcon id="icon-user-black" width="68" height="68" />
        ) : (
          <img src={userData.photo} alt="User Avatar" />
        )}
      </button>
      {isEditModal && (
        <EditProfile
          userData={userData}
          onClose={() => setIsEditModal(false)}
        />
      )}
    </div>
  );
}
