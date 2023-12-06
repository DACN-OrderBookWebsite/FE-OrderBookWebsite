<template>
  <div id="app">
    <Header> </Header>
    <HeroSection></HeroSection>
    <div class="checkout-form-container">
      <!-- Cart Items Table -->
      <b-table striped hover :items="cartItems" class="mb-4">
        <template v-slot:cell(name)="data">
          {{ data.item.name }}
        </template>
        <template v-slot:cell(price)="data">
          {{ data.item.price | currency }}
        </template>
        <template v-slot:cell(quantity)="data">
          {{ data.item.quantity }}
        </template>
        <template v-slot:cell(total)="data">
          {{ (data.item.price * data.item.quantity) | currency }}
        </template>
      </b-table>

      <!-- User Information Form -->
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Full Name" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="user.name"
            required
            placeholder="Enter your full name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="input-email">
          <b-form-input
            type="email"
            id="input-email"
            v-model="user.email"
            required
            placeholder="Enter your email"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Address" label-for="input-address">
          <b-form-input
            id="input-address"
            v-model="user.address"
            required
            placeholder="Enter your address"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Phone" label-for="input-phone">
          <b-form-input
            id="input-phone"
            v-model="user.phone"
            required
            placeholder="Enter your phone number"
          ></b-form-input>
        </b-form-group>

        <!-- Total Price -->
        <div class="total-price">Total: {{ calculateTotal | currency }}</div>

        <!-- Checkout Button -->
        <b-button type="submit" variant="success" block>Checkout</b-button>
      </b-form>
    </div>
    <Footer> </Footer>
  </div>
</template>
  
  <script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";

export default {
  name: "ShoppingCart",
  components: { HeroSection, Footer, Header },
  data() {
    return {
      cartItems: [
        { id: 1, name: 'Product 1', price: 49.99, quantity: 1 },
        { id: 2, name: 'Product 2', price: 12.99, quantity: 2 },
        { id: 3, name: 'Product 3', price: 29.99, quantity: 1 },
      ],
      user: {
        name: '',
        email: '',
        address: '',
        phone: '',
      },
    };
  },
  methods: {
    onSubmit() {
      alert('Checkout complete!'); // Replace with actual checkout logic
    },
    calculateTotal() {
      return this.cartItems.reduce((acc, item) => {
        // Ensure that price and quantity are treated as numbers
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        return acc + price * quantity;
      }, 0);
    }
  },
  filters: {
    currency(value) {
      // Ensure the value is a number before calling toFixed
      const number = Number(value);
      if (isNaN(number)) {
        return "Invalid number"; // Or any other error handling
      }
      return `$${number.toFixed(2)}`;
    }
  }
};
</script>
<style scoped>
.checkout-form-container {
  max-width: 800px;
  margin: auto;
}

.total-price {
  text-align: right;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
  