import { isAlphanumeric, isMobilePhone, isDecimal } from "validator";

export const validateBusiness = (payload) => {
  const errorMsg = { name: "", address: "" };

  if (payload.name) {
    if (!isAlphanumeric(payload.name, "en-US", { ignore: " /.,&()'" }))
      errorMsg.name =
        "Business name can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.name = "Business name can't be empty.";
  }

  if (payload.address) {
    if (!isAlphanumeric(payload.address, "en-US", { ignore: " /.,&()'" }))
      errorMsg.address =
        "Address can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.address = "Address can't be empty.";
  }

  return errorMsg;
};

export const validateSupplier = (payload) => {
  const errorMsg = { name: "", address: "", telp: "" };

  if (payload.name) {
    if (!isAlphanumeric(payload.name, "en-US", { ignore: " /.,&()'" }))
      errorMsg.name =
        "Supplier name can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.name = "Supplier name can't be empty.";
  }

  if (payload.address) {
    if (!isAlphanumeric(payload.address, "en-US", { ignore: " /.,&()'" }))
      errorMsg.address =
        "Address can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.address = "Address can't be empty.";
  }

  if (payload.telp) {
    if (!isMobilePhone(payload.telp, "id-ID"))
      errorMsg.telp = "Invalid phone number.";
  } else {
    errorMsg.telp = "Telp. can't be empty.";
  }

  return errorMsg;
};

export const validateMaterial = (payload, isSafetyStockEnabled) => {
  const errorMsg = { name: "", measurement: "", safetyStockQty: "" };

  if (payload.name) {
    if (!isAlphanumeric(payload.name, "en-US", { ignore: " " }))
      errorMsg.name = "Material name can only consist a-z, 0-9, and spaces.";
  } else {
    errorMsg.name = "Material name can't be empty.";
  }

  if (!payload.measurementID) {
    errorMsg.measurement = "Measurement can't be empty.";
  }

  if (isSafetyStockEnabled) {
    if (payload.safetyStockQty) {
      if (!isDecimal(payload.safetyStockQty))
        errorMsg.safetyStockQty = "Qty can only consist 0-9, and dots.";
    } else {
      errorMsg.safetyStockQty = "Qty can't be empty.";
    }
  }

  return errorMsg;
};

export const validateBatch = (payload) => {
  const errorMsg = {
    qty: "",
    purchasePrice: "",
    purchaseDate: "",
    expiryDate: "",
    supplier: "",
  };

  if (payload.purchaseQty) {
    if (!isDecimal(payload.purchaseQty))
      errorMsg.qty = "Qty can only consist 0-9, and dots.";
  } else {
    errorMsg.qty = "Qty can't be empty.";
  }

  if (payload.purchasePrice) {
    if (!isDecimal(payload.purchasePrice))
      errorMsg.purchasePrice = "Price can only consist 0-9, and dots.";
  } else {
    errorMsg.purchasePrice = "Purchase price can't be empty.";
  }

  if (!payload.purchaseDate) {
    errorMsg.purchaseDate = "Purchase date can't be empty.";
  }

  if (!payload.expiryDate) {
    errorMsg.expiryDate = "Expiry date can't be empty.";
  }

  if (!payload.supplierID) {
    errorMsg.supplier = "Supplier can't be empty.";
  }

  return errorMsg;
};

export const validateProductMaterial = (payload) => {
  const errorMsg = {
    material: "",
    qty: "",
  };

  if (!payload.materialID) {
    errorMsg.material = "Material can't be empty.";
  }

  if (payload.qty) {
    if (!isDecimal(payload.qty))
      errorMsg.qty =
        "Qty must be valid number and can only consist 0-9, and dots.";
  } else {
    errorMsg.qty = "Qty can't be empty.";
  }

  return errorMsg;
};

export const validateProduct = (payload) => {
  const errorMsg = {
    name: "",
    price: "",
    productionProcess: "",
  };

  if (payload.name) {
    if (
      !isAlphanumeric(payload.name, "en-US", {
        ignore: " /.,&()'",
      })
    )
      errorMsg.name =
        "Product name can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.name = "Product name can't be empty.";
  }

  if (payload.price) {
    if (!isDecimal(payload.price))
      errorMsg.price = "Price can only consist 0-9, and dots.";
  } else {
    errorMsg.price = "Product price can't be empty.";
  }

  if (payload.productionProcess) {
    if (
      !isAlphanumeric(payload.productionProcess, "en-US", {
        ignore: " /.,&()'\n",
      })
    )
      errorMsg.productionProcess =
        "Process can only consist of a-z, 0-9, spaces, and /.,&()'.";
  } else {
    errorMsg.productionProcess = "Production process can't be empty.";
  }

  return errorMsg;
};

export const validateJob = (payload) => {
  const errorMsg = {
    product: "",
    qty: "",
    productionDate: "",
    expiryDate: "",
  };

  if (!payload.productID) {
    errorMsg.product = "Product can't be empty.";
  }

  if (!payload.productionDate) {
    errorMsg.productionDate = "Production date can't be empty.";
  }

  if (!payload.expiryDate) {
    errorMsg.expiryDate = "Expiry date can't be empty.";
  }

  if (payload.qty) {
    if (!isDecimal(payload.qty))
      errorMsg.qty =
        "Qty must be valid number and can only consist 0-9, and dots.";
  } else {
    errorMsg.qty = "Qty can't be empty.";
  }

  return errorMsg;
};

export const validateOrder = (payload) => {
  const errorMsg = {
    clientName: "",
    orderDate: "",
    orderItems: "",
  };

  if (!payload.orderDate) {
    errorMsg.orderDate = "Order date can't be empty.";
  }

  if (payload.orderItems.length === 0) {
    errorMsg.orderItems = "Order items can't be empty.";
  }

  return errorMsg;
};
