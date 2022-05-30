const REGEX_NUMBER_ONLY = /^[0-9]*$/;
const REGEX_NUMBER_DOTS = /^[0-9]*\.?[0-9]*$/;

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
      default:
        break;
    }
    return prevErrorFirstBatch;
  },
};