<template>
  <div class="body-container">
    <Header></Header>
    <SectionBar></SectionBar>
    <b-row>
      <b-col cols="12" md="2" class="sidebar-nav">
        <div class="position-sticky top-0">
          <VerticalSidebar />
        </div>
      </b-col>
      <b-col cols="12" md="10">
        <div class="user-create-container container-fluid">
          <h1 class="text-center">Thêm Chức vụ mới</h1>
          <b-form @submit.prevent="confirmAndCreate">
            <!-- Tên Người Dùng -->
            <b-form-group label="Tên:" label-for="input-name">
              <b-form-input
                id="input-name"
                v-model="data.name"
                required
                placeholder="Nhập tên"
              ></b-form-input>
            </b-form-group>

            <!-- Nút thêm -->
            <b-button type="submit" variant="primary">Thêm</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
<script>
import NhomService from "~/services/api/NhomService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import Swal from "sweetalert2";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: {
        name: "",
      },
      roleOptions: [],
      quyen: 3,
    };
  },
  async mounted() {
    await this.checkQuyen();
  },
  methods: {
    async checkQuyen() {
      const response = this.$login.getLogin();
      if (response.length === 0) {
        this.$router.push("/loginkeycloak");
      } else {
        const kq = await PhanQuyenService.checkQuyen(
          this.$axios,
          response[0].id,
          this.quyen
        );
        console.log(kq.data.result);
        if (kq.data.result === false) {
          this.$router.push("/");
        }
      }
    },
    async confirmAndCreate() {
      const confirmResult = await Swal.fire({
        title: "Xác nhận thêm?",
        text: "Bạn có chắc muốn thêm?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Thêm",
        cancelButtonText: "Hủy",
      });
      if (confirmResult.isConfirmed) {
        this.create();
      }
    },
    async create() {
      try {
        await NhomService.insert(this.$axios, this.data);
        Swal.fire("Thêm thành công!", "Dữ liệu đã được thêm.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Thêm Thất Bại!",
          "Đã có lỗi xảy ra khi thêm dữ liệu.",
          "error"
        );
      }
    },
  },
};
</script>
  
<style scoped>
.user-create-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
#table_content {
  background-color: white;
}
.body-container {
  background-color: #f1f1f1;
}
.sidebar-nav {
  margin-top: 15px;
  background-color: white;
}
.container-fluid {
  background-color: white;
}
</style>
  