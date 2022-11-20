import React from "react";
import { Box, Link, Typography, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import ControlButton from "../../../custom-material-styles/ControlButton";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../../../queries/queryHooks/User";
import { useUser } from "../../../context/userContext";
import { motion } from "framer-motion";
import ThemeSwitch from "../HeaderThemeSwitch";
import { useMyTheme } from "../../../context/themeContext";
import FormControlLabel from "@mui/material/FormControlLabel";

const DropMenu: React.FC = () => {
  const logout = useLogout();
  const { user } = useUser();
  const myTheme = useMyTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        translate: "-70% 0%",
        backgroundColor: theme => (theme.palette.mode === "dark" ? "#232323" : theme.palette.background.paper),
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        width: "180px",
        p: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        textAlign: "left",
        top: "40px",
        borderRadius: "0.5rem",
      }}
      component={motion.div}
      initial={{ opacity: "50%", y: "-50px" }}
      animate={{ opacity: "100%", y: "0px" }}
      exit={{ opacity: "0%", y: "-20px", transition: { duration: 0.2 } }}
    >
      <Box sx={{ px: "8px" }}>
        <Typography sx={{ color: theme => theme.palette.text.primary }}>{user?.name}</Typography>
        <Typography sx={{ color: theme => theme.palette.text.secondary, fontSize: "0.9rem" }}>{user?.email}</Typography>
      </Box>
      <Divider sx={{ mx: "-10px" }} />
      <Stack gap="5px">
        <DropMenuItem to="/auth/login" title="Home" />
        <DropMenuItem to="/auth/login" title="Profile" />
      </Stack>

      <Stack direction="row" alignItems="center" px="8px" justifyContent="space-between">
        <FormControlLabel
          sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", m: 0 }}
          control={
            <ThemeSwitch
              checked={!myTheme.theme}
              onChange={e => {
                myTheme.setTheme(!e.target.checked);
              }}
            />
          }
          label={<Typography sx={{ color: theme => theme.palette.text.disabled, fontSize: "0.85rem" }}>THEME</Typography>}
          labelPlacement="start"
        ></FormControlLabel>
      </Stack>

      <Divider sx={{ mx: "-10px" }} />
      <DropMenuItem to="" title="Logout" onClick={() => logout.mutate({})} />
    </Box>
  );
};

const DropMenuItem: React.FC<{ title: string; to: string; onClick?: () => void }> = ({ title, to, onClick }) => {
  return (
    <ControlButton
      onClick={onClick}
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        py: "4px",
        fontSize: "0.85rem",
      }}
    >
      <Link sx={{ color: theme => theme.palette.text.disabled }} to={to} underline="none" component={RouterLink}>
        {title}
      </Link>
    </ControlButton>
  );
};

export default DropMenu;
