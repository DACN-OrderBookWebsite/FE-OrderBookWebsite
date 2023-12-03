<template>
  <div>
    <Header></Header>
    <b-button @click="addUser">Thêm Người Dùng</b-button>
    <div id="table_content">
      <b-table :items="users" :fields="fields" >
        <template #cell(Anh)="data">
          <img :src="data.item.Anh" alt="Ảnh người dùng" style="width: 50px; height: auto;">
        </template>
        <template #cell(actions)="data">
          <b-button size="sm" variant="primary" @click="editUser(data.item.id)">Sửa</b-button>
          <b-button size="sm" variant="danger" @click="confirmAndRemoveUser(data.item.id)">Xóa</b-button>
          <b-button size="sm" variant="warning" @click="confirmResetPassword(data.item.id)">Đặt lại mật khẩu</b-button>
        </template>
      </b-table>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import adminService from '~/services/api/adminService';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";

export default {
  components: {Footer, Header},
  data() {
    return {
      users: [],
      user: {},
      fields: [
        { key: 'name', label: 'Tên' },
        { key: 'SDT', label: 'SĐT' },
        { key: 'DiaChi', label: 'Địa Chỉ' },
        { key: 'Email', label: 'Email' },
        { key: 'GioiTinh', label: 'Giới Tính' },
        { key: 'Anh', label: 'Ảnh' },
        { key: 'Disabled', label: 'Disabled' },
        { key: 'idChucVu', label: 'ID Chức Vụ' },
        { key: 'actions', label: 'Hành Động' }
      ]
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  computed: {
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminService.getUsers(this.$axios);
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    addUser() {
      this.$router.push('/admin/users/create');
    },
    editUser(id) {
      this.$router.push(`/admin/users/edit/${id}`);
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
        await adminService.deleteUser(this.$axios, userId);
        await this.fetchUsers();
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
    },
    async confirmResetPassword(userId) {
      await this.getUserId(userId);
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn đặt lại mật khẩu?',
        text: 'Bạn sẽ không thể hoàn nguyên hành động này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, thay đổi!',
        cancelButtonText: 'Không, hủy bỏ!'
      });

      if (result.isConfirmed) {
        this.resetPassword(userId);
      }
    },
    async getUserId (userId){
      const response = await adminService.getUserById(this.$axios, userId);
      this.user = response;
      console.log(response)
    },
    async resetPassword(userId) {
      try {
        console.log(22222, this.user)
        await adminService.resetPassword(this.$axios, userId, this.user.TenDangNhap, this.user.TenDangNhap);
        Swal.fire(
          'Đã Thay Đổi!',
          'Mật khẩu mới là tên đăng nhập của tài khoản.',
          'success'
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Thay Đổi Thất Bại!',
          'Đã có lỗi xảy ra khi đặt lại mật khẩu.',
          'error'
        );
      }
    },
  }
};
</script>

<style scoped>
#table_content {
  padding: 0 60px; /* 30px padding on both sides */
}

/* Additional styling for the table */
.b-table {
  margin-top: 20px; /* Space above the table */
  background-color: white; /* Background color for the table */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Optional: Adds shadow to the table */
  border-radius: 8px; /* Optional: Rounds the corners of the table */
}
</style>
