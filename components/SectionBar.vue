<template>
  <b-row class="blue-bar">
    <h1 class="mapPing">{{ activeSection }}</h1>
  </b-row>
</template>
  <script>
export default {
  name: "SectionBar",
  props: {
    currentRoute: String,
  },
  data() {
    return {
      // This will now be set based on the prop
      activeSection:
        this.currentRoute === "/"
          ? ""
          : `Trang Chủ > ${this.mapRouteToSection(this.currentRoute)}`,
    };
  },
  methods: {
    mapRouteToSection(route) {
      // Define a mapping from route to section name
      const routeSectionMapping = {
        "/GiaoTrinhDaiCuong": "Giáo Trình Đại Cương",
        "/GiaoTrinhTheoKhoa": "Giáo Trình Theo Khoa",
        "/GiaoTrinhDeThi": "Giáo Trình Đề Thi",
        "/contactUs": "Liên Hệ",
        "/loginkeycloak": "Đăng Nhập",
        "/shoppingCart": "Giỏ Hàng Của Bạn",
      };
      return routeSectionMapping[route] || "Không xác định";
    },
  },
  watch: {
    currentRoute(newValue) {
      // When the route changes, update the activeSection
      this.activeSection =
        newValue === "/"
          ? ""
          : `Trang Chủ > ${this.mapRouteToSection(newValue)}`;
    },
  },
};
</script>
  
<style>
.blue-bar {
  height: 60px; /* Adjust the height as needed */
  background-color: #007bff; /* This is a blue color, change hex code for your preferred shade of blue */
  max-width: 100%;
}
.mapPing {
  color: #fff;
  font-family: Josefin Sans;
  margin: 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.68px;
  text-transform: capitalize;
}
</style>