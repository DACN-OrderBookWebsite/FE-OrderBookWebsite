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
        <div id="table_content">
          <!-- <div class="h1 text-center">Danh sách Sách</div>
          -->
          <div class="user-create-container border">
            <div class="h1 text-center">
              Cập nhật phiếu nhập số {{ this.$route.params.id }}
            </div>
            <b-form @submit.prevent="confirmUpdate">
              <!-- Ngày nhận hàng -->
              <b-form-group
                label="Ngày nhận hàng:"
                label-for="input-NgayNhanHang"
                class="d-flex align-items-center"
              >
                <b-form-datepicker
                  v-model="selectedDate"
                  placeholder="Chọn ngày"
                  class="mb-2"
                  @input="handleDateChange"
                  :value="selectedDate"
                  :disabled="dataPhieuNhap.idTrangThai === 4"
                ></b-form-datepicker>

                <b-form-timepicker
                  v-model="selectedTime"
                  placeholder="Chọn giờ"
                  class="mb-2"
                  @input="handleDateChange"
                  :value="selectedTime"
                  :disabled="dataPhieuNhap.idTrangThai === 4"
                ></b-form-timepicker>
              </b-form-group>

              <!-- Trạng thái -->
              <b-form-group
                label="Trạng thái:"
                label-for="input-TrangThai"
                class="d-flex align-items-center"
              >
                <span small class="text-danger">{{
                  formatTrangThai(dataPhieuNhap.idTrangThai)
                }}</span>
              </b-form-group>

              <!-- Nhà cung cấp -->
              <b-form-group
                label="Nhà cung cấp:"
                label-for="input-NhaCungCap"
                class="d-flex align-items-center"
              >
                <b-form-select
                  id="input-NhaCungCap"
                  v-model="dataPhieuNhap.idNhaCungCap"
                  required
                  :options="NhaCungCapOption"
                  class="max-width-select"
                  :disabled="dataPhieuNhap.idTrangThai !== 1"
                ></b-form-select>
              </b-form-group>

              <!-- Tổng số lượng -->
              <b-form-group
                label="Tổng số lượng:"
                label-for="input-TongSoLuong"
                class="d-flex align-items-center"
              >
                <span small class="text-danger">{{
                  dataPhieuNhap.TongSoLuong
                }}</span>
              </b-form-group>

              <!-- Tổng tiền-->
              <b-form-group
                label="Tổng tiền:"
                label-for="input-TongTien"
                class="d-flex align-items-center"
              >
                <span small class="text-danger">{{
                  dataPhieuNhap.TongTien
                }}</span>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                :disabled="dataPhieuNhap.idTrangThai === 4"
                >Cập nhật</b-button
              >
            </b-form>
          </div>
          <div class="horizontal-container">
            <div class="left-table">
              <!-- Bảng sách -->
              <div class="h1 text-center">Danh sách sản phẩm</div>
              <b-table
                :items="dataSanPham"
                :fields="fieldsSanPham"
                class="text-center"
              >
                <template #cell(Anh)="dataSanPham">
                  <img
                    :src="dataSanPham.item.Anh"
                    alt="Ảnh người dùng"
                    style="width: 50px; height: auto"
                  />
                </template>
                <!-- <template #cell(Disabled)="dataSanPham">
                            <label>{{ formatDisabled(dataSanPham.item.Disabled) }}</label>
                        </template> -->
                <template #cell(actions)="dataSanPham">
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="insert(dataSanPham.item)"
                    :disabled="dataPhieuNhap.idTrangThai !== 1"
                    >Thêm</b-button
                  >
                </template>
              </b-table>
            </div>

            <div class="right-table">
              <div class="h1 text-center">Chi tiết phiếu nhập</div>
              <b-table
                :items="dataChiTiet"
                :fields="fieldsChiTiet"
                class="text-center"
              >
                <template #cell(SoLuong)="dataChiTiet">
                  <b-form-input
                    v-model="dataChiTiet.item.SoLuong"
                    type="number"
                    min="1"
                    @blur="handleBlur(dataChiTiet.item)"
                    :disabled="dataPhieuNhap.idTrangThai !== 1"
                  ></b-form-input>
                </template>
                <template #cell(DonGiaNhap)="dataChiTiet">
                  <b-form-input
                    v-model="dataChiTiet.item.DonGiaNhap"
                    type="number"
                    min="0"
                    @blur="handleBlur(dataChiTiet.item)"
                    :disabled="dataPhieuNhap.idTrangThai !== 1"
                  ></b-form-input>
                </template>
                <template #cell(actions)="dataChiTiet">
                  <b-button
                    size="sm"
                    variant="danger"
                    @click="confirmAndRemove(dataChiTiet.item.id)"
                    :disabled="dataPhieuNhap.idTrangThai !== 1"
                    >Xóa</b-button
                  >
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
    
