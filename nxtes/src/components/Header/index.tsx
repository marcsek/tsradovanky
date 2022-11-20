import { useUser } from "../../context/userContext";
import { Box } from "@mui/material";
import style from "./Header.module.css";
import ProfileDrop from "./components/ProfileDrop.component";
import HeaderNav from "./components/HeaderNav.component";

const Header: React.FC = () => {
  const { user } = useUser();
  return (
    <Box sx={{ backgroundColor: theme => theme.palette.action.active }} className={style.header}>
      <Box sx={{ display: "flex", gap: "50px", margin: 0, alignItems: "center" }}>
        {user ? (
          <>
            <HeaderNav
              links={[
                { to: "/", title: "UserPage" },
                { to: "/board", title: "Nxte Board" },
              ]}
            ></HeaderNav>
            <ProfileDrop />
          </>
        ) : (
          <HeaderNav links={[{ to: "/auth/login", title: "Login" }]}></HeaderNav>
        )}
      </Box>
    </Box>
  );
};

export default Header;
