<template>
  <div id="app">
    <Header> </Header>
    <hero-section></hero-section>

    <b-row class="text-section">
      <b-col md="6" class="text-section-container">
        <h1 class="text-huit">HUIT Zone EDU</h1>
        <p class="subtitle">Góc giáo trình HUIT</p>
        <p class="subtitle">Trọn bộ giáo trình Tân sinh viên</p>
        <p class="subtitle">Đại học không khó cùng HUITZone</p>
        <b-button variant="outline-primary" class="mt-3">Tìm hiểu thêm</b-button>
      </b-col>
      <b-col md="6" class="image-container">
        <!-- Image goes here, adjust path accordingly -->
        <b-img class="image-section" src="@/static/images/backgrounds/huitlibary.jpg" alt="HUIT Building"></b-img>
      </b-col>
    </b-row>

    <div class="book-section">
      <b-row class="book-container">
        <b-col cols="12" md="4" class="col-heigt">
          <div class="book-card">
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img class="card-image" src="@/static/images/backgrounds/imagebook.png"></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body class="card-body" title="Sách giáo trình đại cương">
                    <b-card-text class="sub-title">
                      Các đầu sách giáo trình Đại cương chính thống và cập nhật
                      mới nhất, đa dạng theo nhu cầu của sinh viên.
                    </b-card-text>
                    <b-button class="button-book" variant="outline-primary">Xem Thêm</b-button>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
        <b-col cols="12" md="4" class="col-heigt">
          <div class="book-card">
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img class="card-image" src="@/static/images/backgrounds/imagebook2.png"></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body class="card-body" title="Sách giáo trình theo ngành học">
                    <b-card-text class="sub-title">
                      Combo các loại sách giáo trình được thiết kế theo ngành
                      học, phù hợp với sinh viên có nhu cầu mua trọn bộ.
                    </b-card-text>
                    <b-button class="button-book" variant="outline-primary">Xem Thêm</b-button>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
        <!-- Repeat for second card -->
      </b-row>
    </div>

    <div class="slide-product">
      <h4 class="text-carousel">Các giáo trình phổ cập</h4>
      <h4 class="text-carousel-hero">
        Được sinh viên trường đại học công thương sử dụng rộng rãi
      </h4>
      <b-row class="per-page">
        <b-col v-for="book in paginatedBooks" :key="book.id" cols="12" md="3">
          <ProductCard :product="book"></ProductCard>
        </b-col>
      </b-row>
      <b-pagination v-model="currentPage" :total-rows="books.length" :per-page="perPage" aria-controls="my-table"
        class="per-page"></b-pagination>
    </div>
    <b-row class="text-section-hero">
      <b-col md="6" class="text-section-container">
        <h1 class="text-huit-hero">
          Vì sao nên mua giáo trình tại HUIT Zone ?
        </h1>
        <p class="subtitle">1. Chất lượng sách đảm bảo</p>
        <p class="subtitle">2. Sách chính hãng - Bản quyền</p>
        <p class="subtitle">3. Phân loại rõ ràng theo bậc học, khoa</p>
        <p class="subtitle">4. Có thể mua trực tuyến và tại trường HUIT</p>
        <b-button variant="outline-primary" class="mt-3">Tìm hiểu thêm</b-button>
      </b-col>
      <b-col md="6" class="image-container">
        <!-- Image goes here, adjust path accordingly -->
        <b-img class="image-section-hero" src="@/static/images/backgrounds/Unsplash.png" alt="HUIT Building"></b-img>
      </b-col>
    </b-row>
    <Footer> </Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "./user";
import Login from "./loginkeycloak";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import SachService from "../services/api/SachService";
import Swal from 'sweetalert2';