<script>
import SachService from "~/services/api/SachService";
import PhieuNhapService from "~/services/api/PhieuNhapService";
import ChiTietPhieuNhapService from "~/services/api/ChiTietPhieuNhapService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import Swal from "sweetalert2";
import moment from "moment";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      dataSanPham: [],
      fieldsSanPham: [
        { key: "name", label: "Tên" },
        // { key: 'idTheLoai', label: 'Thể loại' },
        // { key: 'idNhaXuatBan', label: 'Nhà xuất bản' },
        // { key: 'idTacGia', label: 'Tác giả' },
        // { key: 'DonGia', label: 'Đơn giá' },
        // { key: 'SoLuongTon', label: 'Số lượng tồn' },
        { key: "Anh", label: "Ảnh" },
        // { key: 'Disabled', label: 'Kinh doanh' },
        { key: "actions", label: "Hành Động" },
      ],
      dataChiTiet: [],
      fieldsChiTiet: [
        { key: "name", label: "Tên" },
        { key: "SoLuong", label: "Số lượng" },
        { key: "DonGiaNhap", label: "Đơn giá nhập" },
        { key: "actions", label: "Hành Động" },
      ],
      newDataChiTiet: {
        SoLuong: 1,
        DonGiaNhap: 0,
        idSanPham: 0,
        idPhieuNhap: this.$route.params.id,
      },
      dataPhieuNhap: {
        NgayNhap: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        NgayNhanHang: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        TongSoLuong: 0,
        TongTien: 0,
        idTrangThai: 1,
        idNhanVien: 1,
        idNhaCungCap: 1,
      },
      selectedDate: new Date(),
      selectedTime: "00:00:00",
      NhaCungCapOption: [],
      quyen: 11,
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.loadSelectedbox();
    await this.fetchPhieuNhap();
    await this.fetch();
    await this.fetchChiTiet();
    await this.getPhieuNhap();
    this.getCurrentStaff();
  },
  computed: {},
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
    getCurrentStaff() {
      try {
        const response = this.$login.getLogin();
        this.dataPhieuNhap.idNhanVien =
          response.length !== 0 ? response[0].id : null;
      } catch {
        this.$router.push("/");
      }
    },
    async getPhieuNhap() {
      const response = await PhieuNhapService.getItem(
        this.$axios,
        this.$route.params.id
      );
      this.dataPhieuNhap = response;
    },
    async updateTongSoLuong_TongTien() {
      const response = await ChiTietPhieuNhapService.sumSoLuongOfPhieuNhap(
        this.$axios,
        this.$route.params.id
      );
      this.dataPhieuNhap.TongSoLuong = response.data.TongSoLuong;
      const response2 =
        await ChiTietPhieuNhapService.calculateTongTienOfPhieuNhap(
          this.$axios,
          this.$route.params.id
        );
      this.dataPhieuNhap.TongTien = response2.data.TongTien;
      await PhieuNhapService.update(
        this.$axios,
        this.$route.params.id,
        this.dataPhieuNhap
      );
    },
    async loadSelectedbox() {
      try {
        const response = await PhieuNhapService.getPermission(this.$axios);
        this.NhaCungCapOption = response.data.NhaCungCap.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },
    formatTrangThai(idTrangThai) {
      return idTrangThai === 1
        ? "Chưa xác nhận"
        : idTrangThai === 2
        ? "Đã xác nhận"
        : idTrangThai === 3
        ? "Chưa thanh toán"
        : "Hoàn thành";
    },
    handleDateChange() {
      this.dataPhieuNhap.NgayNhanHang = `${this.selectedDate} ${this.selectedTime}`;
    },
    async fetchPhieuNhap() {
      try {
        const response = await PhieuNhapService.getItem(
          this.$axios,
          this.$route.params.id
        );
        this.dataPhieuNhap = response;
        this.selectedDate = moment(this.dataPhieuNhap.NgayNhanHang).format(
          "YYYY-MM-DD"
        );
        this.selectedTime = moment(this.dataPhieuNhap.NgayNhanHang).format(
          "hh:mm:ss"
        );
      } catch (error) {
        console.error(error);
      }
    },
    async fetch() {
      try {
        const response = await SachService.getData(this.$axios);
        this.dataSanPham = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchChiTiet() {
      try {
        const response =
          await ChiTietPhieuNhapService.getDataByidPhieuNhapAndNameOfSanPham(
            this.$axios,
            this.$route.params.id
          );
        this.dataChiTiet = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDisabled(disabled) {
      return disabled === 1 ? "Ngừng kinh doanh" : "Đang kinh doanh";
    },
    async handleBlur(item) {
      try {
        await ChiTietPhieuNhapService.update(this.$axios, item.id, item);
        await this.updateTongSoLuong_TongTien();
      } catch (error) {
        console.log(error);
        Swal.fire(
          "Lỗi!",
          "Có lỗi xảy ra khi cập nhật thông tin số lượng và đơn giá.",
          "error"
        );
      }
    },
    async insert(item) {
      try {
        const response =
          await ChiTietPhieuNhapService.getDataByCheckSanPhamIsInsertedToPhieuNhap(
            this.$axios,
            this.$route.params.id,
            item.id
          );
        if (response.data.length != 0) {
          this.newDataChiTiet.id = response.data[0].id;
          this.newDataChiTiet.SoLuong = response.data[0].SoLuong + 1;
          this.newDataChiTiet.DonGiaNhap = response.data[0].DonGiaNhap;
          this.newDataChiTiet.idSanPham = response.data[0].idSanPham;
          this.newDataChiTiet.idPhieuNhap = response.data[0].idPhieuNhap;
          await ChiTietPhieuNhapService.update(
            this.$axios,
            this.newDataChiTiet.id,
            this.newDataChiTiet
          );
        } else {
          this.newDataChiTiet.id = null;
          this.newDataChiTiet.SoLuong = 1;
          this.newDataChiTiet.idSanPham = item.id;
          this.newDataChiTiet.idPhieuNhap = this.$route.params.id;
          await ChiTietPhieuNhapService.insert(
            this.$axios,
            this.newDataChiTiet
          );
        }
        await this.updateTongSoLuong_TongTien();
        await this.fetchChiTiet();
      } catch (error) {
        console.log(error);
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi thêm sản phẩm.", "error");
      }
    },
    async confirmAndRemove(id) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Bạn sẽ không thể hoàn nguyên hành động này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
        cancelButtonText: "Không, hủy bỏ!",
      });

      if (result.isConfirmed) {
        this.remove(id);
      }
    },
    async remove(id) {
      try {
        await ChiTietPhieuNhapService.delete(this.$axios, id);
        await this.updateTongSoLuong_TongTien();
        await this.fetchChiTiet();
        Swal.fire("Đã Xóa!", "Dữ liệu đã được xóa.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Xóa Thất Bại!",
          "Đã có lỗi xảy ra khi xóa dữ liệu.",
          "error"
        );
      }
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
        await PhieuNhapService.update(
          this.$axios,
          this.$route.params.id,
          this.dataPhieuNhap
        );
        Swal.fire(
          "Cập nhật!",
          "Thông tin đã được cập nhật thành công.",
          "success"
        );
      } catch (error) {
        // this.dataerror = error.response.data.errors;
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật thông tin.", "error");
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
.b-table {
  margin-top: 20px;
  /* Space above the table */
  background-color: white;
  /* Background color for the table */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: Adds shadow to the table */
  border-radius: 8px;
  /* Optional: Rounds the corners of the table */
}

.horizontal-container {
  display: flex;
  /* Sử dụng Flexbox để xếp hai phần ngang */
}

.left-table,
.right-table {
  flex: 1;
  /* Phần tử này chiếm phần bằng nhau trong không gian ngang */
  padding: 20px;
  /* Thêm padding để làm đẹp */
  border: 1px solid #ccc;
  /* Thêm đường viền cho thẩm mỹ */
}
</style>
    