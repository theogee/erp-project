import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
// custom MUI theme
import theme from "./conf/theme.conf";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

import {
  Dashboard,
  Home,
  Business,
  AddBusiness,
} from "./components/Dashboard/";

import {
  ERPDashboard,
  Inventory,
  Materials,
  Products,
} from "./components/ERPDashboard/";

import Unauthorized from "./components/Unauthorized";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="business" element={<Business />} />
          <Route path="business/create" element={<AddBusiness />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="/b/:businessID/dashboard" element={<ERPDashboard />}>
          <Route path="inventory/materials" element={<Materials />} />
          <Route path="inventory/products" element={<Products />} />
          <Route
            path="production"
            element={<h1>This is Production page!</h1>}
          />
          <Route path="inventory" element={<Inventory />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
