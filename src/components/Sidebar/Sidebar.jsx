// import LogoComponent from "../LogoComponent/LogoComponent";
// import LogOutBtn from "../LogOutBtn/LogOutBtn";
// import NeedHelpComponent from "../NeedHelpComponent/NeedHelpComponent";
// import SidebarBoardList from "../SidebarBoardList/SidebarBoardList";
// import s from "./Sidebar.module.css";

// const Sidebar = () => {
//   return (
//     <aside className={s.aside}>
//       <div className={s.overlay} />
//       <nav className={s.nav}>
//         <div className={s.topElements}>
//           <LogoComponent className={s.top} />
//           <SidebarBoardList className={s.list} />
//         </div>
//         <div className={s.bottomElements}>
//           <NeedHelpComponent className={s.bottom} />
//           <LogOutBtn className={s.bottom} />
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import LogoComponent from "../LogoComponent/LogoComponent";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import NeedHelpComponent from "../NeedHelpComponent/NeedHelpComponent";
import SidebarBoardList from "../SidebarBoardList/SidebarBoardList";
import s from "./Sidebar.module.css";
import { useContext } from "react";
import { SidebarContext } from "../Layout/Layout.jsx";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  const handleClick = (event) => {
    event.stopPropagation();
        if (event.target.classList.contains(s.overlay)) {
      toggleSidebar();
    }
  };


  return (
    <aside className={`${s.aside} ${isSidebarOpen ? s.open : ''}`}>
      <div className={s.overlay} onClick={handleClick} />
      <nav className={s.nav}>
        <div className={s.topElements}>
          <LogoComponent className={s.top} />
          <SidebarBoardList className={s.list} />
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
