<template>
    <div>
        <Header></Header>
        <AdminSection></AdminSection>
        <div class="user-create-container border">
            <h1 class="text-center">Thêm Thể Loại mới</h1>
            <b-form @submit.prevent="confirmAndCreate">
                <!-- Tên Người Dùng -->
                <b-form-group label="Tên:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.name" required placeholder="Nhập tên"></b-form-input>
                    <small v-if="dataerror.name" class="text-danger">{{ dataerror.name }}</small>
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Thêm</b-button>
            </b-form>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import TheLoaiService from '~/services/api/TheLoaiService';
import PhanQuyenService from '~/services/api/PhanQuyenService';
import Swal from 'sweetalert2';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import AdminSection from '../../../../components/AdminSection.vue';

export default {
    data() {
        return {
            data: {
                name: "",
            },
            dataerror: {
                name: ""
            },
            roleOptions: [],
            quyen: 6
        };
    },
    async mounted() {
        await this.checkQuyen();
    },
    methods: {
        async checkQuyen() {
            const response = this.$login.getLogin();
            if (response.length === 0) {
                this.$router.push('/loginkeycloak');
            }
            else {
                const kq = await PhanQuyenService.checkQuyen(this.$axios, response[0].id, this.quyen);
                console.log(kq.data.result);
                if (kq.data.result === false) {
                    this.$router.push('/');
                }
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
        async create() {
            try {
                await TheLoaiService.insert(this.$axios, this.data);
                Swal.fire('Thêm thành công!', 'Dữ liệu đã được thêm.', 'success');
            }
            catch (error) {
                this.dataerror = error.response.data.errors;
                Swal.fire('Thêm Thất Bại!', 'Đã có lỗi xảy ra khi thêm dữ liệu.', 'error');
            }
        },
    },
    components: { AdminSection }
}
</script>
  
<style scoped>
.user-create-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}
</style>
  