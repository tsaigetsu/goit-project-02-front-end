import { useParams } from 'react-router-dom';
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

export default function AuthPage() {
    const { id } = useParams();

  return (
    <div>
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