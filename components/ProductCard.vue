<template>
  <b-card>
    <b-card-img :src="product.imageUrl" :alt="product.name" top></b-card-img>
    <b-card-body>
      <b-card-title>{{ product.name }}</b-card-title>
      <b-card-text>{{ product.description }}</b-card-text>
      <div class="d-flex justify-content-between align-items-center">
        <b-button variant="primary">Add to cart</b-button>
        <div class="text-muted">{{ product.price | currency }}</div>
      </div>
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
.product-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.product-name {
  margin-top: 10px;
  font-size: 1.1em;
}

.product-price {
  color: #555;
  font-weight: bold;
}
</style>
