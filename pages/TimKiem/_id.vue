<template>
    <div id="app">
      <Header></Header>
      <b-row>
        <b-col cols="12" md="12">
          <b-row>
            <b-col v-for="book in paginatedBooks" :key="book.id" cols="12" md="3">
              <ProductCard :product="book"></ProductCard>
            </b-col>
          </b-row>
          <b-pagination v-model="currentPage" :total-rows="books.length" :per-page="perPage"
            aria-controls="my-table"></b-pagination>
        </b-col>
      </b-row>
      <Footer></Footer>
    </div>
  </template>
  <script>
  import ProductCard from "../../components/ProductCard";
  import HeroSection from "../../components/HeroSection";
  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import SachService from "../../services/api/SachService";
  export default {
    name: "TheLoai",
    components: { ProductCard, HeroSection, Header, Footer },
    data() {
      return {
        productName: "Tên Sản Phẩm",
        price: "100.000₫",
        publishYear: "2020",
        author: "Tên Tác Giả",
        publisher: "Nhà Xuất Bản",
        selected: null,
        selectedCheckBox: [], // Must be an array reference!
        optionsCheckBox: [
          { text: "Orange", value: "orange" },
          { text: "Apple", value: "apple" },
          { text: "Pineapple", value: "pineapple" },
          { text: "Grape", value: "grape" },
        ],
        options: [
          { value: 1, text: "Tên" },
          { value: 2, text: "Giá tăng dần" },
          { value: 3, text: "Giá giảm dần" },
        ],
        quantity: 1,
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
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
          {
            id: 1,
            name: "Book Title 1",
            price: 19.99,
            stock: 10,
            imageUrl: "path-to-image-1.jpg",
            description: "Description for product 1",
          },
        ],
        currentPage: 1,
        perPage: 15,
        selectedSort: 1
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
        const response = await SachService.search(this.$axios, this.$route.params.id);
        this.books = response.data;
      },
    },
  };
  </script>
      
  <style scoped>
  /* Đặt màu nền, font chữ cho toàn bộ trang */
  body {
    background-color: #f4f4f4;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .title-2 {
    padding: 20px;
  }
  
  .title-2 label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  .title-2 .b-form-select {
    display: inline-block;
    margin-right: 20px;
    width: auto;
  }
  
  /* CSS cho icon chuyển đổi hiển thị */
  .view-icon {
    cursor: pointer;
    margin-left: 10px;
    font-size: 20px;
  }
  
  .grid-view i {
    color: blue;
    /* Màu cho icon dạng lưới */
  }
  
  .list-view i {
    color: green;
    /* Màu cho icon dạng danh sách */
  }
  
  .section-title {
    margin-top: 40px;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .title {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    border: 1px solid #9da2a6;
    text-align: center;
    justify-content: center;
  }
  
  .title-2 {
    width: 90%;
    display: inline-flex;
    border: 1px solid #9da2a6;
    text-align: center;
    justify-content: space-evenly;
  }
  
  .title-3 {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
  }
  
  /* Định dạng tiêu đề các phần, ví dụ như các tiêu đề của cột bên trái */
  h1 {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .button-title {
    max-width: 100%;
    color: var(--color-text-color, #1a1a1a);
    margin-top: 1rem;
    font-family: Josefin Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    text-transform: capitalize;
  }
  
  /* Định dạng cho các card sản phẩm */
  .product-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .product-card img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.5rem;
  }
  
  .product-card h2 {
    font-size: 1rem;
    color: #007bff;
    margin-bottom: 0.25rem;
  }
  
  .product-card p {
    font-size: 0.875rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .product-card .price {
    color: #28a745;
    font-weight: bold;
  }
  
  /* Định dạng cho phân trang */
  .b-pagination {
    justify-content: center;
    padding-top: 1rem;
  }
  
  /* Định dạng cho header và footer */
  header,
  footer {
    background-color: #333;
    color: white;
    padding: 1rem 0;
    text-align: center;
  }
  
  /* Phần bên trái với các lọc */
  .filters {
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .filters label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .filters input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  /* Tùy chỉnh các khoảng cách và padding cho toàn bộ layout */
  .container {
    padding: 2rem;
  }
  
  .row {
    margin-bottom: 1rem;
  }
  
  .col-md-3 {
    padding-right: 1rem;
  }
  
  .col-md-9 {
    padding-left: 1rem;
  }
  
  /* Đảm bảo các card có khoảng cách đều nhau */
  .row>[class^="col-"] {
    padding: 0 0.5rem;
    margin-bottom: 1rem;
  }
  </style>
      