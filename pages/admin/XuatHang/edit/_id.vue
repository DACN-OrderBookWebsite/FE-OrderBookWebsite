<template>
    <div>
        <Header></Header>
        <div id="table_content">
            <!-- <div class="h1 text-center">Danh sách Sách</div>
        <b-button @click="add">Thêm</b-button> -->
            <div class="user-create-container border">
                <div class="h1 text-center">Cập nhật hóa đơn số {{ this.$route.params.id }}</div>
                <b-form @submit.prevent="confirmUpdate">

                    <!-- Ngày nhận hàng -->
                    <b-form-group label="Ngày nhận hàng:" label-for="input-NgayNhanHang" class="d-flex align-items-center">
                        <b-form-datepicker v-model="selectedDate" placeholder="Chọn ngày" class="mb-2"
                            @input="handleDateChange" :value="selectedDate"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-datepicker>

                        <b-form-timepicker v-model="selectedTime" placeholder="Chọn giờ" class="mb-2"
                            @input="handleDateChange" :value="selectedTime"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-timepicker>
                    </b-form-group>

                    <!-- Trạng thái -->
                    <b-form-group label="Trạng thái:" label-for="input-TrangThai" class="d-flex align-items-center">
                        <span small class="text-danger">{{ formatTrangThai(dataHoaDon.idTrangThai) }}</span>
                    </b-form-group>

                    <!-- Mã sinh viên -->
                    <b-form-group label="Mã sinh viên:" label-for="input-name">
                        <b-form-input id="input-name" v-model="dataHoaDon.MaSV" required placeholder="Nhập Mã sinh viên"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-input>
                        <small v-if="dataerror.MaSV" class="text-danger">{{ dataerror.MaSV }}</small>
                    </b-form-group>

                    <!-- Tên -->
                    <b-form-group label="Tên:" label-for="input-name">
                        <b-form-input id="input-name" v-model="dataHoaDon.TenSV" required placeholder="Nhập tên"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-input>
                        <small v-if="dataerror.TenSV" class="text-danger">{{ dataerror.TenSV }}</small>
                    </b-form-group>

                    <!-- Số điện thoại -->
                    <b-form-group label="Số điện thoại:" label-for="input-name">
                        <b-form-input id="input-name" v-model="dataHoaDon.SDT" required placeholder="Nhập số điện thoại"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-input>
                        <small v-if="dataerror.SDT" class="text-danger">{{ dataerror.SDT }}</small>
                    </b-form-group>

                    <!-- Địa chỉ nhận hàng -->
                    <b-form-group label="Địa chỉ nhận hàng:" label-for="input-name">
                        <b-form-input id="input-name" v-model="dataHoaDon.DiaChiNhanHang" required
                            placeholder="Nhập Địa chỉ nhận hàng" :disabled="dataHoaDon.idTrangThai === 4"></b-form-input>
                        <small v-if="dataerror.DiaChiNhanHang" class="text-danger">{{ dataerror.DiaChiNhanHang }}</small>
                    </b-form-group>

                    <!-- Ghi chú -->
                    <b-form-group label="Ghi chú:" label-for="input-name">
                        <b-form-input id="input-name" v-model="dataHoaDon.GhiChu" placeholder="Nhập Ghi chú"
                            :disabled="dataHoaDon.idTrangThai === 4"></b-form-input>
                        <small v-if="dataerror.GhiChu" class="text-danger">{{ dataerror.GhiChu }}</small>
                    </b-form-group>

                    <!-- Tổng số lượng -->
                    <b-form-group label="Tổng số lượng:" label-for="input-TongSoLuong" class="d-flex align-items-center">
                        <span small class="text-danger">{{ dataHoaDon.TongSoLuong }}</span>
                    </b-form-group>

                    <!-- Tổng tiền-->
                    <b-form-group label="Tổng tiền:" label-for="input-TongTien" class="d-flex align-items-center">
                        <span small class="text-danger">{{ dataHoaDon.TongTien }}</span>
                    </b-form-group>

                    <b-button type="submit" variant="primary" :disabled="dataHoaDon.idTrangThai === 4">Cập nhật</b-button>
                </b-form>
            </div>
            <div class="horizontal-container">
                <div class="left-table">
                    <!-- Bảng sách -->
                    <div class="h1 text-center">Danh sách sản phẩm</div>
                    <b-table :items="dataSanPham" :fields="fieldsSanPham" class="text-center">
                        <template #cell(Anh)="dataSanPham">
                            <img :src="dataSanPham.item.Anh" alt="Ảnh người dùng" style="width: 50px; height: auto;">
                        </template>
                        <!-- <template #cell(Disabled)="dataSanPham">
                            <label>{{ formatDisabled(dataSanPham.item.Disabled) }}</label>
                        </template> -->
                        <template #cell(actions)="dataSanPham">
                            <b-button size="sm" variant="primary" @click="insert(dataSanPham.item)"
                                :disabled="dataHoaDon.idTrangThai !== 1">Thêm</b-button>
                        </template>
                    </b-table>
                </div>

                <div class="right-table">
                    <div class="h1 text-center">Chi tiết hóa đơn</div>
                    <b-table :items="dataChiTiet" :fields="fieldsChiTiet" class="text-center">
                        <template #cell(SoLuong)="dataChiTiet">
                            <b-form-input v-model="dataChiTiet.item.SoLuong" type="number" min="1"
                                @blur="handleBlur(dataChiTiet.item)"
                                :disabled="dataHoaDon.idTrangThai !== 1"></b-form-input>
                        </template>
                        <template #cell(DonGia)="dataChiTiet">
                            <b-form-input v-model="dataChiTiet.item.DonGia" type="number" min="0" disabled></b-form-input>
                        </template>
                        <template #cell(actions)="dataChiTiet">
                            <b-button size="sm" variant="danger" @click="confirmAndRemove(dataChiTiet.item.id)"
                                :disabled="dataHoaDon.idTrangThai !== 1">Xóa</b-button>
                        </template>
                    </b-table>
                </div>



            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
    
