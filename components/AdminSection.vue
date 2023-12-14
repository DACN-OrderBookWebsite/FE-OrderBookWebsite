<template>
    <div class="sidebar-main" :class="{ 'sidebar-open': isSidebarOpen }">
      <button @click="toggleSidebar" class="toggle-button">
        <i class="fa fa-bars"></i>
      </button>
      <div class="content" v-if="isSidebarOpen">
        <div class="menu-container">
          <nuxt-link v-for="(menu, index) in menuItems" :key="index" :to="{ path: `/admin/${menu.direction}` }">
            <b-card>
              <b-card-header v-b-toggle="menu.id">{{ menu.name }}</b-card-header>
              <b-collapse :id="menu.id">
                <b-card-body>{{ menu.name }}</b-card-body>
              </b-collapse>
            </b-card>
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import QuyenService from "../services/api/QuyenService";
  import SectionBar from "./SectionBar.vue";
  export default {
    components: { SectionBar },
    name: "HeroSection",
    // You can add your script here if needed
    data() {
      return {
        menuItems: [],
        isSidebarOpen: false,
      };
    },
    mounted() {
      this.fetchMenuItems();
    },
    methods: {
      async fetchMenuItems() {
        try {
          const items = await QuyenService.getData(this.$axios);
          this.menuItems = items.data;
        } catch (error) {
          console.error("Error fetching menu items", error);
        }
      },
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .link-to {
    text-decoration: none;
  }
  
  .sidebar-main {
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin: 10px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  
  .menu-container {
    max-height: 800px;
    /* Set the maximum height as per your design */
    overflow-y: auto;
    /* Enable vertical scrolling when content exceeds max height */
  }
  
  .sidebar-open {
    width: 250px;
  }
  
  .toggle-button {
    background-color: transparent;
    border: none;
    color: black;
    font-size: 24px;
    cursor: pointer;
    margin: 10px;
    align-self: flex-start;
  }
  
  .hero-section {
    padding: 40px 0;
    justify-content: center;
    text-align: center;
    background-color: #f8f9fa;
    /* Or any other background color you prefer */
  }
  
  .text-hero {
    color: #111;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 2.16px;
    text-transform: capitalize;
  }
  
  .text-section h1 {
    color: #004085;
    /* Or any other color you prefer */
    margin-bottom: 0.5rem;
  }
  
  .hero-section-col {
    justify-content: center;
  }
  
  .text-hero-support {
    color: #d1d1d1;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 2.16px;
    text-transform: capitalize;
  }
  
  .text-section .subtitle {
    font-size: 1.25rem;
    color: #007bff;
    /* Or any other color you prefer */
  }
  
  .text-section p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .image-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Customize Bootstrap button styles if needed */
  .btn-primary {
    background-color: #007bff;
    /* Or use your brand primary color */
    border-color: #007bff;
    /* Or use your brand primary color */
  }
  
  /* Customize the carousel indicators */
  .carousel-indicators li {
    background-color: #007bff;
    /* Or use your brand primary color */
  }
  
  /* Ensure your images in the carousel are displayed correctly */
  .b-carousel-slide {
    text-align: center;
  }
  
  .b-carousel-slide img {
    width: auto;
    max-height: 500px;
    /* Adjust this value based on your design */
    margin: 0 auto;
  }
  
  /* Additional responsive styles if needed */
  @media (max-width: 768px) {
    .hero-section {
      padding: 20px 0;
    }
  
    .text-section,
    .image-section {
      text-align: center;
    }
  
    .image-section {
      margin-top: 20px;
    }
  }
  </style>
  