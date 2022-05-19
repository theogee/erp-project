const dao = require("../dao/business.dao");
const tmplt = require("../template/response.template");
const { isMobilePhone } = require("validator");


module.exports = {
  getBusiness: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBusiness(req.body.userID);
      if (rowCount === 0) return tmplt.res404("Nothing found", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },

  postBusiness: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postBusiness(req.body);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res201payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },

  deleteBusiness: async (req, res) => {
    const params = {
      userID: req.user.user_id,
      businessID: req.params.businessID,
    };

    try {
      const { rowCount, rows } = await dao.deleteBusiness(params);

      if (rowCount === 0) return tmplt.res404("Nothing found", res);
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },

  updateBusiness: async (req, res) => {
    const params = {
      ...req.body,
      businessID: req.params.businessID,
      userID: req.user.user_id,
    };

    try {
      const { rowCount, rows } = await dao.updateBusiness(params);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
};
