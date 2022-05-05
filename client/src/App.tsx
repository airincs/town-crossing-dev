import React, { FC } from "react";
import BulletinPage from "./pages/BulletinPage";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bulletin" element={<BulletinPage />} />
      </Routes>
    </Router>
  );
};

export default App;
