<template>
  <div class="body-container">
    <Header></Header>
    <SectionBar></SectionBar>
    <b-row>
      <b-col cols="12" md="2" class="sidebar-nav">
        <div class="position-sticky top-0">
          <VerticalSidebar />
        </div>
      </b-col>
      <b-col cols="12" md="10">
        <div id="table_content">
          <div class="h1 text-center">Danh sách quyền</div>
           
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
import QuyenService from "~/services/api/QuyenService";
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
        { key: "actions", label: "Hành Động" },
      ],
    };
  },
  async mounted() {
    await this.fetch();
  },
  computed: {},
  methods: {
    async fetch() {
      try {
        const response = await QuyenService.getData(this.$axios);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    add() {
      this.$router.push("/admin/Quyen/create");
    },
    edit(id) {
      this.$router.push(`/admin/Quyen/edit/${id}`);
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
        await QuyenService.delete(this.$axios, id);
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
  background-color: #f1f1f1;
}
.sidebar-nav {
  margin-top: 15px;
  background-color: white;
}
.container-fluid {
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
  