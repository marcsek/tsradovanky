import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./ProfileDrop.module.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { useTheme } from "@mui/material/styles";
import DropMenu from "./DropMenu/DropMenu.component";
import { AnimatePresence, motion } from "framer-motion";

const ProfileDrop: React.FC = () => {
  const theme = useTheme();
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }} onClick={() => setDropOpen(!dropOpen)}>
          <Box className={styles.profileImageCont}>
            <img src="/profilepic.png" alt="profilePicture"></img>
          </Box>
          <motion.div
            animate={dropOpen ? { rotate: 180 } : { rotate: 0 }}
            style={{ boxSizing: "border-box", height: "20px", display: "flex" }}
          >
            <RiArrowDownSLine style={{ color: theme.palette.text.disabled }} className={styles.dropIcon} />
          </motion.div>
        </Box>
        <AnimatePresence>{dropOpen && <DropMenu />}</AnimatePresence>
      </Box>
      {dropOpen && (
        <Box
          onClick={() => {
            setDropOpen(false);
          }}
          sx={{ position: "fixed", top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "all", zIndex: 2 }}
        />
      )}
    </>
  );
};

export default ProfileDrop;
