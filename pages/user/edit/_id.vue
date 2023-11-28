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
        <select v-model="user.GioiTinh">
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </b-form-group>

      <!-- Ảnh -->
      <b-form-group label="Ảnh hiện tại:" label-for="input-current-avatar">
        <div>
          <b-img :src="currentAvatarSrc" alt="Ảnh người dùng" fluid></b-img>
        </div>
      </b-form-group>
      <b-form-group label="Ảnh mới:" label-for="input-new-avatar">
        <b-form-file
          id="input-new-avatar"
          v-model="newAvatar"
          :state="Boolean(newAvatar)"
          placeholder=""
          accept="image/*"
        ></b-form-file>
      </b-form-group>
      <!-- Trạng Thái Hoạt Động -->
      <b-form-group label="Trạng Thái Hoạt Động:" label-for="input-disabled">
        <b-form-checkbox
          id="input-disabled"
          v-model="user.Disabled"
          :true-value="1"
          :false-value="0"
        >
          Disabled
        </b-form-checkbox>
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
import Swal from 'sweetalert2';

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
      },
      newAvatar: null,
    };
  },
  created() {
    this.fetchUserData();
  },
  computed: {
    currentAvatarSrc() {
      return this.newAvatar ? URL.createObjectURL(this.newAvatar) : this.user.Anh;
    }
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
      const updateUser = () => {
        userService.updateUser(this.$axios, userId, this.user)
          .then(() => {
            Swal.fire(
              'Cập nhật thành công!',
              'Thông tin người dùng đã được cập nhật.',
              'success'
            );
            this.$router.push({ name: 'UserList' });
          })
          .catch(error => {
            console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);
          });
      };

      if (this.newAvatar) {
        userService.uploadUserAvatar(this.$axios, this.newAvatar)
          .then(response => {
            this.user.Anh = response.data.newAvatarUrl; // Cập nhật URL ảnh mới
            updateUser(); // Gọi cập nhật người dùng sau khi upload ảnh
          })
          .catch(error => {
            console.error("Có lỗi xảy ra khi upload ảnh:", error);
          });
      } else {
        updateUser(); // Gọi cập nhật người dùng nếu không có ảnh mới
      }
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
