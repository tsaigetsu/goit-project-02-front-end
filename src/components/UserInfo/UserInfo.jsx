import css from "./UserInfo.module.css";
import EditProfile from "../EditProfile/EditProfile.jsx";
import React, { useState } from "react";

export default function UserInfo() {
    const [isEditModal, setIsEditModal] = useState(false);

    const handelEditModal = () => {
        setIsEditModal(true);
    }

    return (
         <div className={css.userInfo}>
              <p>Name</p>
            <button onClick={handelEditModal} className={css.userInfoModal}></button>
            {isEditModal && <EditProfile isOpen={isEditModal} onClose={()=> setIsEditModal(false)} />}
            </div>
    )
}