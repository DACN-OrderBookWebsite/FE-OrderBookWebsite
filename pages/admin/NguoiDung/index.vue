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
        <aside class="page-wrapper">
          <div class="min-height container-fluid p-3">
            <div id="table_content">
              <div class="h1 text-center">Danh sách người dùng</div>
              <b-table :items="data" :fields="fields" class="text-center">
                <template #cell(Anh)="data">
                  <img
                    :src="data.item.Anh"
                    alt="Ảnh người dùng"
                    style="width: 50px; height: auto"
                  />
                </template>
                <template #cell(GioiTinh)="data">
                  <label>{{ formatGender(data.item.GioiTinh) }}</label>
                </template>
                <template #cell(Disabled)="data">
                  <label>{{ formatDisabled(data.item.Disabled) }}</label>
                </template>
                <template #cell(actions)="data">
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="edit(data.item.id)"
                    >Sửa</b-button
                  >
                  <b-button
                    size="sm"
                    variant="danger"
                    @click="confirmAndRemove(data.item.id)"
                    >Xóa</b-button
                  >
                  <b-button
                    size="sm"
                    variant="warning"
                    @click="confirmResetPassword(data.item)"
                    >Đặt lại mật khẩu</b-button
                  >
                </template>
              </b-table>
            </div>
          </div>
        </aside>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
<script>
import NguoiDungService from "~/services/api/NguoiDungService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import VerticalSidebar from "../../../layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";

export default {
  name: "NguoiDung",
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: [],
      fields: [
        { key: "name", label: "Tên" },
        { key: "TenDangNhap", label: "Tên đăng nhập" },
        { key: "SDT", label: "Số điện thoại" },
        { key: "DiaChi", label: "Địa chỉ" },
        { key: "Email", label: "Email" },
        { key: "nameOfChucVu", label: "Chức vụ" },
        { key: "GioiTinh", label: "Giới tính" },
        { key: "Anh", label: "Ảnh" },
        { key: "Disabled", label: "Hoạt động" },
        { key: "actions", label: "Hành Động" },
      ],
      quyen: 2,
    };
  },
  async mounted() {
    // await this.checkQuyen();
    await this.fetch();
  },
  computed: {},
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
    async fetch() {
      try {
        const response = await NguoiDungService.getNguoiDungAndChucVu(
          this.$axios
        );
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatGender(gender) {
      return gender === 1 ? "Female" : "Male";
    },
    formatDisabled(disabled) {
      return disabled === 1 ? true : false;
    },
    edit(id) {
      this.$router.push(`/admin/NguoiDung/edit/${id}`);
    },
    async confirmAndRemove(id) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Bạn sẽ không thể hoàn nguyên hành động này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
        cancelButtonText: "Không, hủy bỏ!",
      });

      if (result.isConfirmed) {
        this.remove(id);
      }
    },
    async remove(id) {
      try {
        await NguoiDungService.delete(this.$axios, id);
        await this.fetch();
        Swal.fire("Đã Xóa!", "Dữ liệu đã được xóa.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Xóa Thất Bại!",
          "Đã có lỗi xảy ra khi xóa dữ liệu.",
          "error"
        );
      }
    },
    formatDisabled(disabled) {
      return disabled === 1 ? "Bị khóa" : "Bình thường";
    },
    async confirmResetPassword(user) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn đặt lại mật khẩu?",
        text: "Bạn sẽ không thể hoàn nguyên hành động này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, thay đổi!",
        cancelButtonText: "Không, hủy bỏ!",
      });

      if (result.isConfirmed) {
        this.resetPassword(user);
      }
    },
    async resetPassword(user) {
      try {
        // console.log(22222, this.user)
        await NguoiDungService.resetPassword(
          this.$axios,
          user.id,
          user.TenDangNhap,
          user.TenDangNhap
        );
        Swal.fire(
          "Đã Thay Đổi!",
          "Mật khẩu mới là tên đăng nhập của tài khoản.",
          "success"
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Thay Đổi Thất Bại!",
          "Đã có lỗi xảy ra khi đặt lại mật khẩu.",
          "error"
        );
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
    background-color: #F1F1F1;
}
.sidebar-nav {
    margin-top: 15px;
    background-color: white;
}
.b-table {
  margin-top: 20px;
  /* Space above the table */
  background-color: white;
  /* Background color for the table */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: Adds shadow to the table */
  border-radius: 8px;
  /* Optional: Rounds the corners of the table */
}

</style>
  