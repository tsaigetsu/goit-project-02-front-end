import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import ScreensPage from "./pages/ScreensPage/ScreensPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./pages/HomePage/HomePage";
import { currentUserThunk } from "./redux/auth/operations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
//import Loader from "./components/Loader/Loader";
import { ThemeProvider } from "./components/Layout/ThemeContext.jsx";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  // return isRefreshing ? (
  //   <Loader />
  // ) : (
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        <Route
          path="/welcome"
          element={
            <PublicRoute component={<WelcomePage />} redirectTo="/home" />
          }
        />

        <Route
          path="/auth/:id"
          element={<PublicRoute component={<AuthPage />} redirectTo="/home" />}
        >
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        <Route
          path="/home"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/welcome" />
          }
        >
          <Route path=":boardId" element={<ScreensPage />} />
        </Route>
        {/* <Route path="/home" element={<HomePage />}/> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
  // );
}

export default App;
