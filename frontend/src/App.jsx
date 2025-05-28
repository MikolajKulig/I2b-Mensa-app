import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MenuWrapper from "./components/MenuWrapper";
import LoginWrapper from "./components/LoginWrapper";
import RegisterWrapper from "./components/RegisterWrapper";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuWrapper />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;