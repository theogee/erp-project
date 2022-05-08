const dao = require("../dao/material.dao");
const tmplt = require("../template/response.template");
const { isMobilePhone } = require("validator");

module.exports = {
  getMaterial: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getMaterial(req.body.businessID);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200payload(rows[0], res);
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
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  postMaterial: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postMaterial(req.body);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res201payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  updateMaterial: async (req, res) => {
    const params = {
      ...req.body,
      materialID: req.params.materialID,
    };

    try {
      const { rowCount, rows } = await dao.updateMaterial(params);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200payload(rows[0], res);
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
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
};
