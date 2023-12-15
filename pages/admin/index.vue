<template>
  <div>
    <Header></Header>
    <div>
      <b-container fluid>
        <AdminSection></AdminSection>
      </b-container>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdminSection from "../../components/AdminSection.vue";
export default {
  name: 'Admin',
  components: {Footer, Header, AdminSection},
  // You may need to import additional components or functionality here
};
</script>

<style scoped>
.admin-sidebar {
  background-color: #343a40;
  border-right: 1px solid #e7e7e7;
  padding-top: 20px; /* Spacing from top */
  min-height: 100vh; /* Full height */
}

.admin-sidebar .nuxt-link {
  color: white;
}

.admin-sidebar .nuxt-link:hover,
.admin-sidebar .nuxt-link:focus {
  background-color: #495057;
}

.admin-sidebar .nuxt-link.active {
  background-color: #007bff;
  color: white;
}

.admin-content {
  padding: 20px; /* Content area padding */
  background-color: #f8f9fa;
  min-height: 100vh; /* Full height */
}

/* Add more styles as needed */
</style>
