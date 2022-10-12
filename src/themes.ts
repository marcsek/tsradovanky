import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#eaebf1",
      secondary: "gray",
      disabled: "#cfcfcf",
    },
    background: {
      default: "#171719",
      paper: "#24232a",
    },
    action: {
      disabledBackground: "gray",
      active: "rgb(27,27,30)",
    },
    common: {
      white: "#5e5e5e25",
    },
    divider: "#39393D",
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#212B36",
      secondary: "#86939E",
      disabled: "#535a61",
    },
    background: {
      default: "#FFFFFF",
      paper: "white",
    },
    action: {
      disabledBackground: "gray",
      active: "rgb(251,252,252)",
    },
    common: {
      white: "#F4F6F8",
    },
    divider: "rgba(50, 53, 70, 0.3)",
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export { lightTheme, darkTheme };
