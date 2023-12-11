// plugins/cart.js

export default ({ app }, inject) => {
    inject('cart', {
      getCart() {
        // Lấy thông tin giỏ hàng từ Local Storage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
      },
  
      addToCart(item) {
        // Thêm một sản phẩm vào giỏ hàng
        const cart = this.getCart();
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      },
  
      clearCart() {
        // Xóa thông tin giỏ hàng từ Local Storage
        localStorage.removeItem('cart');
      },
    });
  };
  