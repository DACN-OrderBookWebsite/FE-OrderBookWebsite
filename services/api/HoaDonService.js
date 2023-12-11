export default {
    getData(axios) {
      return axios.get(`/api/HoaDon`);
    },
    insert(axios, data) {
      return axios.post(`/api/HoaDon`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/HoaDon/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/HoaDon/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/HoaDon/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/HoaDon/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/HoaDon/${id}/edit`);
    },
    showDataByMaSV(axios, MaSV){
        return axios.get(`/api/HoaDon/${MaSV}/showDataByMaSV`);
    },
    getDataByidTrangThai(axios, idTrangThai){
      return axios.get(`/api/HoaDon/${idTrangThai}/getDataByidTrangThai`);
    }
  };
  