import { createContext } from "react";

export const ThemeContext = createContext<{ theme: boolean; setTheme: React.Dispatch<React.SetStateAction<boolean>> }>({
  theme: false,
  setTheme: () => {},
});
