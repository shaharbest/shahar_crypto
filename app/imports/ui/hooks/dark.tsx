import { useContext, createContext } from "react";

const ThemeContext = createContext(null);

export const DarkProvider = ({ children, isDark, setIsDark }) => {
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useIsDark = () => useContext(ThemeContext).isDark;
export const useSetIsDark = () => useContext(ThemeContext).setIsDark;
