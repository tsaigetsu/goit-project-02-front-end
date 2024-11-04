import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import ScreensPage from "./pages/ScreensPage/ScreensPage";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />

      <Route
        path="/welcome"
        element={<PublicRoute component={<WelcomePage />} redirectTo="/home" />}
      />

      <Route
        path="/auth/:id"
        element={<PublicRoute component={<AuthPage />} redirectTo="/home" />}
      ></Route>

      <Route
        path="/home"
        element={
          <PrivateRoute component={<HomePage />} redirectTo="/welcome" />
        }
      >
        <Route path=":boardId" element={<ScreensPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
