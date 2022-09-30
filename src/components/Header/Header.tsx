import { Box } from "@mui/system";
import style from "./Header.module.css";
import ThemeSwitch from "./HeaderThemeSwitch";

const Header: React.FC<{ setTheme: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setTheme }) => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.action.active }} className={style.header}>
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
