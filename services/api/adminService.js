export default {
  getUsers(axios) {
    return axios.get(`/api/NguoiDung`);
  },
  addUser(axios, userData) {
    return axios.post(`/api/NguoiDung`, userData);
  },
  updateUser(axios, userId, userData) {
    return axios.put(`/api/NguoiDung/${userId}`, userData);
  },
  getUserById(axios, userId) {
    return axios.$get(`/api/NguoiDung/${userId}`);
  },
  deleteUser(axios, userId) {
    return axios.delete(`/api/NguoiDung/${userId}`);
  },
  changeUserPassword(axios, userId, newPassword) {
    return axios.put(`/api/NguoiDung/${userId}/change-password`, { newPassword });
  },
  getPermission(axios) {
    return axios.get('/api/NguoiDung/create');
  },
  resetPassword(axios, userId, MatKhau, MatKhau_confirmation) {
    return axios.put(`/api/NguoiDung/${userId}/changePassword`, { MatKhau, MatKhau_confirmation });
  },
};
