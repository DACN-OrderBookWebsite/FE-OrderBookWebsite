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
          <h1 class="text-center">Thêm nhà cung cấp mới</h1>
          <b-form @submit.prevent="confirmAndCreate">
            <!-- Tên -->
            <b-form-group label="Tên:" label-for="input-name">
              <b-form-input
                id="input-name"
                v-model="data.name"
                required
                placeholder="Nhập tên"
              ></b-form-input>
              <small v-if="dataerror.name" class="text-danger">{{
                dataerror.name
              }}</small>
            </b-form-group>

            <!-- Số Điện Thoại -->
            <b-form-group label="SĐT:" label-for="input-phone">
              <b-form-input
                id="input-phone"
                v-model="data.SDT"
                required
                placeholder="Nhập số điện thoại"
              ></b-form-input>
              <small v-if="dataerror.SDT" class="text-danger">{{
                dataerror.SDT
              }}</small>
            </b-form-group>

            <!-- Địa Chỉ -->
            <b-form-group label="Địa Chỉ:" label-for="input-address">
              <b-form-input
                id="input-address"
                v-model="data.DiaChi"
                placeholder="Nhập địa chỉ"
              ></b-form-input>
              <small v-if="dataerror.DiaChi" class="text-danger">{{
                dataerror.DiaChi
              }}</small>
            </b-form-group>

            <!-- Email -->
            <b-form-group label="Email:" label-for="input-email">
              <b-form-input
                id="input-email"
                v-model="data.Email"
                required
                placeholder="Nhập email"
                type="email"
              ></b-form-input>
              <small v-if="dataerror.Email" class="text-danger">{{
                dataerror.Email
              }}</small>
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
import NhaCungCapService from "~/services/api/NhaCungCapService";
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
        SDT: "",
        DiaChi: "",
        Email: "",
      },
      dataerror: {
        name: "",
        SDT: "",
        DiaChi: "",
        Email: "",
      },
      roleOptions: [],
      quyen: 10,
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
        await NhaCungCapService.insert(this.$axios, this.data);
        Swal.fire("Thêm thành công!", "Dữ liệu đã được thêm.", "success");
      } catch (error) {
        this.dataerror = error.response.data.errors;
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
  