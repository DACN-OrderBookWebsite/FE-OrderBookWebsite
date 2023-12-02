<template>
  <b-container>
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
  </b-container>
</template>

<script>
import userService from '../../services/api/userService';
import Swal from 'sweetalert2';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async onSubmit() {
      try {
          const response = await userService.checkLogin(this.$axios, this.username,this.password);
          if(response.success === true){
            //kiểm tra phân quyền

            this.$router.push({ path: '/admin' });
          }else{
            Swal.fire(
              'Đăng nhập thất bại!',
              'Sai thông tin tên đăng nhập hoặc mật khẩu.',
              'error'
            );
          }
      } catch (error) {
          console.error('Error while fetching create form:', error);
      }

      // if (this.username === '2001200087' && this.password === '123456') {
      //   this.$router.push({ path: '/admin' }); // Navigate to the user page
      // } else {
      //   this.$router.push({ path: '/user' });
      // }
    },
  }
};
</script>

<style scoped>
/* Optional: Add your styling here */
</style>
