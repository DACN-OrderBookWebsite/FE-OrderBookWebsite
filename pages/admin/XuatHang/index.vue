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
        <div id="table_content">
          <div class="h1 text-center">Danh sách phiếu xuất</div>
           
          <!-- Trạng thái -->
          <b-form-group
            label="Trạng thái:"
            label-for="input-TrangThai"
            class="d-flex align-items-center"
          >
            <b-form-select
              id="input-TrangThai"
              v-model="TrangThai"
              required
              :options="TrangThaiOption"
              class="max-width-select"
              @change="handleTrangThaiChange"
            ></b-form-select>
          </b-form-group>

          <b-table :items="data" :fields="fields" class="text-center">
            <template #cell(idTrangThai)="data">
              <label>{{ formatTrangThai(data.item.idTrangThai) }}</label>
            </template>
            <template #cell(actions)="data">
              <b-button size="sm" variant="primary" @click="edit(data.item)"
                >Sửa</b-button
              >
              <b-button
                size="sm"
                variant="danger"
                @click="confirmAndRemove(data.item)"
                >Xóa</b-button
              >
              <b-button
                size="sm"
                variant="primary"
                @click="confirmAndUpdate(data.item)"
                >Cập nhật trạng thái</b-button
              >
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
<script>
import SachService from "~/services/api/SachService";
import HoaDonService from "~/services/api/HoaDonService";
import ChiTietHoaDonService from "~/services/api/ChiTietHoaDonService";
import TrangThaiDonHangService from "~/services/api/TrangThaiDonHangService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: [],
      fields: [
        { key: "id", label: "ID" },
        { key: "NgayXuat", label: "Ngày xuất" },
        { key: "NgayNhanHang", label: "Ngày nhận hàng" },
        { key: "TongSoLuong", label: "Tổng số lượng" },
        { key: "TongTien", label: "Tổng tiền" },
        // { key: 'isGroup', label: 'Mua theo nhóm' },
        { key: "MaSV", label: "Mã số sinh viên" },
        { key: "TenSV", label: "Tên sinh viên" },
        { key: "SDT", label: "Số điện thoại" },
        { key: "DiaChiNhanHang", label: "Địa chỉ nhận hàng" },
        { key: "GhiChu", label: "Ghi chú" },
        { key: "idTrangThai", label: "Trạng thái" },
        { key: "nameOfNhanVien", label: "Nhân viên" },
        { key: "idKhachHang", label: "Khách hàng" },
        { key: "actions", label: "Hành Động" },
      ],
      TrangThai: 1,
      TrangThaiOption: [],
      newData: {
        NgayXuat: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        NgayNhanHang: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        TongSoLuong: 0,
        TongTien: 0,
        isGroup: 0,
        MaSV: "",
        TenSV: "",
        SDT: "",
        DiaChiNhanHang: "",
        GhiChu: "",
        idTrangThai: 1,
        idNhanVien: 1,
        idKhachHang: 1,
      },
      dataerror: {},
      dataSanPham: {
        SoLuongTon: 0,
      },
      quyen: 12,
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.loadTrangThai();
    await this.fetch(1);
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
    async updateSoLuongSanPhamByHoaDon(idSanPham, SoLuong) {
      const response = await SachService.getItem(this.$axios, idSanPham);
      console.log("123", response);
      this.dataSanPham.SoLuongTon = response.SoLuongTon;
      this.dataSanPham.SoLuongTon -= SoLuong;
      console.log("456", this.dataSanPham);
      await SachService.updateSoLuongSanPhamByPhieuNhap(
        this.$axios,
        idSanPham,
        this.dataSanPham
      );
    },
    async updateSoLuongSanPhamByHoaDonAfterDelete(idSanPham, SoLuong) {
      const response = await SachService.getItem(this.$axios, idSanPham);
      console.log("123", response);
      this.dataSanPham.SoLuongTon = response.SoLuongTon;
      this.dataSanPham.SoLuongTon += SoLuong;
      console.log("456", this.dataSanPham);
      await SachService.updateSoLuongSanPhamByPhieuNhap(
        this.$axios,
        idSanPham,
        this.dataSanPham
      );
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
    async handleTrangThaiChange() {
      await this.fetch(this.TrangThai);
    },
    async loadTrangThai() {
      try {
        const response = await TrangThaiDonHangService.getData(this.$axios);
        console.log(response);
        this.TrangThaiOption = response.data.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
      } catch (error) {
        console.error("Error while fetching create form:", error);
      }
    },
    async fetch(TrangThai) {
      try {
        const response = await HoaDonService.getDataByidTrangThai(
          this.$axios,
          TrangThai
        );
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formattedModifiedDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    edit(item) {
      // if (item.idTrangThai === 1) {
      this.$router.push(`/admin/XuatHang/edit/${item.id}`);
      // } else {
      //     Swal.fire(
      //         'Thông báo!',
      //         'phiếu xuất chỉ có thể cập nhật ở trạng thái chưa xác nhận!.',
      //         'warning'
      //     )
      // }
    },
    async confirmAndRemove(item) {
      if (item.idTrangThai === 4) {
        Swal.fire(
          "Thông báo!",
          "phiếu xuất đã hoàn thành, không thể xóa.",
          "warning"
        );
        return;
      }
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
        this.remove(item);
      }
    },
    async remove(item) {
      try {
        //Cập nhật lại số lượng tồn khi xóa nếu trạng thái là 2 hoặc 3
        if (item.idTrangThai === 2 || item.idTrangThai === 3) {
          ChiTietHoaDonService.getDataByHoaDon(this.$axios, item.id)
            .then((response) => {
              if (response && response.data && Array.isArray(response.data)) {
                response.data.forEach((element) => {
                  console.log(element);
                  this.updateSoLuongSanPhamByHoaDonAfterDelete(
                    element.idSanPham,
                    element.SoLuong
                  );
                });
              } else {
                console.error("Invalid or missing data in the response");
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }

        await ChiTietHoaDonService.deleteByHoaDon(this.$axios, item.id);
        await HoaDonService.delete(this.$axios, item.id);
        await this.fetch(1);
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
    async confirmAndUpdate(item) {
      if (item.idTrangThai === 4) {
        Swal.fire(
          "Thông báo!",
          "phiếu xuất đã hoàn thành, không thể cập nhật thêm.",
          "warning"
        );
      } else {
        const result = await Swal.fire({
          title: "Bạn có chắc chắn cập nhật trang thái?",
          text:
            "Trạng thái cập nhật sẽ là " +
            this.formatTrangThai(item.idTrangThai + 1),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Có!",
          cancelButtonText: "Không!",
        });

        if (result.isConfirmed) {
          this.update(item);
        }
      }
    },
    async update(item) {
      try {
        item.idTrangThai += 1;
        await HoaDonService.update(this.$axios, item.id, item);

        // Cờ để kiểm soát việc tiếp tục thực thi
        let continueExecution = true;

        if (item.idTrangThai === 2) {
          await ChiTietHoaDonService.getDataByHoaDon(this.$axios, item.id)
            .then(async (response) => {
              if (response && response.data && Array.isArray(response.data)) {
                for (const element of response.data) {
                  const sp = await SachService.getItem(
                    this.$axios,
                    element.idSanPham
                  );
                  if (sp.SoLuongTon < element.SoLuong) {
                    Swal.fire(
                      "Thông báo!",
                      "Sản phẩm " +
                        sp.name +
                        " trong kho chỉ còn " +
                        sp.SoLuongTon +
                        " sản phẩm",
                      "warning"
                    );
                    continueExecution = false; // Set cờ để dừng việc tiếp tục thực thi
                    break; // Thoát vòng lặp
                  }
                }
              } else {
                console.error("Invalid or missing data in the response");
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }

        // Kiểm tra cờ trước khi tiếp tục thực thi các bước tiếp theo
        if (!continueExecution) {
          return;
        }

        // Các bước tiếp theo nếu cờ không bị dừng
        if (item.idTrangThai === 2) {
          await ChiTietHoaDonService.getDataByHoaDon(this.$axios, item.id)
            .then((response) => {
              if (response && response.data && Array.isArray(response.data)) {
                response.data.forEach((element) => {
                  this.updateSoLuongSanPhamByHoaDon(
                    element.idSanPham,
                    element.SoLuong
                  );
                });
              } else {
                console.error("Invalid or missing data in the response");
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
        await this.fetch(item.idTrangThai - 1);
        Swal.fire("Thông báo!", "Trạng thái đã cập nhật.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Cập nhật thất bại!",
          "Đã có lỗi xảy ra khi cập nhật dữ liệu.",
          "error"
        );
      }
    },
    add() {
      this.$router.push("/admin/XuatHang/create");
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

.b-form-group {
  display: flex;
  align-items: center;
}
</style>
  