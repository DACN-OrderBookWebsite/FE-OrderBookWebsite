<template>
    <div>
        <Header></Header>
        <div class="user-create-container border">
            <h1>Thêm Chức vụ mới</h1>
            <b-form @submit.prevent="confirmAndCreate">
                <!-- Tên Người Dùng -->
                <b-form-group label="Tên:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.name" required placeholder="Nhập tên"></b-form-input>
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Thêm</b-button>
            </b-form>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import ChucVuService from '~/services/api/ChucVuService';
import Swal from 'sweetalert2';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export default {
    data() {
        return {
            data: {
                name: "",
            },
            roleOptions: [],
        };
    },
    methods: {
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
        async create() {
            try {
                await ChucVuService.insert(this.$axios, this.data);
                Swal.fire(
                    'Thêm thành công!',
                    'Dữ liệu đã được thêm.',
                    'success'
                );
            } catch (error) {
                console.error(error);
                Swal.fire(
                    'Thêm Thất Bại!',
                    'Đã có lỗi xảy ra khi thêm dữ liệu.',
                    'error'
                );
            }
        },
    }
}
</script>
  
<style scoped>
.user-create-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}
</style>
  