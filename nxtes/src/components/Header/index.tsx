import { useUser } from "../../context/userContext";
import { Box, Stack } from "@mui/material";
import style from "./Header.module.css";
import ProfileDrop from "./components/ProfileDrop.component";
import HeaderLink from "./components/HeaderLink.component";

const Header: React.FC = () => {
  const { user } = useUser();

  return (
    <Box sx={{ backgroundColor: theme => theme.palette.action.active }} className={style.header}>
      <Box sx={{ display: "flex", gap: "60px", width: "100%", maxWidth: "375px", margin: 0, alignItems: "center" }}>
        {user ? (
          <>
            <Stack sx={{ flexDirection: "row", flex: "1", justifyContent: "space-around" }} component="div">
              <HeaderLink to="/board" title="Nxte Board" />
              <HeaderLink to="/" title="UserPage" />
            </Stack>
            <ProfileDrop />
          </>
        ) : (
          <Stack sx={{ flexDirection: "row", flex: "1", justifyContent: "center", gap: "3rem" }} component="div">
            <HeaderLink to="/auth/login" title="Login" />
            <HeaderLink to="/auth/register" title="Create Account" underline />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Header;
