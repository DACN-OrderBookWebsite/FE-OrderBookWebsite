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
          <h1 class="text-center">Thêm phân quyền mới</h1>
          <b-form @submit.prevent="confirmAndCreate">
            <b-form-group label="Nhóm:" label-for="input-role">
              <b-form-select
                id="input-role"
                v-model="data.idNhom"
                required
                :options="NhomOption"
              ></b-form-select>
              <small v-if="dataerror.name" class="text-danger">{{
                dataerror.idNhom
              }}</small>
            </b-form-group>

            <b-form-group label="Người dùng:" label-for="input-role">
              <b-form-select
                id="input-role"
                v-model="data.idQuyen"
                required
                :options="QuyenOption"
              ></b-form-select>
              <small v-if="dataerror.name" class="text-danger">{{
                dataerror.idQuyen
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
        idNhom: "",
        idQuyen: "",
      },
      dataerror: {
        idNhom: "",
        idQuyen: "",
      },
      NhomOption: [],
      QuyenOption: [],
      quyen: 5,
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.getRolePermission();
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
        await PhanQuyenService.insert(this.$axios, this.data);
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
    async getRolePermission() {
      try {
        const response = await PhanQuyenService.getPermission(this.$axios);
        this.NhomOption = response.data.Nhom.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
        this.QuyenOption = response.data.Quyen.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
      } catch (error) {
        console.error("Error while fetching create form:", error);
      }
    },
  },
  components: { AdminSection },
};
</script>

<style scoped>
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
.user-create-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
