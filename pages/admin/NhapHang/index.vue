<template>
    <div>
        <Header></Header>
        <div id="table_content">
            <div class="h1 text-center">Danh sách phiếu nhập</div>
            <b-button @click="add">Thêm</b-button>

            <!-- Trạng thái -->
            <b-form-group label="Trạng thái:" label-for="input-role" class="d-flex align-items-center">
                <b-form-select id="input-role" v-model="TrangThai" required :options="TrangThaiOption"
                    class="max-width-select" @change="handleTrangThaiChange"></b-form-select>
            </b-form-group>

            <b-table :items="data" :fields="fields" class="text-center">
                <template #cell(idTrangThai)="data">
                    <label>{{ formatTrangThai(data.item.idTrangThai) }}</label>
                </template>
                <template #cell(actions)="data">
                    <b-button size="sm" variant="primary" @click="edit(data.item.id)">Sửa</b-button>
                    <b-button size="sm" variant="danger" @click="confirmAndRemove(data.item.id)">Xóa</b-button>
                </template>
            </b-table>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import PhieuNhapService from '~/services/api/PhieuNhapService';
import TrangThaiDonHangService from '~/services/api/TrangThaiDonHangService';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";

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
            TrangThaiOption: []
        };
    },
    async mounted() {
        await this.loadTrangThai();
        await this.fetch(1);
    },
    computed: {
    },
    methods: {
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
        async fetch(TrangThai) {
            try {
                const response = await PhieuNhapService.getDataByidTrangThai(this.$axios, TrangThai);
                this.data = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        add() {
            this.$router.push('/admin/PhieuNhap/create');
        },
        edit(id) {
            this.$router.push(`/admin/PhieuNhap/edit/${id}`);
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
                await PhieuNhapService.delete(this.$axios, id);
                await this.fetch();
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

.b-form-group {
    display: flex;
    align-items: center;
}
</style>
  