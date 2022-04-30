const dao = require("../dao/supplier.dao");
const { isMobilePhone } = require("validator");

module.exports = {
  updateSupplier: async (req, res) => {
    const { telp } = req.body;

    if (telp && !isMobilePhone(telp, "id-ID")) {
      return res.status(400).json({
        success: false,
        msg: "incorrect phone number format",
      });
    }

    const params = {
      ...req.body,
      supplierID: req.params.supplierID,
      userID: req.user.user_id,
    };

    try {
      const { rowCount, rows } = await dao.updateSupplier(params);

      if (rowCount === 0)
        return res.status(404).json({
          success: false,
          msg: "Resource not found",
        });

      res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
};
