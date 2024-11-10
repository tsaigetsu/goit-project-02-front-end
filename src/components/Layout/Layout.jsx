// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;

import { useState, createContext, useEffect } from "react";
import ThemeContext from "./ThemeContext.jsx";
import { useContext } from "react";


export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const { theme } = useContext(ThemeContext);
  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLayoutClick = (event) => {
    if (isSidebarOpen && event.target.classList.contains("s.overlay")) {
      toggleSidebar();
    }
  };

  return (
    // <ThemeProvider> 
    <div>
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <div onClick={handleLayoutClick}>{children}</div>
      </SidebarContext.Provider>
      </div>
    // </ThemeProvider>
  );
}

export default Layout;
