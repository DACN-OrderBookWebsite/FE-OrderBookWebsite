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
            <div class="user-create-container">
              <h1 class="text-center">Thêm người dùng mới</h1>
              <b-form @submit.prevent="confirmAndCreate">
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
                <b-form-group
                  label="Tên đăng nhập:"
                  label-for="input-TenDangNhap"
                >
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
                  <b-form-checkbox id="input-disabled" v-model="data.Disabled">
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
                  <img
                    :src="data.Anh"
                    alt="Ảnh"
                    class="max-width-height-picture"
                  />
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Thêm</b-button>
              </b-form>
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
import PictureService from "~/services/api/PictureService";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Swal from "sweetalert2";
import moment from "moment";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: {
        name: "",
        TenDangNhap: "",
        MatKhau: "",
        MatKhau_confirmation: "",
        SDT: "",
        DiaChi: "",
        Email: "",
        NgayTao: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        NgayThayDoi: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        GioiTinh: 0,
        Anh: "",
        Disabled: 0,
        idChucVu: 1,
      },
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
    await this.getRolePermission();
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
    formattedModifiedDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    async confirmAndCreate() {
      const confirmResult = await Swal.fire({
        title: "Xác nhận thêm?",
        text: "Bạn có chắc muốn thêm?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Thêm",
        cancelButtonText: "Hủy",
      });

      if (confirmResult.isConfirmed) {
        this.create();
      }
    },
    async create() {
      try {
        this.data.MatKhau = this.data.TenDangNhap;
        this.data.MatKhau_confirmation = this.data.TenDangNhap;
        this.formattedModifiedDate(this.NgayTao);
        this.formattedModifiedDate(this.NgayThayDoi);
        console.log(this.data);
        await NguoiDungService.insert(this.$axios, this.data);
        Swal.fire("Thêm thành công!", "Dữ liệu đã được thêm.", "success");
      } catch (error) {
        this.dataerror = error.response.data.errors;
        Swal.fire(
          "Thêm Thất Bại!",
          "Đã có lỗi xảy ra khi thêm dữ liệu.",
          "error"
        );
      }
    },
    async getRolePermission() {
      try {
        const response = await NguoiDungService.getPermission(this.$axios);
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
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.max-width-select {
  width: 100%;
}

.max-width-height-picture {
  width: 100%;
  height: 100%;
}
</style>
