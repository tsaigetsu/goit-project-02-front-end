import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import Header from "../../components/Header/Header.jsx";
import css from "./HomePage.module.css";
import { SidebarContext } from "../../components/Layout/Layout.jsx";
import React, { useState, createContext, useContext } from 'react'; 
import Layout from "../../components/Layout/Layout.jsx"; // Імпортуйте Layout

const HomePage = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  console.log(isSidebarOpen);

  return (
    <Layout>
      <Sidebar className={isSidebarOpen ? "aside open" : "aside"} />
      <ScreensPage />
    </Layout>
  );
};

export default HomePage;
