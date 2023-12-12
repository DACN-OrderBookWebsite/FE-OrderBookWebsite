<template>
    <div>
        <Header></Header>
        <div class="user-create-container border">
            <h1 class="text-center">Thêm hóa đơn mới</h1>
            <b-form @submit.prevent="confirmAndCreate">

                <!-- Ngày nhận hàng -->
                <b-form-group label="Ngày nhận hàng:" label-for="input-NgayNhanHang" class="d-flex align-items-center">
                    <b-form-datepicker v-model="selectedDate" placeholder="Chọn ngày" class="mb-2" @input="handleDateChange"
                        :value="selectedDate"></b-form-datepicker>

                    <b-form-timepicker v-model="selectedTime" placeholder="Chọn giờ" class="mb-2" @input="handleDateChange"
                        :value="selectedTime"></b-form-timepicker>
                </b-form-group>

                <!-- Tổng số lượng -->
                <b-form-group label="Tổng số lượng:" label-for="input-number">
                    <b-form-input id="input-number" v-model="data.TongSoLuong" type="number" step="1" required
                        placeholder="Nhập đơn giá" disabled></b-form-input>
                </b-form-group>

                <!-- Tổng tiền -->
                <b-form-group label="Tổng tiền:" label-for="input-number">
                    <b-form-input id="input-number" v-model="data.TongTien" type="number" step="1000" required
                        placeholder="Nhập đơn giá" disabled></b-form-input>
                </b-form-group>

                <!-- Mã sinh viên -->
                <b-form-group label="Mã sinh viên:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.MaSV" required placeholder="Nhập Mã sinh viên"></b-form-input>
                    <small v-if="dataerror.MaSV" class="text-danger">{{ dataerror.MaSV }}</small>
                </b-form-group>

                <!-- Tên -->
                <b-form-group label="Tên:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.TenSV" required placeholder="Nhập tên"></b-form-input>
                    <small v-if="dataerror.TenSV" class="text-danger">{{ dataerror.TenSV }}</small>
                </b-form-group>

                <!-- Số điện thoại -->
                <b-form-group label="Số điện thoại:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.SDT" required placeholder="Nhập số điện thoại"></b-form-input>
                    <small v-if="dataerror.SDT" class="text-danger">{{ dataerror.SDT }}</small>
                </b-form-group>

                <!-- Địa chỉ nhận hàng -->
                <b-form-group label="Địa chỉ nhận hàng:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.DiaChiNhanHang" required placeholder="Nhập Địa chỉ nhận hàng"></b-form-input>
                    <small v-if="dataerror.DiaChiNhanHang" class="text-danger">{{ dataerror.DiaChiNhanHang }}</small>
                </b-form-group>

                <!-- Ghi chú -->
                <b-form-group label="Ghi chú:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.GhiChu" placeholder="Nhập Ghi chú"></b-form-input>
                    <small v-if="dataerror.GhiChu" class="text-danger">{{ dataerror.GhiChu }}</small>
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Thêm</b-button>
            </b-form>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import HoaDonService from '~/services/api/HoaDonService';
import Swal from 'sweetalert2';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import moment from 'moment';

export default {
    data() {
        return {
            data: {
                NgayXuat: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                NgayNhanHang: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                TongSoLuong: 0,
                TongTien: 0,
                isGroup:0,
                MaSV:'',
                TenSV:'',
                SDT:'',
                DiaChiNhanHang:'',
                GhiChu:'',
                idTrangThai: 1,
                idNhanVien: 1,
                idKhachHang: 1
            },
            dataerror: {
            },
            selectedDate: new Date(),
            selectedTime: '00:00:00',
        };
    },
    async mounted() {
        this.getCurrentStaff();
    },
    methods: {
        handleDateChange() {
            this.data.NgayNhanHang = `${this.selectedDate} ${this.selectedTime}`;
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
                this.formattedModifiedDate(this.data.NgayXuat);
                this.formattedModifiedDate(this.data.NgayNhanHang);
                await HoaDonService.insert(this.$axios, this.data);
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
        getCurrentStaff(){
            try{
                const response = this.$login.getLogin();
                this.data.idNhanVien = response.length !== 0 ? response[0].id : null;
                console.log(response);
            }catch{
                console.log('error không ai đăng nhập');
            }
        }
    }
}
</script>
  
<style scoped>
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
  