<template>
    <div>
        <Header></Header>
        <b-container>
            <b-row class="justify-content-md-center">
                <b-col md="6">
                    <b-card class="mt-5">
                        <b-card-title class="text-center">Chỉnh Sửa Nhóm người dùng</b-card-title>
                        <b-form @submit.prevent="confirmUpdate">

                            <b-form-group label="Nhóm:" label-for="input-role">
                                <b-form-select id="input-role" v-model="data.idNhom" required
                                    :options="NhomOption"></b-form-select>
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

                            <b-button type="submit" variant="primary" block>Cập Nhật</b-button>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <Footer></Footer>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import NhomNguoiDungService from '~/services/api/NhomNguoiDungService';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import moment from 'moment';

export default {
    components: { Footer, Header },
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
        };
    },
    async mounted() {
        await this.getEdit();
        await this.fetch();
    },
    methods: {
        async fetch() {
            try {
                const response = await NhomNguoiDungService.getItem(this.$axios, this.$route.params.id);
                this.data = response;
            } catch (error) {
                console.error(error);
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
                    console.log(123);
                    this.update();
                }
            });
        },
        async update() {
            try {
                await NhomNguoiDungService.update(this.$axios, this.$route.params.id, this.data);
                Swal.fire(
                    'Cập nhật!',
                    'Thông tin đã được cập nhật thành công.',
                    'success'
                );
                this.$router.push('/admin/NhomNguoiDung');
            } catch (error) {
                this.dataerror = error.response.data.errors;
                Swal.fire(
                    'Lỗi!',
                    'Có lỗi xảy ra khi cập nhật thông tin.',
                    'error'
                );
            }
        },
        async getEdit() {
            try {
                const response = await NhomNguoiDungService.getEdit(this.$axios, this.$route.params.id);
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
            } catch (error) {
                console.error("Error while fetching create form:", error);
            }
        },

    }
};
</script>
  
<style scoped>
/* Add your CSS here */
</style>
  