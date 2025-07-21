import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Archives from "./Components/Archives";
import Customs from "./Components/Customs";
import Home from "./Components/Home";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/customs" element={<Customs />} /> 
      </Routes>
    </>
  );
}

export default App;
