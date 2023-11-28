<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Secondary Header for Sorting -->
    <b-navbar type="light" variant="light">
      <b-form-select v-model="sortKey" @change="sortProducts" class="ml-auto" :options="sortOptions"></b-form-select>
    </b-navbar>

    <!-- Main Content Area -->
    <b-container fluid>
      <b-row>

        <!-- Sidebar with Filters -->
        <b-col cols="3">
          <!-- Filters -->
          <b-form-group label="Filter by Brand:">
            <b-form-radio-group v-model="filters.brand">
              <!-- Generate radio buttons from an array of brands -->
              <b-form-radio v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Filter by Brand:">
            <b-form-radio-group v-model="filters.brand">
              <!-- Generate radio buttons from an array of brands -->
              <b-form-radio v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Filter by Brand:">
            <b-form-radio-group v-model="filters.brand">
              <!-- Generate radio buttons from an array of brands -->
              <b-form-radio v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Filter by Brand:">
            <b-form-radio-group v-model="filters.brand">
              <!-- Generate radio buttons from an array of brands -->
              <b-form-radio v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Filter by Brand:">
            <b-form-radio-group v-model="filters.brand">
              <!-- Generate radio buttons from an array of brands -->
              <b-form-radio v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <!-- More filters can be added similarly -->
        </b-col>

        <!-- Product Listings -->
        <b-col cols="9">
          <b-row>
            <!-- Product Component -->
            <b-col lg="2" md="4" sm="6" v-for="product in sortedProducts" :key="product.id">
              <ProductCard :product="product" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Import the ProductCard component
import ProductCard from '~/components/ProductCard';
import Header from "~/components/Header";

export default {
  components: {
    Header,
    ProductCard
  },
  data() {
    return {
      sortKey: 'price',
      sortOptions: [
        { value: 'price', text: 'Sort by Price' },
        { value: 'stock', text: 'Sort by Stock' }
      ],
      filters: {
        brand: null
      },
      brands: ['Penguin', 'HarperCollins', 'Random House'],
      products: [
        { id: 1, name: 'Book Title 1', price: 19.99, stock: 10, imageUrl: 'path-to-image-1.jpg', description: 'Description for book 1' },
        { id: 2, name: 'Book Title 2', price: 29.99, stock: 5, imageUrl: 'path-to-image-2.jpg', description: 'Description for book 2' },
        { id: 3, name: 'Book Title 3', price: 9.99, stock: 20, imageUrl: 'path-to-image-3.jpg', description: 'Description for book 3' }
        // Add more books as needed
      ]
    };
  },
  computed: {
    sortedProducts() {
      return [...this.products].sort((a, b) => {
        if (this.sortKey === 'price') {
          return a.price - b.price;
        } else if (this.sortKey === 'stock') {
          return b.stock - a.stock;
        }
      });
    }
  },
  methods: {
    sortProducts() {
      // Sorting logic is handled in the computed property
    }
  }
};
</script>

<style scoped>
/* Scoped styles for your component */

.navbar-dark .navbar-brand {
  color: white;
}

.navbar-light {
  background-color: #f8f9fa;
}

.sidebar-filters {
  border-right: 1px solid #ddd;
  padding-right: 15px;
}

.product-grid {
  margin-top: 15px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  transition: box-shadow .3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
}

.mt-3 {
  margin-top: 1rem;
}

.ml-auto {
  margin-left: auto;
}
</style>
