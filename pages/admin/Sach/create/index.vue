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
        <div class="user-create-container container-fluid">
          <h1 class="text-center">Thêm sách mới</h1>
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

            <!-- Thể loại -->
            <b-form-group label="Thể loại:" label-for="input-role">
              <b-form-select
                id="input-role"
                v-model="data.idTheLoai"
                required
                :options="TheLoaiOption"
                class="max-width-select"
              ></b-form-select>
              <small v-if="dataerror.idTheLoai" class="text-danger">{{
                dataerror.idTheLoai
              }}</small>
            </b-form-group>

            <!-- Nhà xuất bản -->
            <b-form-group label="Nhà xuất bản:" label-for="input-role">
              <b-form-select
                id="input-role"
                v-model="data.idNhaXuatBan"
                required
                :options="NhaXuatBanOption"
                class="max-width-select"
              ></b-form-select>
              <small v-if="dataerror.idNhaXuatBan" class="text-danger">{{
                dataerror.idNhaXuatBan
              }}</small>
            </b-form-group>

            <!-- Tác giả -->
            <b-form-group label="Tác giả:" label-for="input-role">
              <b-form-select
                id="input-role"
                v-model="data.idTacGia"
                required
                :options="TacGiaOption"
                class="max-width-select"
              ></b-form-select>
              <small v-if="dataerror.idTacGia" class="text-danger">{{
                dataerror.idTacGia
              }}</small>
            </b-form-group>

            <!-- Đơn giá -->
            <b-form-group label="Đơn giá:" label-for="input-number">
              <b-form-input
                id="input-number"
                v-model="data.DonGia"
                type="number"
                step="1000"
                required
                placeholder="Nhập đơn giá"
              ></b-form-input>
            </b-form-group>

            <!-- Số lượng tồn -->
            <b-form-group label="Số lượng tồn:" label-for="input-number">
              <b-form-input
                id="input-number"
                v-model="data.SoLuongTon"
                type="number"
                step="1"
                required
                placeholder="Nhập đơn giá"
                disabled
              ></b-form-input>
            </b-form-group>

            <!-- Năm xuất bản -->
            <b-form-group label="Năm xuất bản:" label-for="input-number">
              <b-form-input
                id="input-number"
                v-model="data.NamXuatBan"
                type="number"
                step="1"
                required
                placeholder="Nhập năm xuất bản"
              ></b-form-input>
            </b-form-group>

            <!-- Trạng Thái Hoạt Động -->
            <b-form-group
              label="Trạng Thái Hoạt Động:"
              label-for="input-disabled"
            >
              <b-form-checkbox id="input-disabled" v-model="data.Disabled">
                Ngừng kinh doanh:
              </b-form-checkbox>
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
            <b-button type="submit" variant="primary">Thêm</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
<script>
import SachService from "~/services/api/SachService";
import PictureService from "~/services/api/PictureService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import Swal from "sweetalert2";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: {
        name: null,
        idTheLoai: null,
        idNhaXuatBan: null,
        idTacGia: null,
        DonGia: 0,
        SoLuongTon: 0,
        Anh: null,
        NamXuatBan: 2000,
        Disabled: 0,
      },
      dataerror: {},
      TheLoaiOption: [],
      NhaXuatBanOption: [],
      TacGiaOption: [],
      quyen: 9,
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
        await SachService.insert(this.$axios, this.data);
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
        const response = await SachService.getPermission(this.$axios);
        this.TheLoaiOption = response.data.TheLoai.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
        this.NhaXuatBanOption = response.data.NhaXuatBan.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
        this.TacGiaOption = response.data.TacGia.map((item) => {
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
        const response = await PictureService.getSachPicture(this.data.Anh);
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
  