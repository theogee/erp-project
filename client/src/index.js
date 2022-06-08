import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
// custom MUI theme
import theme from "./conf/theme.conf";
import { ThemeProvider } from "@mui/material/styles";

// Pages
import App from "./App";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/Home";
import Pricing from "./pages/PricingPage";
import Login from "./components/Form/LoginPage";

import {
  Dashboard,
  Home,
  Business,
  AddBusiness,
} from "./components/Dashboard/";

import {
  ERPDashboard,
  Inventory,
  InventoryMaterials,
  InventoryProducts,
  Product,
  Pos,
  Supplier,
  QueuedJob,
  EditSupplier,
} from "./components/ERPDashboard/";

import Unauthorized from "./pages/Unauthorized";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Navigate replace to="/home" />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="business" element={<Business />} />
          <Route path="business/create" element={<AddBusiness />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="/b/:businessID/dashboard" element={<ERPDashboard />}>
          <Route path="inventory/materials" element={<InventoryMaterials />} />
          <Route path="inventory/products" element={<InventoryProducts />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="production" element={<Product />} />
          <Route path="production/jobs" element={<QueuedJob />} />
          <Route path="pos" element={<Pos />} />
          <Route path="supplier" element={<Supplier />} />
          <Route path="supplier/:supplierID/edit" element={<EditSupplier />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
