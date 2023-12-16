<template>
  <div class="body-container">
    <Header></Header>
    <SectionBar></SectionBar>
    <b-row>
      <b-col cols="12" md="2" class="p-1 sidebar-nav">
        <div class="position-sticky top-0">
          <VerticalSidebar />
        </div>
      </b-col>
      <b-col cols="12" md="10">
        <b-container>
          <b-row class="justify-content-md-center">
            <b-col md="6">
              <b-card class="mt-5">
                <b-card-title class="text-center">Chỉnh Sửa quyền</b-card-title>
                <b-form @submit.prevent="confirmUpdate">
                  <!-- Form fields -->
                  <b-form-group label="Tên:" label-for="name-input">
                    <b-form-input
                      id="name-input"
                      v-model="data.name"
                      required
                    ></b-form-input>
                    <small v-if="dataerror.name" class="text-danger">{{
                      dataerror.name
                    }}</small>
                  </b-form-group>

                  <b-button type="submit" variant="primary" block
                    >Cập Nhật</b-button
                  >
                </b-form>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
  <script>
import Swal from "sweetalert2";
import QuyenService from "~/services/api/QuyenService";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import moment from "moment";

export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: {},
      dataerror: {
        name: "",
      },
    };
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const response = await QuyenService.getItem(
          this.$axios,
          this.$route.params.id
        );
        this.data = response;
      } catch (error) {
        console.error(error);
      }
    },
    confirmUpdate() {
      Swal.fire({
        title: "Xác nhận cập nhật",
        text: "Bạn có chắc chắn muốn cập nhật thông tin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, cập nhật!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(123);
          this.update();
        }
      });
    },
    async update() {
      try {
        await QuyenService.update(
          this.$axios,
          this.$route.params.id,
          this.data
        );
        Swal.fire(
          "Cập nhật!",
          "Thông tin đã được cập nhật thành công.",
          "success"
        );
        this.$router.push("/admin/Quyen");
      } catch (error) {
        this.dataerror = error.response.data.errors;
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật thông tin.", "error");
      }
    },
  },
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
</style>
  