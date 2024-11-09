import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const userData = useSelector((state) => state.auth.user);
  const [isEditModal, setIsEditModal] = useState(false);

  const handleEditModal = () => {
    setIsEditModal(true);
  };

  return (
    <div className={css.userInfo}>
      {/* <p>{userData.name}</p> */}
      <button onClick={handleEditModal} className={css.userInfoModal}>
        {/* <img src={userData.photo} alt="img Avatar" /> */}
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
