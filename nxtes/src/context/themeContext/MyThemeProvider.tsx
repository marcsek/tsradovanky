import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../../themes";
import { ThemeContext } from "./ThemeContext";

const MyThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default MyThemeProvider;
