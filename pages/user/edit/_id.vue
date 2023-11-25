<template>
  <div class="user-edit-container">
    <h1>Chỉnh Sửa Người Dùng</h1>
    <b-form @submit.prevent="confirmAndUpdate">
      <!-- Tên Người Dùng -->
      <b-form-group label="Tên Người Dùng:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="user.name"
          required
          placeholder="Nhập tên"
        ></b-form-input>
      </b-form-group>

      <!-- Tên Đăng Nhập -->
      <b-form-group label="Tên Đăng Nhập:" label-for="input-username">
        <b-form-input
          id="input-username"
          v-model="user.TenDangNhap"
          required
          placeholder="Nhập tên đăng nhập"
        ></b-form-input>
      </b-form-group>

      <!-- Số Điện Thoại -->
      <b-form-group label="SĐT:" label-for="input-phone">
        <b-form-input
          id="input-phone"
          v-model="user.SDT"
          required
          placeholder="Nhập số điện thoại"
        ></b-form-input>
      </b-form-group>

      <!-- Địa Chỉ -->
      <b-form-group label="Địa Chỉ:" label-for="input-address">
        <b-form-input
          id="input-address"
          v-model="user.DiaChi"
          placeholder="Nhập địa chỉ"
        ></b-form-input>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email:" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="user.Email"
          required
          placeholder="Nhập email"
          type="email"
        ></b-form-input>
      </b-form-group>

      <!-- Giới Tính -->
      <b-form-group label="Giới Tính:" label-for="input-gender">
        <b-form-input
          id="input-gender"
          v-model="user.GioiTinh"
          placeholder="Nhập giới tính"
        ></b-form-input>
      </b-form-group>

      <!-- Ảnh -->
      <b-form-group label="Ảnh:" label-for="input-avatar">
        <b-form-input
          id="input-avatar"
          v-model="user.Anh"
          placeholder="Nhập URL ảnh"
        ></b-form-input>
      </b-form-group>

      <!-- Disabled -->
      <b-form-group label="Disabled:" label-for="input-disabled">
        <b-form-input
          id="input-disabled"
          v-model="user.Disabled"
          placeholder="Nhập Disabled"
        ></b-form-input>
      </b-form-group>

      <!-- idChucVu -->
      <b-form-group label="ID Chức Vụ:" label-for="input-role">
        <b-form-input
          id="input-role"
          v-model="user.idChucVu"
          placeholder="Nhập ID Chức Vụ"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Lưu Thay Đổi</b-button>
    </b-form>
  </div>
</template>

<script>
import userService from '~/services/api/userService';

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
      }
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = this.$route.params.id;
      try {
        const user = await userService.getUserById(this.$axios, userId);
        this.user = user;
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
        // Xử lý lỗi hoặc hiển thị thông báo
      }
    },
    confirmAndUpdate() {
      Swal.fire({
        title: 'Bạn có chắc muốn cập nhật thông tin này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cập nhật',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          this.onSubmit();
        }
      });
    },
    onSubmit() {
      const userId = this.$route.params.id;
      userService.updateUser(userId, this.user)
        .then(() => {
          Swal.fire(
            'Cập nhật thành công!',
            'Thông tin người dùng đã được cập nhật.',
            'success'
          );
          this.$router.push({ name: 'UserList' }); // Điều hướng về danh sách người dùng sau khi cập nhật
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);
          // Xử lý lỗi hoặc hiển thị thông báo
        });
    }
  }
}
</script>

<style scoped>
.user-edit-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
