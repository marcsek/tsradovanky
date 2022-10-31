import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const useMyTheme = () => {
  return useContext(ThemeContext);
};

export default useMyTheme;
