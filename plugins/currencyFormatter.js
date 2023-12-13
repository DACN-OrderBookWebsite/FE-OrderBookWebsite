// plugins/currencyFormatter.js
export default ({}, inject) => {
    const formatCurrencyVND = (amount) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
  
    inject('formatCurrencyVND', formatCurrencyVND);
  };
  