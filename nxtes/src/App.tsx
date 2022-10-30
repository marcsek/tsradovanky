import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { UserType } from "./types/user.type";
import { UserContext } from "./context/UserContext";

//Pages
import { NxtePage, ErrorPage, UserPage } from "./pages";

import Header from "./components/Header/Header";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "./queries";

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

  const { data: user }: UseQueryResult<UserType> = useQuery<UserType>(["user"], getUser, {
    onError(err) {
      // console.log(err);
      // if (!user) {
      //   navigate("/userpage");
      // }
    },
  });

  return (
    <ThemeProvider theme={!theme ? darkTheme : lightTheme}>
      <UserContext.Provider value={{ user: user ?? null }}>
        <Box className="App" sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
          <h6>{user?.name}</h6>
          <Router>
            <Header setTheme={setTheme} />
            <Routes>
              <Route path="/" element={user ? <NxtePage /> : <h1>Please log in</h1>} />
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
