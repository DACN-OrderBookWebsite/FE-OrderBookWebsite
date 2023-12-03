<template>
  <div>
    <Header></Header>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="6">
          <b-card class="mt-5">
            <b-card-title class="text-center">Chỉnh Sửa Người Dùng</b-card-title>
            <b-form @submit.prevent="confirmUpdate">

              <!-- Form fields -->
              <b-form-group label="Tên:" label-for="name-input">
                <b-form-input id="name-input" v-model="user.name" required></b-form-input>
              </b-form-group>

              <b-form-group label="Tên Đăng Nhập:" label-for="username-input">
                <b-form-input id="username-input" v-model="user.TenDangNhap" required></b-form-input>
              </b-form-group>

              <!-- Mật khẩu -->
<!--              <b-form-group>-->
<!--                <b-form-radio v-model="changePassword" name="changePassword" value="true">Thay đổi mật khẩu</b-form-radio>-->
<!--                <b-form-radio v-model="changePassword" name="changePassword" value="false">Không thay đổi mật khẩu</b-form-radio>-->
<!--              </b-form-group>-->

<!--              <b-form-group label="Mật Khẩu:" label-for="password-input" v-if="changePassword === 'true'">-->
<!--                <b-form-input type="password" id="password-input" v-model="user.MatKhau" required></b-form-input>-->
<!--              </b-form-group>-->

<!--              <b-form-group label="Xác Nhận Mật Khẩu:" label-for="confirm-password-input" v-if="changePassword === 'true'">-->
<!--                <b-form-input type="password" id="confirm-password-input" v-model="user.MatKhau_confirmation" required></b-form-input>-->
<!--              </b-form-group>-->

              <b-form-group label="SĐT:" label-for="phone-input">
                <b-form-input id="phone-input" v-model="user.SDT" required></b-form-input>
              </b-form-group>

              <b-form-group label="Địa Chỉ:" label-for="address-input">
                <b-form-input id="address-input" v-model="user.DiaChi" required></b-form-input>
              </b-form-group>

              <b-form-group label="Email:" label-for="email-input">
                <b-form-input type="email" id="email-input" v-model="user.Email" required></b-form-input>
              </b-form-group>

              <b-form-group label="Ngày Tạo:" label-for="created-date-input">
                <b-form-input id="created-date-input" v-model="user.NgayTao" disabled></b-form-input>
              </b-form-group>

              <b-form-group label="Ngày Thay Đổi:" label-for="modified-date-input">
                <b-form-input
                  id="modified-date-input"
                  :value="formattedModifiedDate"
                  v-model="user.NgayThayDoi"
                  disabled
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Giới Tính:" label-for="gender-input">
                <b-form-select id="gender-input" v-model="user.GioiTinh" :options="[{value: 0, text: 'Nữ'}, {value: 1, text: 'Nam'}]"></b-form-select>
              </b-form-group>

              <b-form-group label="Ảnh:" label-for="image-input">
                <b-form-file id="image-input" v-model="newAvatar" accept="image/*"></b-form-file>
              </b-form-group>

              <b-form-group label="Disabled:" label-for="disabled-input">
                <b-form-checkbox id="disabled-input" v-model="user.Disabled"></b-form-checkbox>
              </b-form-group>
              <!-- Chức Vụ -->
              <!-- Đây cần một danh sách chức vụ từ server hoặc dữ liệu tĩnh -->
              <b-form-group label="Chức Vụ:" label-for="input-role">
                <b-form-select
                  id="input-role"
                  v-model="user.idChucVu"
                  required
                  :options="roleOptions"
                ></b-form-select>
              </b-form-group>

              <b-button type="submit" variant="primary" block>Cập Nhật</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import adminService from '~/services/api/adminService';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import moment from 'moment';

export default {
  name: 'UserEdit',
  components: { Footer, Header },
  data() {
    return {
      user: {
        // Khởi tạo user
      },
      newAvatar: null,
      changePassword: 'false', // Ban đầu không thay đổi mật khẩu
      roleOptions: []
    };
  },
  async mounted() {
    await this.fetchUser();
    await this.getRolePermission();
  },
  computed: {
    formattedModifiedDate() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    async fetchUser() {
      try {
        const response = await adminService.getUserById(this.$axios, this.$route.params.id);
        this.user = response;
      } catch (error) {
        console.error(error);
      }
    },
    async getRolePermission() {
      try {
        const response = await adminService.getPermission(this.$axios);
        console.log(response)
        this.roleOptions = response.data.ChucVu.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
      } catch (error) {
        console.error("Error while fetching create form:", error);
      }
    },
    confirmUpdate() {
      Swal.fire({
        title: 'Xác nhận cập nhật',
        text: "Bạn có chắc chắn muốn cập nhật thông tin người dùng này?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, cập nhật!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(123);
          this.updateUser();
        }
      });
    },
    async updateUser() {
      try {
        if (this.newAvatar) {
          const formData = new FormData();
          formData.append('avatar', this.newAvatar);
          const response = await adminService.uploadUserAvatar(this.$axios, formData);
          this.user.Anh = response.data.newAvatarUrl;
        }

        // Kiểm tra xem người dùng có chọn thay đổi mật khẩu không
        if (this.changePassword === 'true') {
          // Xử lý thay đổi mật khẩu ở đây
          const passwordData = {
            MatKhau: this.user.MatKhau,
            MatKhauMoi: this.user.NewMatKhau,
            XacNhanMatKhauMoi: this.user.NewMatKhau_confirmation
          };
          await adminService.changeUserPassword(this.$axios, this.$route.params.id, passwordData);
        }

        // Sau khi xử lý xong các thay đổi, gửi dữ liệu user lên server để cập nhật
        await adminService.updateUser(this.$axios, this.$route.params.id, this.user);
        Swal.fire(
          'Cập nhật!',
          'Thông tin người dùng đã được cập nhật thành công.',
          'success'
        );
        this.$router.push('/admin/users');
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Lỗi!',
          'Có lỗi xảy ra khi cập nhật thông tin người dùng.',
          'error'
        );
      }
    }

  }
};
</script>

<style scoped>
/* Add your CSS here */
</style>
