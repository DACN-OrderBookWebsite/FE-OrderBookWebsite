export default {
    getData(axios) {
      return axios.get(`/api/Sach`);
    },
    insert(axios, data) {
      return axios.post(`/api/Sach`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/Sach/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/Sach/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/Sach/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/Sach/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/Sach/${id}/edit`);
    },
    updateSoLuongSanPhamByPhieuNhap(axios, id, data) {
      return axios.put(`/api/Sach/${id}/updateSoLuongSanPhamByPhieuNhap`, data);
    },
    getDataSortByTheLoai(axios) {
      return axios.get(`/api/Sach/getDataSortByTheLoai`);
    },
    showDataWithoutID(axios, id) {
      return axios.get(`/api/Sach/${id}/showDataWithoutID`);
    },
  };
  