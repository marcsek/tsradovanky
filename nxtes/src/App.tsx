import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserType } from "./types/user.type";
import { UserContext } from "./context/UserContext";

//Pages
import { NxtePage, ErrorPage, UserPage } from "./pages";

import Header from "./components/Header/Header";

function App() {
  const [theme, setTheme] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  const toastifyCfg: ToastContainerProps = {
    theme: theme ? "light" : "dark",
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: 5000,
    pauseOnFocusLoss: false,
    position: "bottom-right",
    limit: 3,
  };

  return (
    <ThemeProvider theme={!theme ? darkTheme : lightTheme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Box className="App" sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
          <Header setTheme={setTheme} />
          <Router>
            <Routes>
              <Route path="/" element={<NxtePage />} />
              <Route path="/userpage" element={<UserPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </Box>
        <ToastContainer {...toastifyCfg} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
