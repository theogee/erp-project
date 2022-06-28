// need to implement "reset" action, since MUI dialog component will NOT dismount after onClose
import { batchModel } from "./models";

const REGEX_NUMBER_ONLY = /^[0-9]*$/;
const REGEX_NUMBER_DOTS = /^[0-9]*\.?[0-9]*$/;

export const businessReducer = {
  inputs: (prevBusiness, action) => {
    switch (action.type) {
      case "onchange-business-name":
        return { ...prevBusiness, name: action.payload.name };
      case "onchange-business-address":
        return { ...prevBusiness, address: action.payload.address };
      default:
        break;
    }
    return prevBusiness;
  },
  errors: (prevErrorBusiness, action) => {
    switch (action.type) {
      case "error-name":
        return {
          ...prevErrorBusiness,
          name: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-address":
        return {
          ...prevErrorBusiness,
          address: { error: action.payload.error, msg: action.payload.msg },
        };
      default:
        break;
    }
    return prevErrorBusiness;
  },
};

export const supplierReducer = {
  inputs: (prevSupplier, action) => {
    switch (action.type) {
      case "onchange-supplier-name":
        return { ...prevSupplier, name: action.payload.name };
      case "onchange-supplier-address":
        return { ...prevSupplier, address: action.payload.address };
      case "onchange-supplier-telp":
        if (action.payload.telp.match(REGEX_NUMBER_ONLY))
          return {
            ...prevSupplier,
            telp: action.payload.telp,
          };
        break;
      default:
        break;
    }
    return prevSupplier;
  },
  errors: (prevErrorSupplier, action) => {
    switch (action.type) {
      case "error-name":
        console.log("error-name triggered");
        return {
          ...prevErrorSupplier,
          name: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-address":
        console.log("error-address triggered");
        return {
          ...prevErrorSupplier,
          address: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-telp":
        console.log("error-telp triggered");
        return {
          ...prevErrorSupplier,
          telp: { error: action.payload.error, msg: action.payload.msg },
        };
      default:
        break;
    }
    console.log("return prev errorSupplier state???");
    return prevErrorSupplier;
  },
};

export const materialReducer = {
  inputs: (prevMaterial, action) => {
    switch (action.type) {
      case "onchange-material-name":
        return { ...prevMaterial, name: action.payload.name };
      case "onchange-material-measurement":
        return {
          ...prevMaterial,
          measurement: { id: action.payload.id, name: action.payload.name },
        };
      case "onchange-material-safetyStockQty":
        if (action.payload.safetyStockQty.match(REGEX_NUMBER_DOTS))
          return {
            ...prevMaterial,
            safetyStockQty: action.payload.safetyStockQty,
          };
        break;
      default:
        break;
    }
    return prevMaterial;
  },
  errors: (prevErrorMaterial, action) => {
    switch (action.type) {
      case "error-name":
        return {
          ...prevErrorMaterial,
          name: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-measurement":
        return {
          ...prevErrorMaterial,
          measurement: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-safetyStockQty":
        return {
          ...prevErrorMaterial,
          safetyStockQty: {
            error: action.payload.error,
            msg: action.payload.msg,
          },
        };
      default:
        break;
    }
    return prevErrorMaterial;
  },
};

export const batchReducer = {
  inputs: (prevFirstBatch, action) => {
    switch (action.type) {
      case "onchange-firstBatch-qty":
        if (action.payload.qty.match(REGEX_NUMBER_DOTS))
          return { ...prevFirstBatch, qty: action.payload.qty };
        break;
      case "onchange-firstBatch-purchasePrice":
        if (action.payload.purchasePrice.match(REGEX_NUMBER_ONLY))
          return {
            ...prevFirstBatch,
            purchasePrice: action.payload.purchasePrice,
          };
        break;
      case "onchange-firstBatch-purchaseDate":
        return { ...prevFirstBatch, purchaseDate: action.payload.purchaseDate };
      case "onchange-firstBatch-expiryDate":
        return { ...prevFirstBatch, expiryDate: action.payload.expiryDate };
      case "onchange-firstBatch-supplier":
        return {
          ...prevFirstBatch,
          supplier: { id: action.payload.id, name: action.payload.name },
        };
      case "reset":
        return batchModel.inputs;
      default:
        break;
    }
    return prevFirstBatch;
  },
  errors: (prevErrorFirstBatch, action) => {
    switch (action.type) {
      case "error-qty":
        return {
          ...prevErrorFirstBatch,
          qty: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-purchasePrice":
        return {
          ...prevErrorFirstBatch,
          purchasePrice: {
            error: action.payload.error,
            msg: action.payload.msg,
          },
        };
      case "error-purchaseDate":
        return {
          ...prevErrorFirstBatch,
          purchaseDate: {
            error: action.payload.error,
            msg: action.payload.msg,
          },
        };
      case "error-expiryDate":
        return {
          ...prevErrorFirstBatch,
          expiryDate: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-supplier":
        return {
          ...prevErrorFirstBatch,
          supplier: { error: action.payload.error, msg: action.payload.msg },
        };
      case "reset":
        return batchModel.errors;
      default:
        break;
    }
    return prevErrorFirstBatch;
  },
};

export const productMaterialReducer = {
  inputs: (prevProductMaterial, action) => {
    switch (action.type) {
      case "onchange-productMaterial-material":
        return {
          ...prevProductMaterial,
          material: { id: action.payload.id, name: action.payload.name },
        };
      case "onchange-productMaterial-qty":
        if (action.payload.qty.match(REGEX_NUMBER_DOTS))
          return {
            ...prevProductMaterial,
            qty: action.payload.qty,
          };
        break;
      case "onchange-productMaterial-measurement":
        return {
          ...prevProductMaterial,
          measurement: { id: action.payload.id, name: action.payload.name },
        };
      default:
        break;
    }
    return prevProductMaterial;
  },
  errors: (prevErrorProductMaterial, action) => {
    switch (action.type) {
      case "error-material":
        return {
          ...prevErrorProductMaterial,
          material: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-qty":
        return {
          ...prevErrorProductMaterial,
          qty: { error: action.payload.error, msg: action.payload.msg },
        };
      default:
        break;
    }
    return prevErrorProductMaterial;
  },
};

export const productReducer = {
  inputs: (prevProduct, action) => {
    switch (action.type) {
      case "onchange-product-name":
        return {
          ...prevProduct,
          name: action.payload.name,
        };
      case "onchange-product-price":
        if (action.payload.price.match(REGEX_NUMBER_ONLY))
          return {
            ...prevProduct,
            price: action.payload.price,
          };
        break;
      case "onchange-product-productionProcess":
        return {
          ...prevProduct,
          productionProcess: action.payload.productionProcess,
        };
      default:
        break;
    }
    return prevProduct;
  },
  errors: (prevErrorProduct, action) => {
    switch (action.type) {
      case "error-name":
        return {
          ...prevErrorProduct,
          name: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-price":
        return {
          ...prevErrorProduct,
          price: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-productionProcess":
        return {
          ...prevErrorProduct,
          productionProcess: {
            error: action.payload.error,
            msg: action.payload.msg,
          },
        };
      default:
        break;
    }
    return prevErrorProduct;
  },
};

export const jobReducer = {
  inputs: (prevJob, action) => {
    switch (action.type) {
      case "onchange-job-product":
        return {
          ...prevJob,
          product: { id: action.payload.id, name: action.payload.name },
        };
      case "onchange-job-qty":
        if (action.payload.qty.match(REGEX_NUMBER_DOTS))
          return {
            ...prevJob,
            qty: action.payload.qty,
          };
        break;
      case "onchange-job-productionDate":
        return {
          ...prevJob,
          productionDate: action.payload.productionDate,
        };
      case "onchange-job-expiryDate":
        return {
          ...prevJob,
          expiryDate: action.payload.expiryDate,
        };
      default:
        break;
    }
    return prevJob;
  },
  errors: (prevErrorJob, action) => {
    switch (action.type) {
      case "error-product":
        return {
          ...prevErrorJob,
          product: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-qty":
        return {
          ...prevErrorJob,
          qty: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-productionDate":
        return {
          ...prevErrorJob,
          productionDate: {
            error: action.payload.error,
            msg: action.payload.msg,
          },
        };
      case "error-expiryDate":
        return {
          ...prevErrorJob,
          expiryDate: { error: action.payload.error, msg: action.payload.msg },
        };
      default:
        break;
    }
    return prevErrorJob;
  },
};

export const orderReducer = {
  inputs: (prevOrder, action) => {
    switch (action.type) {
      case "onchange-order-clientName":
        return {
          ...prevOrder,
          clientName: action.payload.clientName,
        };
      case "onchange-order-orderDate":
        return {
          ...prevOrder,
          orderDate: action.payload.orderDate,
        };
      case "onchange-order-orderItems":
        return {
          ...prevOrder,
          orderItems: action.payload.orderItems,
        };
      default:
        break;
    }
    return prevOrder;
  },
  errors: (prevErrorOrder, action) => {
    switch (action.type) {
      case "error-clientName":
        return {
          ...prevErrorOrder,
          clientName: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-orderDate":
        return {
          ...prevErrorOrder,
          orderDate: { error: action.payload.error, msg: action.payload.msg },
        };
      case "error-orderItems":
        return {
          ...prevErrorOrder,
          orderItems: { error: action.payload.error, msg: action.payload.msg },
        };
      default:
        break;
    }
    return prevErrorOrder;
  },
};
