import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import Home from "../src/container/Home";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
