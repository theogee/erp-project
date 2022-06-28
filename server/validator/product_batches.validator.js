const { isInt, isDate, isDecimal } = require("validator");

module.exports = (body) => {
  const { productID, productionDate, expiryDate, qty } = body;
  const error = { error: false, msg: "" };

  // check isExist
  if (!productID || !productionDate || !expiryDate || !qty) {
    error.error = true;
    error.msg = "missing required parameters";
  }

  // check format
  else if (
    !isInt(productID + "") ||
    !isDate(productionDate + "") ||
    !isDate(expiryDate + "") ||
    !isDecimal(qty + "")
  ) {
    error.error = true;
    error.msg = "wrong parameters format";
  }

  return error;
};