export default {
  name: "IndexPage",
  components: { ProductCard, HeroSection, Login, User, Footer, Header },
  data() {
    return {
      slide: 0,
      products: [
        // Mảng dữ liệu mẫu cho các sản phẩm
        {
          name: "Giáo Trình Nguyên Lý Kế Toán",
          image:
            "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          price: "40.00",
        },
        {
          name: "Giáo Trình Quản Trị Chiến Lược",
          image:
            "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          price: "38.00",
        },
        {
          name: "Thông Kê Trong Kinh Tế Và Kinh Doanh",
          image:
            "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          price: "45.00",
        },
        {
          name: "Giáo Trình Toán Rời Rạc",
          image:
            "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          price: "35.00",
        },
      ],
      books: [
        {
          id: 1,
          name: "Book Title 1",
          price: 19.99,
          stock: 10,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 1",
        },
        {
          id: 2,
          name: "Book Title 2",
          price: 29.99,
          stock: 5,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 2",
        },
        {
          id: 4,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 3",
        },
        {
          id: 5,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 3",
        },
        {
          id: 6,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 3",
        },
        {
          id: 7,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "http://localhost:3000/_nuxt/static/images/backgrounds/imagebook.png",
          description: "Description for product 3",
        },
        {
          id: 8,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 9,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
        {
          id: 310,
          name: "Book Title 3",
          price: 9.99,
          stock: 20,
          image: "path-to-image-3.jpg",
          description: "Description for product 3",
        },
      ],
      currentPage: 1,
      perPage: 15,
    };
  },
  computed: {
    chunkedProducts() {
      const chunkSize = 3;
      return this.products.reduce((acc, product, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = []; // start a new chunk
        }
        acc[chunkIndex].push(product);
        return acc;
      }, []);
    },
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
    async fetch() {
      try {
        const response = await SachService.getDataSortByTheLoai(this.$axios);
        this.books = response.data;
      }
      catch {
        console.log('fetch error');
      }
    },
    // addToCart(item) {
    //   const response = this.$cart.getCart();
    //   const existingItemIndex = response.findIndex(cartItem => cartItem.id === item.id);

    //   if (existingItemIndex !== -1) {
    //     Swal.fire(
    //         'Thông báo!',
    //         'Sản phẩm đã tồn tại trong giỏ hàng.',
    //         'warning'
    //       );
    //   } else {
    //     item.stock = 1;
    //     this.$cart.addToCart(item);
    //     Swal.fire(
    //         'Thông báo!',
    //         'Đã thêm sản phẩm vào giỏ hàng.',
    //         'success'
    //       );
    //   }
    // },
  }
};
</script>
<style>
body,
html {
  height: 100%;
  margin: 0;
}

.per-page {
  margin-top: 20px;
  justify-content: center;
}

.subtitle {
  color: rgba(0, 0, 0, 0.8);

  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 180%;
  /* 39.6px */
  letter-spacing: 0.88px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.text-huit {
  color: #0094ff;
  font-family: Inter;
  font-size: 60px;
  font-style: normal;
  font-weight: 600;
  line-height: 145%;
  /* 87px */
  letter-spacing: -1.2px;
  text-transform: capitalize;
}

.text-huit-hero {
  color: #0094ff;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 145%;
  /* 87px */
  letter-spacing: -1.2px;
  text-transform: capitalize;
}

.content {
  flex: 1;
  /* This allows the content to expand and push the footer down */
}

.text-carousel {
  color: #173f5f;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.874px;
  margin-left: 320px;
}

.text-carousel-hero {
  color: #173f5f;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.874px;
  margin-left: 320px;
}

.text-section {
  width: 1447px;
  height: 558px;
  background: linear-gradient(79deg,
      rgba(255, 255, 255, 0.11) -2.75%,
      #fff 20.07%,
      #fff 54.28%,
      #fff 101.59%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.text-section-hero {
  width: 1447px;
  height: 558px;
  background: #d7d7d7;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
}

.text-section-container {
  padding: 80px;
}

.image-container {
  padding: 0;
}

.image-section {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.overflow-hidden {
  height: 100%;
}

.book-container {
  justify-content: center;
  height: 100%;
}

.button-book {
  margin-top: 80px;
  max-width: 100%;
}

.book-section {
  background-color: #f8f9fa;
  padding: 1rem;
  height: 450px;
  margin-top: 50px;
}

.book-card {
  height: 100%;
}

.book-card .b-card-img {
  width: 40%;
  height: 40%;
}

.card-image {
  width: auto;
  height: auto;
}

.book-card .b-button {
  border-radius: 0;
}

.card-body {
  padding: 20px;
  color: #173f5f;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.874px;
}

.sub-title {
  color: #767070;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  /* 166.667% */
  letter-spacing: 1.289px;
}

.col-heigt {
  height: 100%;
}

.image-section-hero {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.slide-product {
  margin: 80px;
}

.product-carousel-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  height: 600px;
  margin-top: 120px;
}

.carousel-control-prev-icon {
  background-image: url("@/static/images/backgrounds/left-arrow-backup-2.svg");
}

.carousel-control-next-icon {
  background-image: url("@/static/images/backgrounds/right-arrow-svgrepo-com.svg");
}

.carousel-indicators {
  display: none;
}
</style>
