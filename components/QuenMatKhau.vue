<template>
  <div class="container">
    <Header></Header>
    <b-row class="justify-content-md-center">
      <b-col md="6">
        <b-card class="mt-5">
          <b-card-title class="text-center">Quên Mật Khẩu</b-card-title>
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Mật Khẩu Cũ:" label-for="old-password-input">
              <b-form-input
                id="old-password-input"
                v-model="oldpassword"
                type="password"
                required
                placeholder="Enter Old Password"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Mật Khẩu Mới:" label-for="password-input">
              <b-form-input
                id="username-input"
                v-model="password"
                type="password"
                required
                placeholder="Enter Password"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Xác Nhận Mật Khẩu Mới:"
              label-for="confirm-password-input"
            >
              <b-form-input
                id="password-input"
                type="password"
                v-model="confirmpassword"
                required
                placeholder="Enter Confirm Password"
              ></b-form-input>
            </b-form-group>
            <div class="button-submit">
              <b-button type="submit" variant="primary" block>Submit</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>
  
  <script>
import HeroSection from "./HeroSection";
import Header from "./Header";
import Footer from "./Footer";
import NguoiDungService from "~/services/api/NguoiDungService";
import Swal from "sweetalert2";

export default {
  name: "QuenMatKhau",
  components: { HeroSection, Footer, Header },
  data() {
    return {
      oldpassword: "",
      password: "",
      confirmpassword: "",
    };
  },
  mounted() {
    //   this.fetch();
  },
  methods: {
    fetch() {
      const response = this.$login.getLogin();
      if (response.length !== 0) {
        this.$router.push("/");
      }
    },
    async onSubmit() {
      try {
      } catch (error) {
        console.error("Error during change password:", error);
      }
    },
  },
};
</script>
  
  <style scoped>
.container {
  max-width: unset !important;
  margin: 15px;
}
.text-center {
  font-size: 30px;
}
.button-submit {
    display: flex;
    margin-top: 15px;
    justify-content: center;
}
.mt-5 {
  width: 50%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
/* Card styling */
.b-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: none; /* Removes the default card border */
  border-radius: 8px; /* Optional: for rounded corners */
}

.b-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Card title styling */
.b-card-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: bold;
}

/* Form input styling */
.b-form-input {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
}

.b-form-input:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Form group styling */
.b-form-group {
  margin-bottom: 1rem;
}
.b-form-group label {
  font-size: 22px !important; /* Reduced font size for labels */
  color: #555; /* Optional: adjust the color as needed */
}
/* Button styling */
.b-button {
  background-color: #0056b3; /* Primary button color */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.b-button:hover,
.b-button:active,
.b-button:focus {
  background-color: #004494; /* Darken button on hover/focus/active */
}
</style>
  