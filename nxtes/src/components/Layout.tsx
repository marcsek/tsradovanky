import { useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import Header from "./Header/Header";
import "react-toastify/dist/ReactToastify.css";

const Layout: React.FC = () => {
  const theme = useTheme();

  const toastifyCfg: ToastContainerProps = {
    theme: theme.palette.mode === "light" ? "light" : "dark",
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: 5000,
    pauseOnFocusLoss: false,
    position: "bottom-right",
    limit: 3,
  };

  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer {...toastifyCfg} />
    </>
  );
};

export default Layout;
