import { useParams } from 'react-router-dom';
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./AuthPage.module.css";

export default function AuthPage() {
    const { id } = useParams();

  return (
    <div className={css.authContainer}>
      {id === 'register' ? (
        <RegisterForm />
      ) : id === 'login' ? (
        <LoginForm />
      ) : (
        <p>Unknown authorization type</p>
      )}
    </div>
  );
}