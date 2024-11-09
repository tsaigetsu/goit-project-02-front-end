
import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/user/userSlice";
import { selectUserName, selectUserPhoto } from "../../redux/user/userSelectors";

export default function UserInfo() {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const photo = useSelector(selectUserPhoto);
  const [isEditModal, setIsEditModal] = useState(false);

  useEffect(() => {
    dispatch(getUserData()); // Виклик дії для отримання даних користувача
  }, [dispatch]);

  const handelEditModal = () => {
    setIsEditModal(true);
  };

  return (
    <div className={css.userInfo}>
      <p>{name}</p> 
      <button onClick={handelEditModal} className={css.userInfoModal}>
        {photo && <img src={photo} alt="User avatar" />}
      </button>
      {isEditModal && (
        <EditProfile isOpen={isEditModal} onClose={() => setIsEditModal(false)} />
      )}
    </div>
  );
}