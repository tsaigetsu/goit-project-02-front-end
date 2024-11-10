// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;

import { useState, createContext } from "react";
import { ThemeProvider } from "./ThemeContext.jsx"
// import Header from "../Header/Header.jsx";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLayoutClick = (event) => {
    if (isSidebarOpen && event.target.classList.contains("s.overlay")) {
      toggleSidebar();
    }
  };

  return (
    <ThemeProvider> 
    <div>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <div onClick={handleLayoutClick}>{children}</div>
      </SidebarContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
