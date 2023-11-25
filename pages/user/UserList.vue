<template>
  <div class="page-container">
    <Header />
    <div>
      <b-table :items="users" :fields="fields" responsive>
        <template #cell(Anh)="data">
          <img :src="data.item.Anh" alt="Ảnh người dùng" style="width: 50px; height: auto;">
        </template>
        <template #cell(GioiTinh)="data">
          {{ formatGender(data.item.GioiTinh) }}
        </template>
        <template #cell(actions)="data">
          <nuxt-link :to="`/user/edit/${data.item.id}`">Sửa</nuxt-link>
          <b-button variant="danger" @click="confirmAndRemoveUser(data.item.id)">Xóa</b-button>
        </template>
      </b-table>
      <nuxt-link :to="`/user/create`"><b-button variant="success">Thêm Người Dùng</b-button></nuxt-link>


    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header';
import Footer from "~/components/Footer";
import userService from '~/services/api/userService';
import Swal from 'sweetalert2';

export default {
  name: "User",
  components: {Footer, Header},
  data() {
    return {
      users: [],
      fields: [
        { key: 'name', label: 'Tên' },
        { key: 'TenDangNhap', label: 'Tên Đăng Nhập' },
        { key: 'SDT', label: 'SĐT' },
        { key: 'DiaChi', label: 'Địa Chỉ' },
        { key: 'Email', label: 'Email' },
        { key: 'NgayTao', label: 'Ngày Tạo' },
        { key: 'NgayThayDoi', label: 'Ngày Thay Đổi' },
        { key: 'GioiTinh', label: 'Giới Tính' },
        { key: 'Anh', label: 'Ảnh' },
        { key: 'Disabled', label: 'Disabled' },
        { key: 'idChucVu', label: 'ID Chức Vụ' },
        { key: 'actions', label: 'Hành Động' }
      ]
    }
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await userService.getAllUsers(this.$axios);
      } catch (error) {
        console.error(error);
      }
    },
    async addUser(userData) {
      try {
        await userService.createUser(this.$axios, userData);
        this.fetchUsers();
      } catch (error) {
        console.error(error);
      }
    },
    async editUser(userId, userData) {
      try {
        await userService.updateUser(this.$axios, userId, userData);
        this.fetchUsers();
      } catch (error) {
        console.error(error);
      }
    },
    async confirmAndRemoveUser(userId) {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        text: 'Bạn sẽ không thể hoàn nguyên hành động này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, xóa nó!',
        cancelButtonText: 'Không, hủy bỏ!'
      });

      if (result.isConfirmed) {
        this.removeUser(userId);
      }
    },
    formatGender(gender) {
      return gender === 1 ? 'Female' : 'Male';
    },
    async removeUser(userId) {
      try {
        await userService.deleteUser(this.$axios, userId);
        this.fetchUsers();
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
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>

</style>
