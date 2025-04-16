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

export const useIsDark = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useIsDark must be used within a DarkProvider');
  return context.isDark;
};

export const useSetIsDark = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useSetIsDark must be used within a DarkProvider');
  return context.setIsDark;
};
