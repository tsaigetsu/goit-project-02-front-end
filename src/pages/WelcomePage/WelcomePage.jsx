import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from "./WelcomePage.module.css";
import user1x from "../../assets/images/png/user-1x.png";
import user2x from "../../assets/images/png/user-2x.png";
import SvgIcon from '../../components/SvgIcon/SvgIcon.jsx';


export default function WelcomePage() {
    const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/auth/register');
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };
    
    return (
        <div className={css.welcomePage}>
        <div className={css.welcomSection}>
          <img
            src={user1x}
            srcSet={`${user1x} 1x, ${user2x} 2x`}
            alt="user with the laptop"
            width="124"
            height="124"
          />
          <div className={css.taskProBox}>
            <div className={css.iconContainer}>
                  <SvgIcon
                  id="lightning"
                  className={css.welcomeIcon}
                  width="15"
                  height="20"
                />
    </div>
            <h1>Task Pro</h1>
            </div>
            <p>Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!</p>
            <button onClick={handleRegistration} className={css.buttonRegister}>Registration</button>
                <button onClick={handleLogin} className={css.buttonLogin}>Log In</button>
                </div>
        </div>
    ) 
}