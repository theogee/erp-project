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
  updateSupplier: async (req, res) => {
    const { telp } = req.body;

    if (telp && !isMobilePhone(telp, "id-ID")) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect phone number format",
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

      res.status(200).json({ success: true, updatedData: rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
  deleteSupplier: async (req, res) => {
    const params = {
      userID: req.user.user_id,
      supplierID: req.params.supplierID,
    };

    try {
      const { rowCount, rows } = await dao.deleteSupplier(params);
      
      if (rowCount === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Resource not found" });
      }
      
      res.status(200).json({ success: true, deletedData: rows[0] });
     } catch (err) {
      res.status(500).json({ success: false, msg: err });
    }
  },
};
