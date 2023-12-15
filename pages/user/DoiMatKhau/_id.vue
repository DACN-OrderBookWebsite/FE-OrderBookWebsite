<template>
  <div>
    <QuenMatKhau></QuenMatKhau>
  </div>
</template>
    
  <script>
import Swal from "sweetalert2";
import QuenMatKhau from "~/components/QuenMatKhau.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: { Footer, Header, QuenMatKhau },
  data() {
    return {
      data: {},
      dataerror: {
        name: "",
      },
      quyen: 1,
    };
  },
  async mounted() {

  },
  methods: {
    confirmUpdate() {
      Swal.fire({
        title: "Xác nhận cập nhật",
        text: "Bạn có chắc chắn muốn cập nhật thông tin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, cập nhật!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(123);
          this.update();
        }
      });
    },
    async update() {
      try {
        await ChucVuService.update(
          this.$axios,
          this.$route.params.id,
          this.data
        );
        Swal.fire(
          "Cập nhật!",
          "Thông tin đã được cập nhật thành công.",
          "success"
        );
        this.$router.push("/admin/ChucVu");
      } catch (error) {
        this.dataerror = error.response.data.errors;
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật thông tin.", "error");
      }
    },
  },
};
</script>
    
  <style scoped>
/* Add your CSS here */
</style>
    