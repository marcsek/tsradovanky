import { useContext } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import ThemeSwitch from "./HeaderThemeSwitch";
import { UserContext } from "../../context/UserContext";

const Header: React.FC<{ setTheme: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setTheme }) => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.action.active }} className={style.header}>
      <h3 style={{ marginRight: "200px" }}>{user?.name}</h3>
      <Link to="/userpage">UserPage</Link>
      <Link to="/board">Nxte Board</Link>
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
