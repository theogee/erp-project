const dao = require("../dao/supplier.dao");
const { isMobilePhone } = require("validator");

module.exports = {
  getSupplier: async (req, res) => {

    // Gue coba masukin if-else di dalem try-catch, ga bisa
    // Kalo ada yang bisa sederhanain ini snippet, tolong sederhanain
    
    if (Object.keys(req.query).length === 0) { 
      try {
        const { rowCount, rows } = await dao.getSupplier();

        if (rowCount === 0)
          return res.status(404).json({
            success: false,
            msg: "Resource not found",
          });

        res.status(200).json({ success: true, data: rows });
      } catch (err) {
        res.status(500).json({ success: false, msg: err });
      }
    } else {
      try {
        const { rowCount, rows } = await dao.getSupplierWithQuery({ supplierID: req.query.supplierID});

        if (rowCount === 0)
          return res.status(404).json({
            success: false,
            msg: "Resource not found",
          });

        res.status(200).json({ success: true, data: rows });
      } catch (err) {
        res.status(500).json({ success: false, msg: err });
      }
    }
  },
  postSupplier: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postSupplier(req.body);
      if (rowCount === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Resource not found" });
      }

      res.status(200).json({ success: true, msg: "New entry inserted successfully!" });
    } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
};
