<template>
  <div class="product-details-container">
    <div class="row">
      <div class="col-md-9">
        <div class="row container-product">
          <div class="col-md-6 image-product">
            <b-carousel id="carousel-1" :interval="4000" controls>
              <b-carousel-slide
                img-src="@/static/images/backgrounds/imagebook2.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="@/static/images/backgrounds/imagebook2.png"
              ></b-carousel-slide>
              <!-- Thêm các b-carousel-slide khác cho các hình ảnh sản phẩm -->
            </b-carousel>
          </div>

          <div class="col-md-6">
            <h2>{{ productName }}</h2>
            <p>{{ price }}</p>
            <b-row>
              <div class="col-md-6 container-info-product">
                <p class="mg-bottom-40">
                  Năm xuất bản:
                  <span class="borderadius-organe"> {{ publishYear }}</span>
                </p>
                <p class="mg-bottom-40">
                  Tác giả:
                  <span class="borderadius-organe"> {{ author }}</span>
                </p>
              </div>
              <div class="col-md-6 container-info-product">
                <p class="mg-bottom-40">
                  Nhà xuất bản:
                  <span class="borderadius-organe"> {{ publisher }}</span>
                </p>
              </div>
            </b-row>
            <div class="quantity-controls">
              <b-button variant="primary" @click="decreaseQuantity">-</b-button>
              <span>{{ quantity }}</span>
              <b-button variant="primary" @click="increaseQuantity">+</b-button>
            </div>
            <b-button variant="success" class="mr-2">Cho vào giỏ hàng</b-button>
            <b-button variant="danger">Đặt sách ngay</b-button>
          </div>
        </div>
      </div>
      <div class="col-md-3 container-place-product">
        <h2>Thông tin nơi lấy giáo trình</h2>
        <p>
          HUITLibrary - Thư viện đại học Công Thương TP.HCM Địa chỉ liên hệ: 140
          Lê Trọng Tấn, Tân Phú, TP. Hồ Chí Minh, Việt Nam
        </p>
        <p>Năm xuất bản: {{ publishYear }}</p>
      </div>
    </div>
    <h2>Các Giáo Trình Đại Cương Khác</h2>
    <b-row>
      <b-col v-for="book in paginatedBooks" :key="book.id" cols="12" md="2">
        <ProductCard :product="book"></ProductCard>
      </b-col>
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="books.length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>
  
  <script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductDetails",
  components: { ProductCard },
  data() {
    return {
      productName: "Tên Sản Phẩm",
      price: "100.000₫",
      publishYear: "2020",
      author: "Tên Tác Giả",
      publisher: "Nhà Xuất Bản",
      quantity: 1,
      books: [
        { id: 1, name: 'Book Title 1', price: 19.99, stock: 10, imageUrl: 'path-to-image-1.jpg', description: 'Description for product 1' },
        { id: 2, name: 'Book Title 2', price: 29.99, stock: 5, imageUrl: 'path-to-image-2.jpg', description: 'Description for product 2' },
        { id: 4, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 5, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 6, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 7, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 8, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 9, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },
        { id: 310, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for product 3' },

      ],
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    paginatedBooks() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;
      return this.books.slice(start, end);
    }
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 0) this.quantity--;
    },
  },
};
</script>
  
  <style scoped>
.product-details-container {
  margin: 5%;
  color: var(--color-text-color, #1a1a1a);
  font-family: Josefin Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.borderadius-organe {
  border-radius: 5px;
  background: #ff6b00;
  color: #fff;
  padding: 15px;
  text-align: center;
  font-family: Josefin Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.container-info-product {
  padding: 20px;
  border: 1px solid #9da2a6;
}
.image-product {
  width: 30%;
  object-fit: cover;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: auto;
  margin-bottom: auto;
}
.mg-bottom-40 {
  margin-bottom: 40px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.quantity-controls span {
  margin: 0 10px;
}
.container-product {
  max-height: fit-content;
  border: 1px solid #9da2a6;
}
.container-place-product {
  max-height: fit-content;
  border: 1px solid #9da2a6;
}
</style>
  