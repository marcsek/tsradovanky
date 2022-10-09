import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { lightTheme, darkTheme } from "./themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import LandingPage from "./pages/LandingPage/LandingPage";

import Header from "./components/Header/Header";

function App() {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <ThemeProvider theme={!theme ? darkTheme : lightTheme}>
      <Box className="App" sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
        <Header setTheme={setTheme} />
        <LandingPage></LandingPage>
      </Box>
      <ToastContainer
        theme={theme ? "light" : "dark"}
        pauseOnHover={true}
        closeOnClick={true}
        autoClose={5000}
        pauseOnFocusLoss={false}
        position="bottom-right"
        limit={3}
      />
    </ThemeProvider>
  );
}

export default App;
