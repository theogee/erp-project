export const businessModel = {
  inputs: { name: "", address: "" },
  errors: {
    name: { error: false, msg: "" },
    address: { error: false, msg: "" },
  },
};

export const supplierModel = {
  inputs: { name: "", address: "", telp: "" },
  errors: {
    name: { error: false, msg: "" },
    address: { error: false, msg: "" },
    telp: { error: false, msg: "" },
  },
};

export const materialModel = {
  inputs: {
    name: "",
    measurement: { id: "", name: "" },
    safetyStockQty: "",
  },
  errors: {
    name: { error: false, msg: "" },
    measurement: { error: false, msg: "" },
    safetyStockQty: { error: false, msg: "" },
  },
};

export const batchModel = {
  inputs: {
    qty: "",
    purchasePrice: "",
    purchaseDate: "",
    expiryDate: "",
    supplier: { id: "", name: "" },
  },
  errors: {
    qty: { error: false, msg: "" },
    purchasePrice: { error: false, msg: "" },
    purchaseDate: { error: false, msg: "" },
    expiryDate: { error: false, msg: "" },
    supplier: { error: false, msg: "" },
  },
};

export const productMaterialModel = {
  inputs: {
    material: { id: "", name: "" },
    qty: "",
    measurement: { id: "", name: "" },
  },
  errors: {
    material: { error: false, msg: "" },
    qty: { error: false, msg: "" },
    measurement: { error: false, msg: "" },
  },
};
