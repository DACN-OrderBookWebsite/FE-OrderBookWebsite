export default {
    getData(axios) {
      return axios.get(`/api/NhomNguoiDung`);
    },
    insert(axios, data) {
      return axios.post(`/api/NhomNguoiDung`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/NhomNguoiDung/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/NhomNguoiDung/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/NhomNguoiDung/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/NhomNguoiDung/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/NhomNguoiDung/${id}/edit`);
    },
  };
  