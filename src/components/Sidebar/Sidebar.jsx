import LogoComponent from '../LogoComponent/LogoComponent';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import NeedHelpComponent from '../NeedHelpComponent/NeedHelpComponent';
import SidebarBoardList from '../SidebarBoardList/SidebarBoardList';
import s from './Sidebar.module.css';
import { useContext, useEffect } from 'react';
import { SidebarContext } from '../Layout/Layout.jsx';
import { fetchBoardsThunk } from '../../redux/boards/operations.js';
import { useDispatch } from 'react-redux';

const Sidebar = ({ onSelectBoard }) => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const handleClick = event => {
    event.stopPropagation();
    if (event.target.classList.contains(s.overlay)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  return (
    <aside className={`${s.aside} ${isSidebarOpen ? s.open : ''}`}>
      <div className={s.overlay} onClick={handleClick} />
      <nav className={s.nav}>
        <div className={s.topElements}>
          <LogoComponent className={s.top} />
          <SidebarBoardList className={s.list} onSelectBoard={onSelectBoard} />
        </div>
        <div className={s.bottomElements}>
          <NeedHelpComponent className={s.bottom} />
          <LogOutBtn className={s.bottom} />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
