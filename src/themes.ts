import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#eaebf1",
      secondary: "gray",
    },
    background: {
      default: "#171719",
      paper: "#24232a",
    },
    action: {
      disabledBackground: "gray",
      active: "#24232855",
    },
    common: {
      white: "#5e5e5e25",
    },
    divider: "#39393D",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#212B36",
      secondary: "#86939E",
    },
    background: {
      default: "#FFFFFF",
      paper: "white",
    },
    action: {
      disabledBackground: "gray",
      active: "#F7F8F977",
    },
    common: {
      white: "#F4F6F8",
    },
    divider: "rgba(50, 53, 70, 0.3)",
  },
});

export { lightTheme, darkTheme };
