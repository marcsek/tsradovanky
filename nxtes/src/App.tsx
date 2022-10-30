import "./App.css";
import { useState, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserContextProvider from "./context/UserContextProvider";

//Pages
import { NxtePage, ErrorPage, UserPage } from "./pages";

import Header from "./components/Header/Header";

function App() {
  const [theme, setTheme] = useState<boolean>(false);

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
      <Box className="App" sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <UserContextProvider>
              {/* <h6>{user?.name}</h6> */}
              <Header setTheme={setTheme} />
              <Routes>
                <Route path="/" element={<div>Base route</div>}></Route>
                <Route path="/board" element={<NxtePage />} />
                <Route path="/userpage" element={<UserPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </UserContextProvider>
          </Router>
        </Suspense>
      </Box>
      <ToastContainer {...toastifyCfg} />
    </ThemeProvider>
  );
}

export default App;
