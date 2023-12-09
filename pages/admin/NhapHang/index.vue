<template>
    <div>
        <Header></Header>
        <div id="table_content">
            <div class="h1 text-center">Danh sách phiếu nhập</div>

            <!-- Nhà cung cấp -->
            <b-form-group label="Nhà cung cấp:" label-for="input-NhaCungCap" class="d-flex align-items-center">
                <b-form-select id="input-NhaCungCap" v-model="newData.idNhaCungCap" required :options="NhaCungCapOption"
                    class="max-width-select"></b-form-select>
                <b-button @click="confirmAndCreate">Thêm</b-button>
            </b-form-group>
            <small v-if="dataerror.idNhaCungCap" class="text-danger">{{ dataerror.idNhaCungCap }}</small>


            <!-- Trạng thái -->
            <b-form-group label="Trạng thái:" label-for="input-TrangThai" class="d-flex align-items-center">
                <b-form-select id="input-TrangThai" v-model="TrangThai" required :options="TrangThaiOption"
                    class="max-width-select" @change="handleTrangThaiChange"></b-form-select>
            </b-form-group>

            <b-table :items="data" :fields="fields" class="text-center">
                <template #cell(idTrangThai)="data">
                    <label>{{ formatTrangThai(data.item.idTrangThai) }}</label>
                </template>
                <template #cell(actions)="data">
                    <b-button size="sm" variant="primary" @click="edit(data.item)">Sửa</b-button>
                    <b-button size="sm" variant="danger" @click="confirmAndRemove(data.item)">Xóa</b-button>
                    <b-button size="sm" variant="primary" @click="confirmAndUpdate(data.item)">Cập nhật trạng
                        thái</b-button>
                </template>
            </b-table>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import SachService from '~/services/api/SachService';
import PhieuNhapService from '~/services/api/PhieuNhapService';
import ChiTietPhieuNhapService from '~/services/api/ChiTietPhieuNhapService';
import TrangThaiDonHangService from '~/services/api/TrangThaiDonHangService';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import moment from 'moment';

