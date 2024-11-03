// import { useState } from "react";
// import viteLogo from "/favicon.svg";
import "./App.css";

// import EditProfile from "./components/EditProfile/Editprofile";
// import EditColumn from "./components/EditColumn/EditColumn";
// import AddColumn from "./components/AddColumn/AddColumn";
import Column from "./components/Column/Column";

import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from './pages/AuthPage/AuthPage.jsx';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/auth/:id" element={<AuthPage />} />
        </Routes>
        {/* <AddColumn />
        <EditColumn /> */}
        <Column />
      </div>
    </>
  );
}

export default App;
