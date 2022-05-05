const dao = require("../dao/supplier.dao");
const tmplt = require("../template/response.template");
const { isMobilePhone } = require("validator");

module.exports = {
  getSupplier: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getSupplier(req.body.businessID);

      if (rowCount === 0) tmplt.res404("Resource not found", res);
      tmplt.res200payload(rows, res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
  getSupplierParams: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getSupplierParams({
        supplierID: req.params.supplierID,
      });

      if (rowCount === 0) tmplt.res404("Resource not found", res);
      tmplt.res200payload(rows, res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
  postSupplier: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postSupplier(req.body);

      if (rowCount === 0) tmplt.res404("Resource not found", res);
      tmplt.res200msg("New entry inserted successfully!", res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
  updateSupplier: async (req, res) => {
    const { telp } = req.body;

    if (telp && !isMobilePhone(telp, "id-ID"))
      tmplt.res400("Incorrect phone number format", res);

    const params = {
      ...req.body,
      supplierID: req.params.supplierID,
      userID: req.user.user_id,
    };

    try {
      const { rowCount, rows } = await dao.updateSupplier(params);

      if (rowCount === 0) tmplt.res404("Resource not found", res);
      tmplt.res200payload(rows[0], res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
  deleteSupplier: async (req, res) => {
    const params = {
      userID: req.user.user_id,
      supplierID: req.params.supplierID,
    };

    try {
      const { rowCount, rows } = await dao.deleteSupplier(params);

      if (rowCount === 0) tmplt.res404("Resource not found", res);
      tmplt.res200payload(rows[0], res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
};
