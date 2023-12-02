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
          placeholder="Nhập tên đăng nhậps"
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

      <!-- Giới Tính -->
      <b-form-group label="Giới Tính:" label-for="input-gender">
        <b-form-select
          id="input-gender"
          v-model="newUser.GioiTinh"
          :options="[{ value: 0, text: 'Nam' }, { value: 1, text: 'Nữ' }]"
          required
        ></b-form-select>
      </b-form-group>

      <!-- Ảnh Đại Diện -->
      <!-- <b-form-group label="Ảnh Đại Diện:" label-for="input-avatar">
        <b-form-input
          id="input-avatar"
          v-model="newUser.Anh"
          required
          placeholder="Nhập URL ảnh"
        ></b-form-input>
      </b-form-group> -->

      <b-form-group label="Ảnh:" label-for="image-input">
        <b-form-file id="image-input" v-model="newAvatar" accept="image/*"></b-form-file>
        <img :src="newUser.Anh" alt="Ảnh người dùng" style="width: 50px; height: auto;">
      </b-form-group>

      <!-- Trạng Thái Hoạt Động -->
      <b-form-group label="Trạng Thái Hoạt Động:" label-for="input-disabled">
        <b-form-checkbox
          id="input-disabled"
          v-model="newUser.Disabled"
        >
          Disabled
        </b-form-checkbox>
      </b-form-group>

      <!-- Chức Vụ -->
      <!-- Đây cần một danh sách chức vụ từ server hoặc dữ liệu tĩnh -->
      <b-form-group label="Chức Vụ:" label-for="input-role">
        <b-form-select
          id="input-role"
          v-model="newUser.idChucVu"
          required
          :options="roleOptions"
        ></b-form-select>
      </b-form-group>

      <!-- Nút thêm người dùng -->
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
        name: "",
        TenDangNhap: "",
        MatKhau: "",
        MatKhau_confirmation: "",
        SDT: "",
        DiaChi: "",
        Email: "",
        NgayTao: new Date().toISOString().slice(0, 19).replace("T", " "), 
        NgayThayDoi: new Date().toISOString().slice(0, 19).replace("T", " "),
        GioiTinh: 0,
        Anh: null,
        Disabled: 0,
        idChucVu: 1
      },
      roleOptions: [
        // { value: 1, text: 'Chức Vụ 1' },
        // { value: 2, text: 'Chức Vụ 2' },
      ],
      newAvatar:null,
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
          'Thêm thành công!',
          'Người dùng đã được thêm.',
          'success'
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Thêm Thất Bại!',
          'Đã có lỗi xảy ra khi thêm người dùng.',
          'error'
        );
      }
    },
    async create() {
      try {
          const response = await userService.getCreateForm(this.$axios);
          this.roleOptions = response.ChucVu.map(item => {
              return {
                  value: item.value,
                  text: item.text
              };
          });
      } catch (error) {
          console.error('Error while fetching create form:', error);
      }
   }
  },
  async mounted() {
    await this.create();
  },
}
</script>

<style scoped>
.user-create-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
