export default {
    login(axios, credentials) {
      return axios.post('/api/login', credentials);
    }
  }