<template>
  <div>
    <!-- Top Bar with Social Icons and Phone Number -->
    <b-row class="top-bar">
      <b-col cols="6" class="social-icons">
        <b-icon icon="facebook" class="social-icon"></b-icon>
        <b-icon icon="twitter" class="social-icon"></b-icon>
        <b-icon icon="instagram" class="social-icon"></b-icon>
        <!-- Add more social icons as needed -->
      </b-col>
      <b-col cols="6" class="text-right">
        <span class="phone-number">+123 456 7890</span>
      </b-col>
    </b-row>

    <!-- Main Header with Logo, Search Bar, Account and Cart -->
    <b-row class="main-header align-items-center">
      <b-col cols="4" class="logo-container">
        <img src="@/static/images/backgrounds/banner.jpg" alt="Bookstore Logo" class="logo" />
      </b-col>
      <b-col cols="4">
        <b-input-group>
          <b-form-input placeholder="Search for books, authors, or ISBN"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-secondary"><b-icon icon="search"></b-icon></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="4" class="text-right">
        <nuxt-link to="/admin"><b-icon>Admin</b-icon></nuxt-link>
        <b-icon icon="person" class="header-icon"></b-icon>
        <b-icon icon="cart" class="header-icon"></b-icon>
        <!-- Add more icons or links as needed -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  // If you have custom icons, import them here
};
</script>

<style scoped>
.top-bar {
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
}

.social-icons .social-icon {
  margin-right: 0.5rem;
  cursor: pointer;
  /* Add more styling for social icons here */
}

.phone-number {
  /* Style for phone number */
}

.main-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.logo-container .logo {
  max-width: 100%;
  height: auto;
  /* Adjust the size of the logo as needed */
}

.header-icon {
  margin-left: 1rem;
  cursor: pointer;
  /* Style for header icons */
}

/* Add responsive or additional styles as needed */
</style>
