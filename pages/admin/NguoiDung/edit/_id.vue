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
        <div class="user-create-container container-fluid border">
          <h1 class="text-center">Sửa thông tin người dùng</h1>
          <b-form @submit.prevent="confirmUpdate">
            <!-- Tên -->
            <b-form-group label="Tên:" label-for="input-name">
              <b-form-input
                id="input-name"
                v-model="data.name"
                required
                placeholder="Nhập tên"
              ></b-form-input>
              <small v-if="dataerror.name" class="text-danger">{{
                dataerror.name
              }}</small>
            </b-form-group>

            <!-- Tên đăng nhập -->
            <b-form-group label="Tên đăng nhập:" label-for="input-TenDangNhap">
              <b-form-input
                id="input-TenDangNhap"
                v-model="data.TenDangNhap"
                required
                placeholder="Nhập tên đăng nhập"
              ></b-form-input>
              <small v-if="dataerror.TenDangNhap" class="text-danger">{{
                dataerror.TenDangNhap
              }}</small>
            </b-form-group>

            <!-- Số điện thoại -->
            <b-form-group label="Số điện thoại:" label-for="input-phone">
              <b-form-input
                id="input-phone"
                v-model="data.SDT"
                required
                placeholder="Nhập số điện thoại"
              ></b-form-input>
              <small v-if="dataerror.SDT" class="text-danger">{{
                dataerror.SDT
              }}</small>
            </b-form-group>

            <!-- Địa chỉ -->
            <b-form-group label="Địa chỉ:" label-for="input-address">
              <b-form-input
                id="input-address"
                v-model="data.DiaChi"
                required
                placeholder="Nhập địa chỉ"
              ></b-form-input>
              <small v-if="dataerror.DiaChi" class="text-danger">{{
                dataerror.DiaChi
              }}</small>
            </b-form-group>

            <!--Email -->
            <b-form-group label="Email:" label-for="input-email">
              <b-form-input
                id="input-email"
                v-model="data.Email"
                required
                placeholder="Nhập Email"
              ></b-form-input>
              <small v-if="dataerror.Email" class="text-danger">{{
                dataerror.Email
              }}</small>
            </b-form-group>

            <!-- Giới Tính -->
            <b-form-group label="Giới tính:" label-for="input-GioiTinh">
              <b-form-select
                id="input-GioiTinh"
                v-model="data.GioiTinh"
                required
                :options="[
                  { value: 0, text: 'Nam' },
                  { value: 1, text: 'Nữ' },
                ]"
                class="max-width-select"
              ></b-form-select>
              <small v-if="dataerror.GioiTinh" class="text-danger">{{
                dataerror.GioiTinh
              }}</small>
            </b-form-group>

            <!-- Trạng Thái Hoạt Động -->
            <b-form-group
              label="Trạng Thái Hoạt Động:"
              label-for="input-disabled"
            >
              <b-form-checkbox
                id="input-disabled"
                v-model="data.Disabled"
                :value="1"
                :unchecked-value="0"
              >
                Khóa tài khoản:
              </b-form-checkbox>
            </b-form-group>

            <!-- Chức vụ -->
            <b-form-group label="Chức vụ:" label-for="input-ChucVu">
              <b-form-select
                id="input-ChucVu"
                v-model="data.idChucVu"
                required
                :options="ChucVuOption"
                class="max-width-select"
              ></b-form-select>
              <small v-if="dataerror.idChucVu" class="text-danger">{{
                dataerror.idChucVu
              }}</small>
            </b-form-group>

            <!-- Ảnh -->
            <b-form-group label="Ảnh:" label-for="image-input">
              <b-form-file
                id="image-input"
                v-model="data.Anh"
                accept="image/*"
                @change="getAnh"
              ></b-form-file>
              <img :src="data.Anh" alt="Ảnh" class="max-width-height-picture" />
            </b-form-group>

            <!-- Nút thêm -->
            <div class="d-flex">
              <b-button type="submit" variant="primary">Cập nhật</b-button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>

<script>
import NguoiDungService from "~/services/api/NguoiDungService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import PictureService from "~/services/api/PictureService";
import Swal from "sweetalert2";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import moment from "moment";
export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: {},
      dataerror: {
        name: "",
        TenDangNhap: "",
        MatKhau: "",
        SDT: "",
        DiaChi: "",
        Email: "",
        NgayTao: "",
        NgayThayDoi: "",
        GioiTinh: "",
        Anh: "",
        Disabled: "",
        idChucVu: "",
      },
      ChucVuOption: [],
      quyen: 2,
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.fetch();
    await this.getEdit();
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
    async fetch() {
      try {
        const response = await NguoiDungService.getItem(
          this.$axios,
          this.$route.params.id
        );
        this.data = response;
      } catch (error) {
        console.error(error);
      }
    },
    formattedModifiedDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
          console.log(this.data);
          this.update();
        }
      });
    },
    async update() {
      try {
        this.NgayThayDoi = this.formattedModifiedDate(this.NgayThayDoi);
        await NguoiDungService.update(
          this.$axios,
          this.$route.params.id,
          this.data
        );
        Swal.fire(
          "Cập nhật!",
          "Thông tin đã được cập nhật thành công.",
          "success"
        );
        this.$router.push("/admin/NguoiDung");
      } catch (error) {
        this.dataerror = error.response.data.errors;
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật thông tin.", "error");
      }
    },
    async getEdit() {
      try {
        const response = await NguoiDungService.getEdit(
          this.$axios,
          this.$route.params.id
        );
        this.ChucVuOption = response.data.ChucVu.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
      } catch (error) {
        console.error("Error while fetching create form:", error);
      }
    },
    async getAnh(event) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        // Lấy tên của tệp
        const file = fileInput.files[0];
        // Lưu đối tượng File vào this.data.Anh nếu cần thiết
        this.data.Anh = file.name;
        const response = await PictureService.getNguoiDungPicture(
          this.data.Anh
        );
        this.data.Anh = response;
      } else {
        console.log("Không có tệp nào được chọn");
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
.user-create-container {
  max-width: 85%;
  margin: auto;
  padding: 20px;
}

.max-width-select {
  width: 100%;
}

.max-width-height-picture {
  object-fit: cover;
}
</style>
