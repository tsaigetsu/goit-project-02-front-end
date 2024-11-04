import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from "./WelcomePage.module.css";
// import welcomPng from "../assets/images/png/Image-1.png"


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
          <div className={css.taskProBox}>
            <div className={css.iconContainer}>
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