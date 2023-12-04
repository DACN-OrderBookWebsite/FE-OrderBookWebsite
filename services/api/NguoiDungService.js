export default {
    getData(axios) {
      return axios.get(`/api/NguoiDung`);
    },
    insert(axios, data) {
      return axios.post(`/api/NguoiDung`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/NguoiDung/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/NguoiDung/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/NguoiDung/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/NguoiDung/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/NguoiDung/${id}/edit`);
    },
    resetPassword(axios, userId, MatKhau, MatKhau_confirmation) {
      return axios.put(`/api/NguoiDung/${userId}/changePassword`, { MatKhau, MatKhau_confirmation });
    },
  };
  