export default {
    components: { Footer, Header },
    data() {
        return {
            data: [],
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'NgayNhap', label: 'Ngày nhập' },
                { key: 'NgayNhanHang', label: 'Ngày nhận hàng' },
                { key: 'TongSoLuong', label: 'Tổng số lượng' },
                { key: 'TongTien', label: 'Tổng tiền' },
                { key: 'idTrangThai', label: 'Trạng thái' },
                { key: 'idNhanVien', label: 'Nhân viên' },
                { key: 'idNhaCungCap', label: 'Nhà cung cấp' },
                { key: 'actions', label: 'Hành Động' }
            ],
            TrangThai: 1,
            TrangThaiOption: [],
            NhaCungCapOption: [],
            newData: {
                NgayNhap: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                NgayNhanHang: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                TongSoLuong: 0,
                TongTien: 0,
                idTrangThai: 1,
                idNhanVien: 1,
                idNhaCungCap: 1
            },
            dataerror: {
                NgayNhap: "",
                NgayNhanHang: "",
                TongSoLuong: "",
                TongTien: "",
                TrangThai: "",
                NhanVien: "",
                NhaCungCap: ""
            },
            dataSanPham:{
                SoLuongTon:0
            }
        };
    },
    async mounted() {
        await this.loadSelectedbox();
        await this.fetch(1);
    },
    computed: {
    },
    methods: {
        async updateSoLuongSanPhamByPhieuNhap(idSanPham, SoLuong) {
            const response = await SachService.getItem(this.$axios, idSanPham);
            console.log("123",response);
            this.dataSanPham.SoLuongTon = response.SoLuongTon;
            this.dataSanPham.SoLuongTon += SoLuong;
            console.log("456",this.dataSanPham);
            await SachService.updateSoLuongSanPhamByPhieuNhap(this.$axios, idSanPham, this.dataSanPham);
        },
        formatTrangThai(idTrangThai) {
            return idTrangThai === 1 ? 'Chưa xác nhận' : idTrangThai === 2 ? 'Đã xác nhận' : idTrangThai === 3 ? 'Chưa thanh toán' : 'Hoàn thành';
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
        async loadSelectedbox() {
            try {
                const response = await PhieuNhapService.getPermission(this.$axios);
                this.NhaCungCapOption = response.data.NhaCungCap.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
                this.TrangThaiOption = response.data.TrangThai.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
            } catch (error) {
                console.error(error);
            }
        },
        async fetch(TrangThai) {
            try {
                const response = await PhieuNhapService.getDataByidTrangThai(this.$axios, TrangThai);
                this.data = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async confirmAndCreate() {
            const confirmResult = await Swal.fire({
                title: 'Xác nhận thêm?',
                text: 'Bạn có chắc muốn thêm?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Thêm',
                cancelButtonText: 'Hủy'
            });

            if (confirmResult.isConfirmed) {
                this.create();
            }
        },
        formattedModifiedDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        async create() {
            try {
                this.formattedModifiedDate(this.newData.NgayNhap);
                this.formattedModifiedDate(this.newData.NgayNhanHang);
                // this.newData.TongSoLuong =  0,
                //  this.newData.TongTien: 0,
                // TrangThai: 1,
                // NhanVien: 1,
                // NhaCungCap: 1
                await PhieuNhapService.insert(this.$axios, this.newData);
                this.TrangThai = 1;
                this.fetch(this.TrangThai);
                Swal.fire(
                    'Thêm thành công!',
                    'Dữ liệu đã được thêm.',
                    'success'
                );
            } catch (error) {
                this.dataerror = error.response.data.errors;
                Swal.fire(
                    'Thêm Thất Bại!',
                    'Đã có lỗi xảy ra khi thêm dữ liệu.',
                    'error'
                );
            }
        },
        edit(item) {
            // if (item.idTrangThai === 1) {
            this.$router.push(`/admin/NhapHang/edit/${item.id}`);
            // } else {
            //     Swal.fire(
            //         'Thông báo!',
            //         'Phiếu nhập chỉ có thể cập nhật ở trạng thái chưa xác nhận!.',
            //         'warning'
            //     )
            // }
        },
        async confirmAndRemove(item) {
            if (item.idTrangThai === 4) {
                Swal.fire(
                    'Thông báo!',
                    'Phiếu nhập đã hoàn thành, không thể xóa.',
                    'warning'
                )
                return;
            }
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
                this.remove(item);
            }
        },
        async remove(item) {
            try {
                await ChiTietPhieuNhapService.deleteByPhieuNhap(this.$axios, item.id);
                await PhieuNhapService.delete(this.$axios, item.id);
                await this.fetch(1);
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
        async confirmAndUpdate(item) {
            if (item.idTrangThai === 4) {
                Swal.fire(
                    'Thông báo!',
                    'Phiếu nhập đã hoàn thành, không thể cập nhật thêm.',
                    'warning'
                );
            } else {
                const result = await Swal.fire({
                    title: 'Bạn có chắc chắn cập nhật trang thái?',
                    text: 'Trạng thái cập nhật sẽ là ' + this.formatTrangThai(item.idTrangThai + 1),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có!',
                    cancelButtonText: 'Không!'
                });

                if (result.isConfirmed) {
                    this.update(item);
                }
            }
        },
        async update(item) {
            try {
                item.idTrangThai += 1;
                await PhieuNhapService.update(this.$axios, item.id, item);
                if (item.idTrangThai === 4) {
                    ChiTietPhieuNhapService.getDataByPhieuNhap(this.$axios, item.id)
                        .then(response => {
                            if (response && response.data && Array.isArray(response.data)) {
                                response.data.forEach((element) => {
                                    console.log(element);
                                    this.updateSoLuongSanPhamByPhieuNhap(element.idSanPham, element.SoLuong);
                                });
                            } else {
                                console.error('Invalid or missing data in the response');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
                await this.fetch(item.idTrangThai - 1);
                Swal.fire(
                    'Thông báo!',
                    'Trạng thái đã cập nhật.',
                    'success'
                );
            } catch (error) {
                console.error(error);
                Swal.fire(
                    'Cập nhật thất bại!',
                    'Đã có lỗi xảy ra khi cập nhật dữ liệu.',
                    'error'
                );
            }
        }
    }
}
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

.b-form-group {
    display: flex;
    align-items: center;
}
</style>
  