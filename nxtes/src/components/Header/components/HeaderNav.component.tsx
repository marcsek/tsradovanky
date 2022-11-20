import { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Link, Stack, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import style from "../Header.module.css";

interface TLinkElement {
  to: string;
  title: string;
}

const HeaderNav: React.FC<{ links: TLinkElement[] }> = ({ links }) => {
  const [selected, setSelected] = useState<string | undefined>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack
      sx={{ flexDirection: "row", gap: "15px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      component={"div"}
    >
      <AnimateSharedLayout>
        {links.map((link, index) => (
          <motion.div key={index} style={{ display: "flex" }}>
            <Link
              sx={{
                color: theme => theme.palette.text.primary,
                position: "relative",
              }}
              underline="none"
              className={style.link}
              to={link.to}
              component={RouterLink}
              onMouseEnter={() => {
                setSelected(link.title);
              }}
            >
              <AnimatePresence>
                {selected === link.title && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "2px",
                      position: "absolute",
                      borderRadius: "2px",
                      backgroundColor: theme => theme.palette.text.secondary,
                      bottom: "-4px",
                    }}
                    layoutId="underline"
                    animate={isHovered ? { opacity: "100%" } : { opacity: "0%", transition: { delay: 0.5, duration: 0.2 } }}
                    component={motion.div}
                  ></Box>
                )}
              </AnimatePresence>
              {link.title}
            </Link>
          </motion.div>
        ))}
      </AnimateSharedLayout>
    </Stack>
  );
};

export default HeaderNav;
