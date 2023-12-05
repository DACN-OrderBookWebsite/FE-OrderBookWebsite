<template>
  <b-card class="product-card">
    <div class="product-image-wrapper">
      <b-card-img :src="product.image" alt="Product Image" class="product-image"></b-card-img>
    </div>
    <b-card-body>
      <h4 class="product-name">{{ product.name }}</h4>
      <div class="product-price">{{ product.price | currency }}</div>
      <b-button variant="warning" class="add-to-cart-button">Thêm vào giỏ</b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    }
  }
}
</script>

<style scoped>
.product-card {
  max-width: 300px; /* Điều chỉnh chiều rộng tùy theo layout của bạn */
  margin: auto;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
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
  max-width: 100%;
  height: auto;
}

.product-name {
  color: #333;
  font-size: 1.25rem;
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
  background-color: #007bff; /* Bootstrap primary color */
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
