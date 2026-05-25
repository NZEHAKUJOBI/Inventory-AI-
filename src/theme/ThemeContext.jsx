import { createContext, useContext, useState } from 'react';
import { dark, light } from './colors';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? dark : light;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
