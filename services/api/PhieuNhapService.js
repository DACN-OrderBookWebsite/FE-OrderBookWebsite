export default {
    getData(axios) {
      return axios.get(`/api/PhieuNhap`);
    },
    insert(axios, data) {
      return axios.post(`/api/PhieuNhap`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/PhieuNhap/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/PhieuNhap/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/PhieuNhap/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/PhieuNhap/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/PhieuNhap/${id}/edit`);
    },
    getDataByidTrangThai(axios, idTrangThai){
        return axios.get(`/api/PhieuNhap/${idTrangThai}/getDataByidTrangThai`);
    }
  };
  