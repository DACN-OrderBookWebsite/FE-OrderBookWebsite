<template>
  <div>
    <QuenMatKhau></QuenMatKhau>
  </div>
</template>
    
  <script>
import QuenMatKhau from "~/components/QuenMatKhau.vue";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: { Footer, Header, QuenMatKhau },
  data() {
    return {
    };
  },
  async mounted() {
    await this.checkQuyen();
  },
  methods: {
    async checkQuyen() {
      const response = this.$login.getLogin();
      if (response.length === 0) {
        this.$router.push("/loginkeycloak");
      } else {
        if(this.$route.params.id !== response[0].id)
        {
          this.$router.push("/user/DoiMatKhau/" + response[0].id);
        }
      }
    },
  },
};
</script>
    
  <style scoped>
/* Add your CSS here */
</style>
    