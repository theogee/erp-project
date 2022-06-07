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
};
