const axios = require("axios");

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const formatDate = (dateData) => {
  const date = new Date(dateData);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

export const formatPrice = (priceData) => {
  return "IDR " + priceData.toLocaleString("id-ID");
};

export const isAuth = async () => {
  try {
    await axios.get(SERVER_URL + `/api/user`, { withCredentials: true });
    return true;
  } catch (err) {
    return false;
  }
};

export default { formatDate, formatPrice, isAuth };
