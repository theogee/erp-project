import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

import { Dashboard, Home } from "./components/Dashboard/";

import Unauthorized from "./components/Unauthorized";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
