const dao = require("../dao/supplier.dao");
const { isMobilePhone } = require("validator");

module.exports = {
  updateSupplier: async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { telp } = req.body;

    const params = {
      ...req.body,
      supplierID: req.params.supplierID,
      userID: req.user.user_id,
    };

    if (telp && !isMobilePhone(telp, "id-ID")) {
      return res.status(400).json({
        success: false,
        msg: "incorrect phone number format",
      });
    }

    try {
      const { rowCount, rows } = await dao.updateSupplier(params);

      if (rowCount === 0)
        return res.status(401).json({
          success: false,
          msg: "You are not authorized to access the resource",
        });

      res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
};
