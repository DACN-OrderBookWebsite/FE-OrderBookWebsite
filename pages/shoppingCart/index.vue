<template>
  <div id="app">
    <Header> </Header>
    <HeroSection></HeroSection>
    <div class="container">
      <b-table striped hover :items="cartItems" :fields="fields" outlined>
        <template v-slot:cell(price)="data">
          {{ $formatCurrencyVND(data.item.price) }}
        </template>
        <template v-slot:cell(image)="data">
          <b-img
            :src="data.item.image"
            alt="Image"
            fluid
            style="width: 50px; height: 50px"
          ></b-img>
        </template>
        <template v-slot:cell(quantity)="data">
          <b-input-group size="sm">
            <b-button @click="decrement(data.index)" variant="outline-secondary"
              >-</b-button
            >
            <b-form-input v-model="data.item.quantity" readonly></b-form-input>
            <b-button @click="increment(data.index)" variant="outline-secondary"
              >+</b-button
            >
          </b-input-group>
        </template>
        <template v-slot:cell(total)="data">
          {{ $formatCurrencyVND(data.item.price * data.item.quantity) }}
        </template>
      </b-table>
      <div class="d-flex flex-row-reverse">
        <b-button
          type="submit"
          class="pb-2 mb-3"
          variant="danger"
          @click="confirmClearCart"
          >Xoá giỏ hàng</b-button
        >
      </div>
      <!-- Form Đặt Hàng -->
      <b-form @submit="confirmDatHang" class="form-submit">
        <div class="p-2 d-flex justify-content-between">
          <label>Tên Sinh Viên <span style="color:red">*</span>:</label>
          <b-form-group>
            <b-form-input v-model="dataHoaDon.TenSV"></b-form-input>
            <small v-if="dataerror.TenSV" class="text-danger">{{
              dataerror.TenSV[0]
            }}</small>
          </b-form-group>
          <label>Mã Số Sinh Viên<span style="color:red">*</span>:</label>

          <b-form-group >
            <b-form-input v-model="dataHoaDon.MaSV"></b-form-input>
            <small v-if="dataerror.MaSV" class="text-danger">{{
              dataerror.MaSV[0]
            }}</small>
          </b-form-group>
          <label>Số Điện Thoại<span style="color:red">*</span>:</label>
          <b-form-group>
            <b-form-input v-model="dataHoaDon.SDT"></b-form-input>
            <small v-if="dataerror.SDT" class="text-danger">{{
              dataerror.SDT[0]
            }}</small>
          </b-form-group>
        </div>
        <label class="p-2">Nơi Lấy Sách<span style="color:red">*</span>:</label>
        <b-form-group class="p-2">
          <b-form-input v-model="dataHoaDon.DiaChiNhanHang"></b-form-input>
          <small v-if="dataerror.DiaChiNhanHang" class="text-danger">{{
            dataerror.DiaChiNhanHang[0]
          }}</small>
        </b-form-group>

        <b-form-group class="p-2" label="Ghi Chú:">
          <b-form-textarea v-model="dataHoaDon.GhiChu"></b-form-textarea>
          <small v-if="dataerror.GhiChu" class="text-danger">{{
            dataerror.GhiChu[0]
          }}</small>
        </b-form-group>

        <!-- Tổng Tiền -->
        <div class="p-2 total-price d-flex flex-row-reverse">
          <span
            >Thành tiền:
            <span class="sum-total">{{
              $formatCurrencyVND(totalPrice)
            }}</span></span
          >
        </div>
        <div class="p-2 total-price d-flex flex-row-reverse">
          <b-button type="submit" variant="primary">Đặt Hàng</b-button>
        </div>
      </b-form>
    </div>
    <Footer> </Footer>
  </div>
</template>
  
<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Swal from "sweetalert2";
import HoaDonService from "../../services/api/HoaDonService";
import ChiTietHoaDonService from "../../services/api/ChiTietHoaDonService";
import moment from "moment";

