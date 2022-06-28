import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
// custom MUI theme
import theme from "./conf/theme.conf";
import { ThemeProvider } from "@mui/material/styles";

// Pages
import App from "./App";
import NotFound from "./components/LandingPage/pages/NotFound";
import Homepage from "./components/LandingPage/pages/Home";
import Pricing from "./components/LandingPage/pages/PricingPage";
import Login from "./components/LandingPage/Form/LoginPage";

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
  CheckStockMaterial,
  CheckStockProduct,
  EditMaterial,
  InventoryProducts,
  ProductionCatalog,
  AddProduct,
  EditProduct,
  ProductionQueuedJob,
  Supplier,
  EditSupplier,
  POS,
  Cashier,
} from "./components/ERPDashboard/";

import Unauthorized from "./components/LandingPage/pages/Unauthorized";

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
          <Route
            path="inventory/materials/:materialID/edit"
            element={<EditMaterial />}
          />
          <Route
            path="inventory/materials/:materialID/checkstock"
            element={<CheckStockMaterial />}
          />
          <Route path="inventory/products" element={<InventoryProducts />} />
          <Route
            path="inventory/products/:productID/checkstock"
            element={<CheckStockProduct />}
          />
          <Route path="inventory" element={<Inventory />} />
          <Route path="production" element={<ProductionCatalog />} />
          <Route path="production/add" element={<AddProduct />} />
          <Route path="production/:productID/edit" element={<EditProduct />} />
          <Route path="production/jobs" element={<ProductionQueuedJob />} />
          <Route path="pos" element={<POS />} />
          <Route path="pos/cashier" element={<Cashier />} />
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
