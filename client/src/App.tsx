import React, { FC } from "react";
import BulletinPage from "./pages/BulletinPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import UserNotesPage from "./pages/UserNotesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const App: FC = () => {
  return (
    <Box
      bgGradient={"linear(to-br, green.300, green.200)"}
      letterSpacing={"0.05em"}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bulletin" element={<BulletinPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usernotes" element={<UserNotesPage />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