export default {
  name: "ShoppingCart",
  components: { HeroSection, Footer, Header },
  data() {
    return {
      cartItems: [
        // Mẫu dữ liệu, thay thế với dữ liệu thực tế
        // { image: 'link-to-image.jpg', title: 'Sách A', price: 100, quantity: 1 },
        // { image: 'link-to-image.jpg', title: 'Sách B', price: 150, quantity: 2 },
      ],
      fields: [
        "image",
        "title",
        "price",
        { key: "price", class: "text-center" },
        { key: "quantity", class: "text-center quantity-column" },
        { key: "total", class: "text-center" },
      ],
      dataHoaDon: {
        NgayXuat: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        NgayNhanHang: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        TongSoLuong: 0,
        TongTien: 0,
        isGroup: 0,
        idNhanVien: null,
        idKhachHang: null,
        idTrangThai: 1,
        TenSV: "",
        MaSV: "",
        SDT: "",
        DiaChiNhanHang: "",
        GhiChu: "",
      },
      dataerror: {},
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  async mounted() {
    await this.getCart();
  },
  methods: {
    increment(index) {
      this.cartItems[index].quantity++;
    },
    decrement(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    async getCart() {
      const cart = await this.$cart.getCart();
      this.cartItems = cart.map((item) => ({
        id: item.id,
        image: item.image,
        title: item.name,
        price: item.price,
        quantity: item.stock,
      }));
    },
    async confirmClearCart() {
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
        this.clearCart();
      }
    },
    clearCart() {
      try {
        this.$cart.clearCart();
        this.getCart();
        Swal.fire("Đã Xóa!", "Dữ liệu đã được xóa.", "success");
        this.$router.push(`/`);
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Xóa Thất Bại!",
          "Đã có lỗi xảy ra khi xóa dữ liệu.",
          "error"
        );
      }
    },
    async confirmDatHang(evt) {
      evt.preventDefault();
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn đặt hàng?",
        text: "Bạn sẽ không thể hoàn nguyên hành động này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có!",
        cancelButtonText: "Không!",
      });

      if (result.isConfirmed) {
        this.onSubmit();
      }
    },
    async onSubmit() {
      try {
        this.dataHoaDon.NgayXuat = moment(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.dataHoaDon.NgayNhanHang = moment(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.dataHoaDon.TongSoLuong = this.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        this.dataHoaDon.TongTien = this.totalPrice;
        console.log(this.dataHoaDon);
        await HoaDonService.insert(this.$axios, this.dataHoaDon);
        const response = await HoaDonService.showDataByMaSV(
          this.$axios,
          this.dataHoaDon.MaSV
        );
        console.log(response);
        this.cartItems.map(async (item) => {
          const dataChiTiet = {
            SoLuong: item.quantity,
            DonGia: item.price,
            idSanPham: item.id,
            idHoaDon: response.data[0].id,
          };
          await ChiTietHoaDonService.insert(this.$axios, dataChiTiet);
        });

        Swal.fire(
          "Đặt hàng thành công!",
          "Đơn hàng của bạn đã được ghi nhận.",
          "success"
        );
        this.$cart.clearCart();
        this.$router.push(`/`);
      } catch (error) {
        this.dataerror = error.response.data.errors;
        Swal.fire(
          "Thêm Thất Bại!",
          "Đã có lỗi xảy ra khi thêm dữ liệu.",
          "error"
        );
      }
    },
  },
};
</script>
<style>
.container {
  margin-top: 20px;
}
.quantity-column {
  width: 10%;
}
.total-price {
  margin-bottom: 20px;
  font-size: 1.25em;
  font-weight: bold;
}

.b-img {
  width: 100px;
  /* Điều chỉnh kích thước ảnh */
}
.sum-total {
  color: red;
}
.form-submit {
  border: 1px solid #9da2a6;
}
/* Thêm các style khác nếu cần */
</style>