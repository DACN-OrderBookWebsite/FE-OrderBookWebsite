<template>
  <div class="container">
    <Header></Header>
    <hero-section></hero-section>
    <b-row class="justify-content-md-center">
      <b-col md="6">
        <b-card class="mt-5">
          <b-card-title class="text-center">Login to Your Account</b-card-title>
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Username:" label-for="username-input">
              <b-form-input
                id="username-input"
                v-model="username"
                required
                placeholder="Enter username"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Password:" label-for="password-input">
              <b-form-input
                id="password-input"
                type="password"
                v-model="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" block>Login</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <Footer></Footer>
  </div>
</template>

<script>
import HeroSection from "../../components/HeroSection";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import auth from "~/services/api/auth"; 
export default {
  name: 'login',
  components: { HeroSection, Footer, Header },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        const credentials = {
          TenDangNhap: this.username,
          MatKhau: this.password,
        };
        const response = await auth.login(this.$axios,credentials );
        console.error("111111111:", response);  
        if (response.data.user.idChucVu === 1) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};

</script>

<style scoped>
.container {
  max-width: unset !important;
}
.text-center {
  font-size: 30px;
}
.mt-5 {
  width: 50%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
/* Card styling */
.b-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: none; /* Removes the default card border */
  border-radius: 8px; /* Optional: for rounded corners */
}

.b-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

/* Form group styling */
.b-form-group {
  margin-bottom: 1rem;
}
.b-form-group label {
  font-size: 0.9rem; /* Reduced font size for labels */
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

.b-button:hover, .b-button:active, .b-button:focus {
  background-color: #004494; /* Darken button on hover/focus/active */
}
</style>
