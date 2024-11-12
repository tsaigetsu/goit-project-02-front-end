import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";

export default function UserInfo() {
  const userData = useSelector((state) => state.auth.user);
  const [isEditModal, setIsEditModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // console.log("userdata", userData);

  const handleEditModal = () => {
    setIsEditModal(true);
  };
  
  // useEffect(() => {
  //   if (userData) {
  //     // Оновлюємо стан компонента, наприклад, для приховування лоадера
  //     setIsLoading(false);
      
  //   }
  //   console.log(userData);
  // }, [userData]);

  return (
    <div className={css.userInfo}> 
      {/* {isLoading ? ( // Показуємо лоадер, поки дані не завантажаться
        <div>Завантаження...</div> 
      ) : (
        userData && ( */}
          <>
            {/* <p className={css.userName}>{userData.name}</p> */}
        <button onClick={handleEditModal} className={css.userInfoModal}>
          <p className={css.userName}>{userData.name}</p>
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
          </>
        {/* )
      )} */}
    </div>
  );
}
