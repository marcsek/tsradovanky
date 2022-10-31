import { useUser } from "../../context/userContext";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import ThemeSwitch from "./HeaderThemeSwitch";
import useLogout from "../../hooks/useLogout";
import { useMyTheme } from "../../context/themeContext";

const Header: React.FC = () => {
  const { user } = useUser();
  const logout = useLogout();
  const myTheme = useMyTheme();

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.action.active }} className={style.header}>
      {/* <h3 style={{ marginRight: "200px" }}>{user?.name}</h3>
      <h6
        onClick={() => {
          logout.mutate({});
        }}
      >
        Logout
      </h6> */}
      {/* <Link to="/userpage">UserPage</Link>
      <Link to="/board">Nxte Board</Link> */}
      <ThemeSwitch
        defaultChecked
        onChange={(e) => {
          myTheme.setTheme(!e.target.checked);
        }}
      />
    </Box>
  );
};

export default Header;
