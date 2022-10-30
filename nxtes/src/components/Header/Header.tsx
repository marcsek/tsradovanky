import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import ThemeSwitch from "./HeaderThemeSwitch";

const Header: React.FC<{ setTheme: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setTheme }) => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.action.active }} className={style.header}>
      <Link to="/userpage">UserPage</Link>
      <Link to="/">Nxte Board</Link>
      <ThemeSwitch
        defaultChecked
        onChange={(e) => {
          setTheme(!e.target.checked);
        }}
      />
    </Box>
  );
};

export default Header;
