<template>
  <div class="body-container">
    <Header></Header>
    <section-bar :current-route="$route.path"></section-bar>
    <div class="hero-section-container-left">
      <HeroSection></HeroSection>
    </div>
    <div class="product-details-container">
      <div class="row">
        <div class="col-md-12">
          <div class="row container-product">
            <div class="col-md-4 image-product">
              <!-- <b-carousel id="carousel-1" :interval="4000" controls>
                <b-carousel-slide img-src="@/static/images/backgrounds/imagebook2.png"></b-carousel-slide>
                <b-carousel-slide img-src="@/static/images/backgrounds/imagebook2.png"></b-carousel-slide>
                Thêm các b-carousel-slide khác cho các hình ảnh sản phẩm
              </b-carousel> -->
              <img :src="data.Anh" class="carousel-image" alt="Ảnh"/>
            </div>

            <div class="col-md-8 ml-5">
              <h2>{{ data.name }}</h2>
              <b-row>
                <div class="container-info-product">
                  <p class="mg-bottom-40">
                    Năm xuất bản:
                    <span class="borderadius-organe">
                      {{ data.NamXuatBan }}</span>
                  </p>
                </div>
                <div class="container-info-product">
                  <p class="mg-bottom-40">
                    Tác giả:
                    <span class="borderadius-organe">
                      {{ data.nameOfTacGia }}</span>
                  </p>
                </div>
                <div class="container-info-product">
                  <p class="mg-bottom-40">
                    Nhà xuất bản:
                    <span class="borderadius-organe">
                      {{ data.nameOfNhaXuatBan }}</span>
                  </p>
                </div>
                <div class="container-info-product">
                  <p class="mg-bottom-40 price-details">
                    {{ $formatCurrencyVND(data.DonGia) }}
                  </p>
                </div>
              </b-row>
              <div class="quantity-controls">
                <p class="mg-bottom-40">
                  Số Lượng:
                  <b-button variant="primary" @click="decreaseQuantity">-</b-button>
                  <span>{{ quantity }}</span>
                  <b-button variant="primary" @click="increaseQuantity">+</b-button>
                </p>
              </div>
              <b-button variant="success" class="mr-2" @click="addToCart(data)">Cho vào giỏ hàng</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-details-container">
      <div class="row paginate-product">
        <p class="mg-top-40 product-other">
          Các Giáo Trình Đại Cương Khác
        </p>
        <b-row>
          <b-col v-for="book in paginatedBooks" :key="book.id" cols="12" md="3">
            <ProductCard :product="book"></ProductCard>
          </b-col>
        </b-row>
        <b-pagination v-model="currentPage" :total-rows="books.length" :per-page="perPage"
          aria-controls="my-table"></b-pagination>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
    
<script>
import ProductCard from "../../components/ProductCard.vue";
import SachService from "../../services/api/SachService";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
export default {
  name: "ProductDetails",
  components: { ProductCard, Footer, Header, HeroSection },
  data() {
    return {
      data: {},
      books: [
        {
          id: 1,
          name: "Book Title 1",
          price: 19.99,
          stock: 10,
          imageUrl: "path-to-image-1.jpg",
          description: "Description for product 1",
        },
        {
          id: 2,
          name: "Book Title 2",
          price: 29.99,
          stock: 5,
          imageUrl: "path-to-image-2.jpg",
          description: "Description for product 2",
        },
        {
          id: 4,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 5,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 6,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 7,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 8,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 9,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 310,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          imageUrl: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
      ],
      currentPage: 1,
      perPage: 4,
      quantity: 1,
    };
  },
  computed: {
    paginatedBooks() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;
      return this.books.slice(start, end);
    },
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 0) this.quantity--;
    },
    async fetch() {
      try {
        const response = await SachService.showDataWithoutID(
          this.$axios,
          this.$route.params.id
        );
        this.data = response.data;


        const book = await SachService.getDataByTheLoai(
          this.$axios,
          this.data.idTheLoai
        );
        this.books = book.data;

      } catch {
        console.log("Lỗi load dữ liệu fetch.");
      }
    },
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
        item.stock = this.quantity;
        this.$cart.addToCart(item);
        Swal.fire("Thông báo!", "Đã thêm sản phẩm vào giỏ hàng.", "success");
      }
    },
  },
};
</script>
    
<style scoped>
body {
  padding: 0 !important;
}

.ml-5 {
  margin-left: 50px;
}

.price-details {
  padding: 18px 15px;
  border-radius: 5px;
  background: #f1f2f2;
  max-width: 80%;
  font-weight: bold;
  font-size: 30px;
  color: #f37d21;
}

.mg-top-40 {
  margin-top: 40px;
}

.product-other {
  padding: 18px 15px;
  border-radius: 5px;
  max-width: 80%;
  font-weight: bold;
  font-size: 30px;
  color: #f37d21;
  text-align: center;
}

.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.product-details-container {
  margin-top: 1%;
  margin-right: 5%;
  margin-left: 5%;
  color: var(--color-text-color, #1a1a1a);
  font-family: Josefin Sans;
  background-color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.paginate-product {
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
}

.body-container {
  background-color: #f1f1f1;
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
}

.container-place-product {
  max-height: fit-content;
}

.body-container {
  /* Thiết lập display flex để sắp xếp các phần tử theo hàng */
  display: flex;
  flex-wrap: wrap;
}

.hero-section-container {
  /* Đặt độ rộng và padding cho phần HeroSection */
  width: 100%;
  padding-right: 15px;
  /* Padding phải để giữ khoảng trắng giữa HeroSection và sản phẩm */
}

.product-details-container {
  /* Thiết lập độ rộng cho phần sản phẩm và các phần khác */
  width: 100%;
}
/* Trong tệp CSS của bạn */

.hero-section-container-left {
  float: left; /* Chuyển container về bên trái */
  width: 100%; /* Chiếm toàn bộ chiều rộng của body-container */
}

/* Các quy tắc CSS khác cho trang web của bạn */
/* Trong tệp CSS của bạn */

.carousel-image {
  width: 100%; /* Hình ảnh không vượt quá chiều rộng của container */
  height: auto;    /* Tự động điều chỉnh chiều cao theo tỷ lệ chiều rộng */
}

</style>
    