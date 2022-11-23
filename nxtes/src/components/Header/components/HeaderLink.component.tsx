import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import style from "../Header.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

interface TLinkElement {
  to: string;
  title: string;
  underline?: boolean;
}

const HeaderLink: React.FC<TLinkElement> = ({ to, title, underline }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", padding: "5px", position: "relative" }}>
      <Link
        sx={{
          color: theme => theme.palette.text.disabled,
          position: "relative",
          fontSize: "0.97rem",
          transition: "all 0.05s linear",
          "&:hover": {
            color: theme => theme.palette.text.primary,
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        underline="none"
        className={style.link}
        to={to}
        component={RouterLink}
      >
        {title}
      </Link>
      {underline && (
        <Box
          sx={{
            height: "4px",
            width: "25%",
            backgroundColor: "#476CFA",
            position: "absolute",
            bottom: "0px",
            left: "50%",
            translate: "-50%",
            borderRadius: "20px",
          }}
          component={motion.div}
          animate={isHovered ? { width: "80%" } : {}}
          transition={{ type: "spring", stiffness: 130, mass: 0.7 }}
        ></Box>
      )}
    </div>
  );
};

export default HeaderLink;
