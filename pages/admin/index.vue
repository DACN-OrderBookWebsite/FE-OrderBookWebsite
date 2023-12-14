<template>
  <div>
    <Header></Header>
    <div>
      <b-container fluid>
        <AdminSection></AdminSection>
        <!-- Row for entire admin layout -->
        <b-row>

          <!-- Admin Sidebar -->
          <b-col cols="12" md="3" lg="2" className="admin-sidebar">
            <b-nav vertical className="flex-column">
              <nuxt-link to="/admin">Dashboard</nuxt-link>
              <nuxt-link to="/admin/users">Quản Lý Người Dùng</nuxt-link>
              <nuxt-link to="/admin/product">Quản Lý Sản Phẩm</nuxt-link>
              <nuxt-link to="/admin/ordermanagement">Quản Lý Đơn Hàng</nuxt-link>
              <nuxt-link to="/admin/importproduct">Nhập Sản Phẩm</nuxt-link>
              <!--            <nuxt-link to="/admin/logout">Logout</nuxt-link>-->
            </b-nav>
          </b-col>

          <!-- Main Content Area -->
          <b-col cols="12" md="9" lg="10" className="admin-content">
            <!-- Your admin page content goes here -->
            <router-view></router-view>
          </b-col>

        </b-row>
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
  middleware: 'auth',
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
