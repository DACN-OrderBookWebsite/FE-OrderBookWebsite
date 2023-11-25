<template>
  <div class="user-create-container">
    <h1>Thêm Người Dùng Mới</h1>
    <b-form @submit.prevent="confirmAndCreateUser">
      <!-- Tên Người Dùng -->
      <b-form-group label="Tên Người Dùng:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="newUser.name"
          required
          placeholder="Nhập tên"
        ></b-form-input>
      </b-form-group>

      <!-- Tên Đăng Nhập -->
      <b-form-group label="Tên Đăng Nhập:" label-for="input-username">
        <b-form-input
          id="input-username"
          v-model="newUser.TenDangNhap"
          required
          placeholder="Nhập tên đăng nhập"
        ></b-form-input>
      </b-form-group>

      <!-- Mật Khẩu -->
      <b-form-group label="Mật Khẩu:" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="newUser.MatKhau"
          required
          placeholder="Nhập mật khẩu"
          type="password"
        ></b-form-input>
      </b-form-group>

      <!-- Xác Nhận Mật Khẩu -->
      <b-form-group label="Xác Nhận Mật Khẩu:" label-for="input-password-confirm">
        <b-form-input
          id="input-password-confirm"
          v-model="newUser.MatKhau_confirmation"
          required
          placeholder="Xác nhận mật khẩu"
          type="password"
        ></b-form-input>
      </b-form-group>

      <!-- Số Điện Thoại -->
      <b-form-group label="SĐT:" label-for="input-phone">
        <b-form-input
          id="input-phone"
          v-model="newUser.SDT"
          required
          placeholder="Nhập số điện thoại"
        ></b-form-input>
      </b-form-group>

      <!-- Địa Chỉ -->
      <b-form-group label="Địa Chỉ:" label-for="input-address">
        <b-form-input
          id="input-address"
          v-model="newUser.DiaChi"
          placeholder="Nhập địa chỉ"
        ></b-form-input>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email:" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="newUser.Email"
          required
          placeholder="Nhập email"
          type="email"
        ></b-form-input>
      </b-form-group>

      <!-- Các trường thông tin khác tương tự -->

      <b-button type="submit" variant="primary">Thêm Người Dùng</b-button>
    </b-form>
  </div>
</template>

<script>
import userService from '~/services/api/userService';
import Swal from 'sweetalert2';

export default {
  name: "UserCreate",
  data() {
    return {
      newUser: {
        id: 4,
        name: "Elinor Gottlieb",
        TenDangNhap: "zackery24",
        MatKhau: "$2y$10$2qCFQmWB.C6fKNOT/uPrj.TfxaoVV3PIBtbEKtDGCSNrNQAtXz28a",
        SDT: "(769) 810-9054",
        DiaChi: "29166 Hirthe View Suite 457\nWest Glenmouth, IL 14806",
        Email: "sam.langworth@example.com",
        NgayTao: "2023-11-22 14:11:33",
        NgayThayDoi: "2023-11-22 14:11:33",
        GioiTinh: 0,
        Anh: "https://via.placeholder.com/640x480.png/00dd00?text=eum",
        Disabled: 0,
        idChucVu: 14
      }
    };
  },
  methods: {
    async confirmAndCreateUser() {
      const confirmResult = await Swal.fire({
        title: 'Xác nhận thêm người dùng?',
        text: 'Bạn có chắc muốn thêm người dùng này?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Thêm',
        cancelButtonText: 'Hủy'
      });

      if (confirmResult.isConfirmed) {
        this.createUser();
      }
    },
    async createUser() {
      try {
        await userService.createUser(this.$axios, this.newUser);
        Swal.fire(
          'Đã Xóa!',
          'Người dùng đã được xóa.',
          'success'
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Xóa Thất Bại!',
          'Đã có lỗi xảy ra khi xóa người dùng.',
          'error'
        );
      }
    }
  }
}
</script>

<style scoped>
.user-create-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
