import { useContext, useEffect, useMemo } from 'react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../ScreensPage/ScreensPage';
import Header from '../../components/Header/Header.jsx';
import css from './HomePage.module.css';
import { SidebarContext } from '../../components/Layout/Layout.jsx';
// import { useContext } from "react";
import Layout from '../../components/Layout/Layout.jsx';
import ThemeContext from '../../components/Layout/ThemeContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserThunk } from '../../redux/auth/operations.js';
import { selectToken } from '../../redux/auth/selectors.js';

const HomePage = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(currentUserThunk());
    }
  }, [currentUserThunk, token]);

  const sidebarClass = useMemo(
    () => (isSidebarOpen ? 'aside open' : 'aside'),
    [isSidebarOpen]
  );

  const themeClass = useMemo(() => css[`theme-${theme}`], [theme]);

  return (
    <Layout>
      <section className={`${css.homePage} ${themeClass}`}>
        <MemoizedSidebar className={sidebarClass} />
        <div className={css.homePage__content}>
          <MemoizedHeader />
          <MemoizedScreensPage />
        </div>
      </section>
    </Layout>
  );
};

const MemoizedSidebar = React.memo(Sidebar);
const MemoizedHeader = React.memo(Header);
const MemoizedScreensPage = React.memo(ScreensPage);

export default React.memo(HomePage);
