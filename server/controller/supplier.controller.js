const dao = require("../dao/supplier.dao");

module.exports = {
  updateSupplier: async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);

    const params = {
      ...req.body,
      supplierID: req.params.supplierID,
    };
    try {
      const result = await dao.updateSupplier(params);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
};
