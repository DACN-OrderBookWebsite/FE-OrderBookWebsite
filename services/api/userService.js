export default {
  getAllUsers(axios) {
    return axios.$get('/api/NguoiDung');
  },
  createUser(axios, userData) {
    return axios.$post('/api/NguoiDung', userData);
  },
  updateUser(axios, userId, userData) {
    return axios.$put(`/api/NguoiDung/${userId}`, userData);
  },
  deleteUser(axios, userId) {
    return axios.$delete(`/api/NguoiDung/${userId}`);
  },
  getUserById(axios, userId) {
    return axios.$get(`/api/NguoiDung/${userId}`);
  },
  uploadUserAvatar(axiosInstance, file) {
    let formData = new FormData();
    formData.append('avatar', file);

    return axiosInstance.post(`/api/upload-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
}
