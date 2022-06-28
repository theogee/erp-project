const axios = require("axios");

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

module.exports = {
  formatDate: (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  },
  formatPrice: (priceData) => {
    return "IDR " + priceData.toLocaleString("id-ID");
  },
  isAuth: async () => {
    try {
      await axios.get(SERVER_URL + `/api/user`, { withCredentials: true });
      return true;
    } catch (err) {
      return false;
    }
  },
};