<script>
import SachService from '~/services/api/SachService';
import HoaDonService from '~/services/api/HoaDonService';
import ChiTietHoaDonService from '~/services/api/ChiTietHoaDonService';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Swal from "sweetalert2";
import moment from 'moment';

export default {
    components: { Footer, Header },
    data() {
        return {
            dataSanPham: [],
            fieldsSanPham: [
                { key: 'name', label: 'Tên' },
                // { key: 'idTheLoai', label: 'Thể loại' },
                // { key: 'idNhaXuatBan', label: 'Nhà xuất bản' },
                // { key: 'idTacGia', label: 'Tác giả' },
                // { key: 'DonGia', label: 'Đơn giá' },
                // { key: 'SoLuongTon', label: 'Số lượng tồn' },
                { key: 'Anh', label: 'Ảnh' },
                // { key: 'Disabled', label: 'Kinh doanh' },
                { key: 'actions', label: 'Hành Động' }
            ],
            dataChiTiet: [],
            fieldsChiTiet: [
                { key: 'name', label: 'Tên' },
                { key: 'SoLuong', label: 'Số lượng' },
                { key: 'DonGia', label: 'Đơn giá' },
                { key: 'actions', label: 'Hành Động' }
            ],
            newDataChiTiet: {
                SoLuong: 1,
                DonGia: 0,
                idSanPham: 0,
                idHoaDon: this.$route.params.id
            },
            dataHoaDon: {
            },
            dataerror: {},
            selectedDate: new Date(),
            selectedTime: '00:00:00',
            NhaCungCapOption: []
        };
    },
    async mounted() {
        await this.loadSelectedbox();
        await this.fetchHoaDon();
        await this.fetch();
        await this.fetchChiTiet();
        // await this.getHoaDon();
        this.getCurrentStaff();
    },
    computed: {
    },
    methods: {
        // async getHoaDon() {
        //     const response = await HoaDonService.getItem(this.$axios, this.$route.params.id);
        //     this.dataHoaDon = response;
        // },
        getCurrentStaff(){
            try{
                const response = this.$login.getLogin();
                this.data.idNhanVien = response.length !== 0 ? response[0].id : null;
                console.log(response);
            }catch{
                console.log('error không ai đăng nhập');
            }
        },
        async updateTongSoLuong_TongTien() {
            const response = await ChiTietHoaDonService.sumSoLuongOfHoaDon(this.$axios, this.$route.params.id);
            this.dataHoaDon.TongSoLuong = response.data.TongSoLuong;
            const response2 = await ChiTietHoaDonService.calculateTongTienOfHoaDon(this.$axios, this.$route.params.id);
            this.dataHoaDon.TongTien = response2.data.TongTien;
            await HoaDonService.update(this.$axios, this.$route.params.id, this.dataHoaDon);
        },
        async loadSelectedbox() {
            try {
                const response = await HoaDonService.getPermission(this.$axios);
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
            return idTrangThai === 1 ? 'Chưa xác nhận' : idTrangThai === 2 ? 'Đã xác nhận' : idTrangThai === 3 ? 'Chưa thanh toán' : 'Hoàn thành';
        },
        handleDateChange() {
            this.dataHoaDon.NgayNhanHang = `${this.selectedDate} ${this.selectedTime}`;
        },
        async fetchHoaDon() {
            try {
                const response = await HoaDonService.getItem(this.$axios, this.$route.params.id);
                this.dataHoaDon = response;
                this.selectedDate = moment(this.dataHoaDon.NgayNhanHang).format('YYYY-MM-DD');
                this.selectedTime = moment(this.dataHoaDon.NgayNhanHang).format('hh:mm:ss');
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
                const response = await ChiTietHoaDonService.getDataByidHoaDonAndNameOfSanPham(this.$axios, this.$route.params.id);
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
                await ChiTietHoaDonService.update(this.$axios, item.id, item);
                await this.updateTongSoLuong_TongTien();
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Lỗi!',
                    'Có lỗi xảy ra khi cập nhật thông tin số lượng và đơn giá.',
                    'error'
                );
            }
        },
        async insert(item) {
            try {
                const response = await ChiTietHoaDonService.getDataByCheckSanPhamIsInsertedToHoaDon(this.$axios, this.$route.params.id, item.id);
                if (response.data.length != 0) {
                    this.newDataChiTiet.id = response.data[0].id;
                    this.newDataChiTiet.SoLuong = response.data[0].SoLuong + 1;
                    this.newDataChiTiet.DonGia = response.data[0].DonGia;
                    this.newDataChiTiet.idSanPham = response.data[0].idSanPham;
                    this.newDataChiTiet.idHoaDon = response.data[0].idHoaDon;
                    await ChiTietHoaDonService.update(this.$axios, this.newDataChiTiet.id, this.newDataChiTiet);
                } else {
                    this.newDataChiTiet.idSanPham = item.id;
                    this.newDataChiTiet.DonGia = item.DonGia;
                    await ChiTietHoaDonService.insert(this.$axios, this.newDataChiTiet);
                }
                this.updateTongSoLuong_TongTien();
                await this.fetchChiTiet();
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Lỗi!',
                    'Có lỗi xảy ra khi thêm sản phẩm.',
                    'error'
                );
            }
        },
        async confirmAndRemove(id) {
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
                this.remove(id);
            }
        },
        async remove(id) {
            try {
                await ChiTietHoaDonService.delete(this.$axios, id);
                await this.updateTongSoLuong_TongTien();
                await this.fetchChiTiet();
                Swal.fire(
                    'Đã Xóa!',
                    'Dữ liệu đã được xóa.',
                    'success'
                );
            } catch (error) {
                console.error(error);
                Swal.fire(
                    'Xóa Thất Bại!',
                    'Đã có lỗi xảy ra khi xóa dữ liệu.',
                    'error'
                );
            }
        },
        confirmUpdate() {
            Swal.fire({
                title: 'Xác nhận cập nhật',
                text: "Bạn có chắc chắn muốn cập nhật thông tin?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có, cập nhật!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(this.data);
                    this.update();
                }
            });
        },
        async update() {
            try {
                await HoaDonService.update(this.$axios, this.$route.params.id, this.dataHoaDon);
                Swal.fire(
                    'Cập nhật!',
                    'Thông tin đã được cập nhật thành công.',
                    'success'
                );
            } catch (error) {
                // this.dataerror = error.response.data.errors;
                Swal.fire(
                    'Lỗi!',
                    'Có lỗi xảy ra khi cập nhật thông tin.',
                    'error'
                );
            }
        },
    }
};
</script>
    
<style scoped>
#table_content {
    padding: 0 60px;
    /* 30px padding on both sides */
}

/* Additional styling for the table */
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
    