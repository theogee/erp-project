const dao = require("../dao/business.dao");
const tmplt = require("../template/response.template");

module.exports = {
  getBusiness: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBusiness(req.user.user_id);
      if (rowCount === 0)
        return tmplt.res404("Business cannot be retrieved", res);
      return tmplt.res200payload(rows, res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
  getBusinessByID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBusinessByID({
        businessID: req.params.businessID,
      });

      if (rowCount === 0)
        return tmplt.res404("Business cannot be retrieved", res);

      tmplt.res200payload(rows[0], res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
  postBusiness: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postBusiness({
        userID: req.user.user_id,
        name: req.body.name,
        address: req.body.address,
      });
      if (rowCount === 0)
        return tmplt.res404("Business cannot be created", res);
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

      if (rowCount === 0)
        return tmplt.res404("Business cannot be deleted", res);
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
      console.log(params);
      const { rowCount, rows } = await dao.updateBusiness(params);

      if (rowCount === 0)
        return tmplt.res404("Business cannot be updated", res);
      return tmplt.res200payload(rows[0], res);
    } catch (err) {
      return tmplt.res500(err, res);
    }
  },
};
