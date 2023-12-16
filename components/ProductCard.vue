<template>
  <b-card
    class="product-card"
    @click="details(product)"
    @mouseover="changeCursor(true)"
    @mouseout="changeCursor(false)"
    :style="{ cursor: hoverEffect ? 'pointer' : 'default' }"
  >
    <div class="product-image-wrapper">
      <b-card-img
        :src="product.image"
        alt="Product Image"
        class="product-image"
      ></b-card-img>
    </div>
    <b-card-body>
      <h4 class="product-name">{{ product.name }}</h4>
      <div class="product-price">{{ $formatCurrencyVND(product.price) }}</div>
      <div class="center-align">
        <b-button
          variant="warning"
          class="add-to-cart-button"
          @click.stop="addToCart(product)"
          >Thêm vào giỏ</b-button
        >
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hoverEffect: false,
    };
  },
  methods: {
    addToCart(item) {
      const response = this.$cart.getCart();
      const existingItemIndex = response.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        Swal.fire(
          "Thông báo!",
          "Sản phẩm đã tồn tại trong giỏ hàng.",
          "warning"
        );
      } else {
        item.stock = 1;
        this.$cart.addToCart(item);
        Swal.fire("Thông báo!", "Đã thêm sản phẩm vào giỏ hàng.", "success");
      }
    },
    details(item) {
      this.$router.push("/ProductDetails/" + item.id);
    },
    changeCursor(value) {
      this.hoverEffect = value;
    },
  },
};
</script>

<style scoped>
.product-card {
  min-height: 430px;
  max-width: 300px;
  margin: auto;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  flex: 1 1 300px; /* Các card sẽ co giãn và có chiều rộng tối thiểu là 300px */
  margin: 10px;
}

.center-align {
  text-align: center;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-wrapper {
  background: #f8f9fa;
  padding: 1.25rem;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 200px; /* Chỉnh sửa giá trị này theo nhu cầu */
  object-fit: cover;
}

.product-name {
  color: #333;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.add-to-cart-button {
  font-weight: bold;
  color: white;
  background-color: #007bff;
  /* Bootstrap primary color */
  border-color: #007bff;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.product-price {
  color: #333;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
