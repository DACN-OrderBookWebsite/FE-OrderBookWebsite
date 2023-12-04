<template>
    <div>
        <Header></Header>
        <div class="user-create-container border">
            <h1 class="text-center">Chỉnh sửa sách</h1>
            <b-form @submit.prevent="confirmUpdate">
                <!-- Tên -->
                <b-form-group label="Tên:" label-for="input-name">
                    <b-form-input id="input-name" v-model="data.name" required placeholder="Nhập tên"></b-form-input>
                    <small v-if="dataerror.name" class="text-danger">{{ dataerror.name }}</small>
                </b-form-group>

                <!-- Thể loại -->
                <b-form-group label="Thể loại:" label-for="input-role">
                    <b-form-select id="input-role" v-model="data.idTheLoai" required :options="TheLoaiOption"
                        class="max-width-select"></b-form-select>
                    <small v-if="dataerror.idTheLoai" class="text-danger">{{ dataerror.idTheLoai }}</small>
                </b-form-group>

                <!-- Nhà xuất bản -->
                <b-form-group label="Nhà xuất bản:" label-for="input-role">
                    <b-form-select id="input-role" v-model="data.idNhaXuatBan" required :options="NhaXuatBanOption"
                        class="max-width-select"></b-form-select>
                    <small v-if="dataerror.idNhaXuatBan" class="text-danger">{{ dataerror.idNhaXuatBan }}</small>
                </b-form-group>

                <!-- Tác giả -->
                <b-form-group label="Tác giả:" label-for="input-role">
                    <b-form-select id="input-role" v-model="data.idTacGia" required :options="TacGiaOption"
                        class="max-width-select"></b-form-select>
                    <small v-if="dataerror.idTacGia" class="text-danger">{{ dataerror.idTacGia }}</small>
                </b-form-group>

                <!-- Đơn giá -->
                <b-form-group label="Đơn giá:" label-for="input-number">
                    <b-form-input id="input-number" v-model="data.DonGia" type="number" step="1000" required
                        placeholder="Nhập đơn giá"></b-form-input>
                </b-form-group>

                <!-- Số lượng tồn -->
                <b-form-group label="Số lượng tồn:" label-for="input-number">
                    <b-form-input id="input-number" v-model="data.SoLuongTon" type="number" step="1" required
                        placeholder="Nhập đơn giá" disabled></b-form-input>
                </b-form-group>

                <!-- Trạng Thái Hoạt Động -->
                <b-form-group label="Trạng Thái Hoạt Động:" label-for="input-disabled">
                    <b-form-checkbox id="input-disabled" v-model="data.Disabled">
                        Ngừng kinh doanh:
                    </b-form-checkbox>
                </b-form-group>

                <!-- Ảnh -->
                <b-form-group label="Ảnh:" label-for="image-input">
                    <b-form-file id="image-input" v-model="data.Anh" accept="image/*"></b-form-file>
                    <img :src="data.Anh" alt="Ảnh" class="max-width-height-picture" />
                </b-form-group>

                <!-- Nút thêm -->
                <b-button type="submit" variant="primary">Cập nhật</b-button>
            </b-form>
        </div>
        <Footer></Footer>
    </div>
</template>
  
<script>
import SachService from '~/services/api/SachService';
import PictureService from '~/services/api/PictureService';
import Swal from 'sweetalert2';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export default {
    data() {
        return {
            data: {
            },
            dataerror: {
            },
            TheLoaiOption: [],
            NhaXuatBanOption: [],
            TacGiaOption: [],
        };
    },
    async mounted() {
        await this.getEdit();
        await this.fetch();
    },
    methods: {
        async fetch() {
            try {
                const response = await SachService.getItem(this.$axios, this.$route.params.id);
                this.data = response;
                this.editAnh();
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
            console.log(this.data);
            this.update();
          }
        });
      },
      async update() {
        try {  
          await SachService.update(this.$axios, this.$route.params.id, this.data);
          Swal.fire(
            'Cập nhật!',
            'Thông tin đã được cập nhật thành công.',
            'success'
          );
          this.$router.push('/admin/Sach');
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
                const response = await SachService.getEdit(this.$axios, this.$route.params.id);
                this.TheLoaiOption = response.data.TheLoai.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
                this.NhaXuatBanOption = response.data.NhaXuatBan.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
                this.TacGiaOption = response.data.TacGia.map((item) => {
                    return {
                        value: item.id,
                        text: item.name,
                    };
                });
            } catch (error) {
                console.error("Error while fetching create form:", error);
            }
        },
        async getAnh(event) {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
                // Lấy tên của tệp
                const file = fileInput.files[0];
                // Lưu đối tượng File vào this.data.Anh nếu cần thiết
                this.data.Anh = file.name;

                const response = await PictureService.getSachPicture(this.data.Anh);
                this.URLAnh = response;
                this.data.Anh = this.URLAnh;
            } else {
                console.log("Không có tệp nào được chọn");
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
  