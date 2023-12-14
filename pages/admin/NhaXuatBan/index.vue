<template>
  <div>
    <Header></Header>
    <AdminSection></AdminSection>
    <div id="table_content">
      <div class="h1 text-center">Danh sách nhà xuất bản</div>
      <b-button @click="add">Thêm</b-button>
      <b-table :items="data" :fields="fields" class="text-center">
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
import NhaXuatBanService from '~/services/api/NhaXuatBanService';
import PhanQuyenService from '~/services/api/PhanQuyenService';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import AdminSection from '../../../components/AdminSection.vue';

export default {
  components: { Footer, Header, AdminSection },
  data() {
    return {
      data: [],
      fields: [
        { key: 'name', label: 'Tên' },
        { key: 'actions', label: 'Hành Động' }
      ],
      quyen: 7
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.fetch();
  },
  computed: {
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
    async fetch() {
      try {
        const response = await NhaXuatBanService.getData(this.$axios);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    add() {
      this.$router.push('/admin/NhaXuatBan/create');
    },
    edit(id) {
      this.$router.push(`/admin/NhaXuatBan/edit/${id}`);
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
        await NhaXuatBanService.delete(this.$axios, id);
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
</style>
  