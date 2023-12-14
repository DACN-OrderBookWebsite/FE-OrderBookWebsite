<template>
    <div>
        <Header></Header>
        <AdminSection></AdminSection>
        <div class="user-create-container border">
            <h1 class="text-center">Thêm Nhóm người dùng mới</h1>
            <b-form @submit.prevent="confirmAndCreate">
                <b-form-group label="Nhóm:" label-for="input-role">
                    <b-form-select id="input-role" v-model="data.idNhom" required :options="NhomOption"></b-form-select>
                    <small v-if="dataerror.name" class="text-danger">{{
                        dataerror.idNhom
                    }}</small>
                </b-form-group>

                <b-form-group label="Người dùng:" label-for="input-role">
                    <b-form-select id="input-role" v-model="data.idNguoiDung" required
                        :options="NguoiDungOption"></b-form-select>
                    <small v-if="dataerror.name" class="text-danger">{{
                        dataerror.idNguoiDung
                    }}</small>
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Thêm</b-button>
            </b-form>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import NhomNguoiDungService from "~/services/api/NhomNguoiDungService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import AdminSection from "../../../../components/AdminSection.vue";

export default {
    data() {
        return {
            data: {
                idNhom: "",
                idNguoiDung: "",
            },
            dataerror: {
                idNhom: "",
                idNguoiDung: "",
            },
            NhomOption: [],
            NguoiDungOption: [],
            quyen: 4
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
                await NhomNguoiDungService.insert(this.$axios, this.data);
                Swal.fire("Thêm thành công!", "Dữ liệu đã được thêm.", "success");
            }
            catch (error) {
                this.dataerror = error.response.data.errors;
                Swal.fire("Thêm Thất Bại!", "Đã có lỗi xảy ra khi thêm dữ liệu.", "error");
            }
        },
        async getRolePermission() {
            try {
                const response = await NhomNguoiDungService.getPermission(this.$axios);
                console.log(response);
                this.NhomOption = response.data.Nhom.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
                this.NguoiDungOption = response.data.NguoiDung.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
            }
            catch (error) {
                console.error("Error while fetching create form:", error);
            }
        },
    },
    components: { AdminSection }
};
</script>

<style scoped>
.user-create-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}
</style>
