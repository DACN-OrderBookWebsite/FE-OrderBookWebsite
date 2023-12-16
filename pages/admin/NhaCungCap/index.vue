<template>
  <div class="body-container">
    <Header></Header>
    <SectionBar></SectionBar>
    <b-row>
      <b-col cols="12" md="2" class="p-1 sidebar-nav">
        <div class="position-sticky top-0">
          <VerticalSidebar />
        </div>
      </b-col>
      <b-col cols="12" md="10">
        <div id="table_content">
          <div class="h1 text-center">Danh sách nhà cung cấp</div>
           
          <b-table :items="data" :fields="fields" class="text-center">
            <template #cell(actions)="data">
              <b-button size="sm" variant="primary" @click="edit(data.item.id)"
                >Sửa</b-button
              >
              <b-button
                size="sm"
                variant="danger"
                @click="confirmAndRemove(data.item.id)"
                >Xóa</b-button
              >
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
<script>
import NhaCungCapService from "~/services/api/NhaCungCapService";
import PhanQuyenService from "~/services/api/PhanQuyenService";
import VerticalSidebar from "~/layouts/full-layout/vertical-sidebar/VerticalSidebar.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Swal from "sweetalert2";

export default {
  components: { Footer, Header, VerticalSidebar },
  data() {
    return {
      data: [],
      fields: [
        { key: "name", label: "Tên" },
        { key: "SDT", label: "Số điện thoại" },
        { key: "DiaChi", label: "Địa chỉ" },
        { key: "Email", label: "Email" },
        { key: "actions", label: "Hành Động" },
      ],
      quyen: 10,
    };
  },
  async mounted() {
    await this.checkQuyen();
    await this.fetch();
  },
  computed: {},
  methods: {
    async checkQuyen() {
      const response = this.$login.getLogin();
      if (response.length === 0) {
        this.$router.push("/loginkeycloak");
      } else {
        const kq = await PhanQuyenService.checkQuyen(
          this.$axios,
          response[0].id,
          this.quyen
        );
        console.log(kq.data.result);
        if (kq.data.result === false) {
          this.$router.push("/");
        }
      }
    },
    async fetch() {
      try {
        const response = await NhaCungCapService.getData(this.$axios);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    add() {
      this.$router.push("/admin/NhaCungCap/create");
    },
    edit(id) {
      this.$router.push(`/admin/NhaCungCap/edit/${id}`);
    },
    async confirmAndRemove(id) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Bạn sẽ không thể hoàn nguyên hành động này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
        cancelButtonText: "Không, hủy bỏ!",
      });

      if (result.isConfirmed) {
        this.remove(id);
      }
    },
    async remove(id) {
      try {
        await NhaCungCapService.delete(this.$axios, id);
        await this.fetch();
        Swal.fire("Đã Xóa!", "Dữ liệu đã được xóa.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Xóa Thất Bại!",
          "Đã có lỗi xảy ra khi xóa dữ liệu.",
          "error"
        );
      }
    },
  },
};
</script>
  
<style scoped>
#table_content {
    background-color: white;
}
.body-container {
    background-color: #F1F1F1;
}
.sidebar-nav {
    margin-top: 15px;
    background-color: white;
}
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
  