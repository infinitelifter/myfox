import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Reservations from "./pages/Reservations";
import PersonalInformation from "./pages/PersonalInformation";
import { Toolbar } from "@mui/material";

export const App = () => {
  return (
    <Router>
      <Header />
      <Toolbar />
      <Routes>
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/personal-info" element={<PersonalInformation />} />
        <Route path="*" element={<Reservations />} />
      </Routes>
    </Router>
  );
};
