import { useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { cssTransition, ToastContainer, ToastContainerProps } from "react-toastify";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import "../toastifyStyles.css";
import TopErrorBoundary from "./TopErrorBoundary";

const Layout: React.FC = () => {
  const theme = useTheme();

  const toastifyCfg: ToastContainerProps = {
    theme: theme.palette.mode === "light" ? "light" : "dark",
    pauseOnHover: true,
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: 3000,
    pauseOnFocusLoss: false,
    position: "bottom-right",
    limit: 3,
    toastStyle: { borderRadius: "0.6rem", textAlign: "left", fontSize: "1rem" },
  };

  const slideAnimation = cssTransition({
    enter: "swirl-in-fwd",
    exit: "swirl-out-bck",
  });

  return (
    <>
      <Header />
      <TopErrorBoundary>
        <Outlet />
      </TopErrorBoundary>

      <ToastContainer {...toastifyCfg} transition={slideAnimation} />
    </>
  );
};

export default Layout;
