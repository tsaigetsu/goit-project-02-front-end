import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const themeAvatars = {
  light: 'icon-user-white',
  dark: 'icon-user-black',
  violet: 'icon-user-violet',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // Применяем тему к body
  }, [theme]);
  // Функция для переключения темы
  const toggleTheme = newTheme => {
    if (newTheme) {
      setTheme(newTheme); // Устанавливаем переданную тему
    } else {
      // Переключаем между светлой и темной
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const avatar = themeAvatars[theme];

  return (
    <ThemeContext.Provider value={{ theme, avatar, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
