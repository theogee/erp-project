const dao = require("../dao/supplier.dao");
const tmplt = require("../template/response.template");
const { isMobilePhone } = require("validator");

module.exports = {
  getSupplier: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getSupplier(req.query.businessID);

      // if (rowCount === 0)
      //   return tmplt.res404("Suppliers cannot be retrieved", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  getSupplierParams: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getSupplierParams({
        supplierID: req.params.supplierID,
      });

      if (rowCount === 0)
        return tmplt.res404("Supplier cannot be retrieved", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  postSupplier: async (req, res) => {
    try {
      // Kalo mau kirim ack doang, rows-nya mending di-omit aja ya.
      // Kecuali ack-nya berupa data yang baru dibuat.
      const { rowCount, rows } = await dao.postSupplier(req.body);

      if (rowCount === 0)
        return tmplt.res404("Supplier cannot be created", res);
      return tmplt.res201payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  updateSupplier: async (req, res) => {
    const params = {
      ...req.body,
      supplierID: req.params.supplierID,
      userID: req.user.user_id,
    };

    try {
      const { rowCount, rows } = await dao.updateSupplier(params);

      if (rowCount === 0)
        return tmplt.res404("Supplier cannot be updated", res);
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  deleteSupplier: async (req, res) => {
    const params = {
      userID: req.user.user_id,
      supplierID: req.params.supplierID,
    };

    try {
      const { rowCount, rows } = await dao.deleteSupplier(params);

      if (rowCount === 0)
        return tmplt.res404("Supplier cannot be deleted", res);
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
};
