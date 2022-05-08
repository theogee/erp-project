const dao = require("../dao/material.dao");
const tmplt = require("../template/response.template");
const { isMobilePhone } = require("validator");

module.exports = {
  getMaterial: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getMaterial(req.body.businessID);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  getMaterialParams: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getMaterialParams({
        materialID: req.params.materialID,
      });

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  postMaterial: async (req, res) => {
    try {
      // Kalo mau kirim ack doang, rows-nya mending di-omit aja ya.
      // Kecuali ack-nya berupa data yang baru dibuat.
      const { rowCount, rows } = await dao.postMaterial(req.body);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200msg("New entry inserted successfully!", res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  updateMaterial: async (req, res) => {
    const { telp } = req.body;

    // Ini diperluin gak sih? WKWKWK
    if (telp && !isMobilePhone(telp, "id-ID"))
      return tmplt.res400("Incorrect phone number format", res);

    const params = {
      ...req.body,
      materialID: req.params.materialID,
    };

    try {
      const { rowCount, rows } = await dao.updateMaterial(params);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200msg("New entry updated successfully!", res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  deleteMaterial: async (req, res) => {
    const params = {
      materialID: req.params.materialID,
      businessID: req.body.businessID,
    };

    try {
      const { rowCount, rows } = await dao.deleteMaterial(params);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200msg("Entry deleted successfully!", res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
};
