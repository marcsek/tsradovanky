import "./App.css";
import { Suspense } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserContextProvider } from "./context/userContext";

//Pages
import { NxtePage, ErrorPage, AuthPage } from "./pages";
import RequireAuth from "./components/RequireAuth";

import Layout from "./components/Layout";
import { MyThemeProvider } from "./context/themeContext";
import Loader from "./components/Loader";

function App() {
  return (
    <MyThemeProvider>
      <Box className="App" sx={{ backgroundColor: theme => theme.palette.background.default }}>
        <Suspense fallback={<Loader />}>
          <UserContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<div>Nxtes app</div>} />
                  <Route path="auth" element={<AuthPage />}>
                    <Route path=":type" element={<AuthPage />} />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route path="board" element={<NxtePage />} />
                  </Route>
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </Router>
          </UserContextProvider>
        </Suspense>
      </Box>
    </MyThemeProvider>
  );
}

export default App;
