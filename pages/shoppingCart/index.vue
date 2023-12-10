<template>
  <div id="app">
    <Header> </Header>
    <HeroSection></HeroSection>
    <div class="container">
      <b-table striped hover :items="cartItems" :fields="fields">
        <template v-slot:cell(image)="data">
          <b-img :src="data.item.image" alt="Image" fluid></b-img>
        </template>
        <template v-slot:cell(quantity)="data">
          <b-input-group size="sm">
            <b-button @click="decrement(data.index)" variant="outline-secondary"
              >-</b-button
            >
            <b-form-input v-model="data.item.quantity" readonly></b-form-input>
            <b-button @click="increment(data.index)" variant="outline-secondary"
              >+</b-button
            >
          </b-input-group>
        </template>
        <template v-slot:cell(total)="data">
          {{ data.item.price * data.item.quantity }}
        </template>
      </b-table>

      

      <!-- Form Đặt Hàng -->
      <b-form @submit="onSubmit">
        <b-form-group label="Tên">
          <b-form-input v-model="order.name"></b-form-input>
        </b-form-group>

        <b-form-group label="Mã Số Sinh Viên">
          <b-form-input v-model="order.studentId"></b-form-input>
        </b-form-group>

        <b-form-group label="Số Điện Thoại">
          <b-form-input v-model="order.phone"></b-form-input>
        </b-form-group>

        <b-form-group label="Nơi Lấy Sách">
          <b-form-input v-model="order.pickupLocation"></b-form-input>
        </b-form-group>

        <b-form-group label="Ghi Chú">
          <b-form-textarea v-model="order.notes"></b-form-textarea>
        </b-form-group>

        <!-- Tổng Tiền -->
      <div class="total-price">Thành tiền: {{ totalPrice }}</div>

        <b-button type="submit" variant="primary">Đặt Hàng</b-button>
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
        // Mẫu dữ liệu, thay thế với dữ liệu thực tế
        { image: 'link-to-image.jpg', title: 'Sách A', price: 100, quantity: 1 },
        { image: 'link-to-image.jpg', title: 'Sách B', price: 150, quantity: 2 },
      ],
      fields: ['image', 'title', 'price', 'quantity', 'total'],
      order: {
        name: "",
        studentId: "",
        phone: "",
        pickupLocation: "",
        notes: "",
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    increment(index) {
      this.cartItems[index].quantity++;
    },
    decrement(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      // Xử lý đặt hàng ở đây
      // ...
    }
  }
};
</script>
<style>
.container {
  margin-top: 20px;
}

.total-price {
  margin-bottom: 20px;
  font-size: 1.25em;
  font-weight: bold;
}

.b-img {
  width: 100px; /* Điều chỉnh kích thước ảnh */
}


/* Thêm các style khác nếu cần */
</style>