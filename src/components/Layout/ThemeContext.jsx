import { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTheme, fetchUserProfile } from "../../redux/auth/operations.js";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeFromStore = useSelector(state => state.auth.user?.theme);
  const [theme, setTheme] = useState(themeFromStore);

  useEffect(() => {
    setTheme(themeFromStore);
  }, [themeFromStore]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const changeTheme = async (newTheme, setIsModalOpen) => {
    try {
      await dispatch(updateTheme(newTheme)).unwrap();
      setTheme(newTheme);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Помилка зміни теми:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;