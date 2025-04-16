import {
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  createContext,
} from 'react';

type DarkProviderProps = {
  children: ReactNode;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<Omit<DarkProviderProps, 'children'> | null>(
  null,
);

export const DarkProvider = ({
  children,
  isDark,
  setIsDark,
}: DarkProviderProps) => {
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDark = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useDark must be used within a DarkProvider');
  return context;
};
