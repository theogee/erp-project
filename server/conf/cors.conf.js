const cors = require("cors");

module.exports = cors({
  origin: process.env.CLIENT_URL,
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
});
