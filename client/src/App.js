import React from "react";
import GlobalStyle from "./globalStyles";
import { Outlet } from "react-router-dom";
import Navbar from "./components/LandingPage/Navbar/Navbar";
import Footer from "./components/LandingPage/Footer/Footer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
