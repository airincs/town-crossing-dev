import React, { FC } from "react";
import BulletinPage from "./pages/BulletinPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const App: FC = () => {
  return (
    <Box bgGradient={"linear(to-br, gray.900, gray.700)"}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bulletin" element={<BulletinPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
