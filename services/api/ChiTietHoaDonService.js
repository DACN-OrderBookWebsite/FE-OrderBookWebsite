export default {
    getData(axios) {
      return axios.get(`/api/ChiTietHoaDon`);
    },
    insert(axios, data) {
      return axios.post(`/api/ChiTietHoaDon`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/ChiTietHoaDon/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/ChiTietHoaDon/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/ChiTietHoaDon/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/ChiTietHoaDon/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/ChiTietHoaDon/${id}/edit`);
    },
    getDataByidHoaDonAndNameOfSanPham(axios, idHoaDon) {
      return axios.get(`/api/ChiTietHoaDon/${idHoaDon}/getDataByidHoaDonAndNameOfSanPham`);
    },
    getDataByCheckSanPhamIsInsertedToHoaDon(axios, idHoaDon, idSanPham){
      return axios.get(`/api/ChiTietHoaDon/${idHoaDon}/${idSanPham}/getDataByCheckSanPhamIsInsertedToHoaDon`)
    },
    calculateTongTienOfHoaDon(axios, idHoaDon){
      return axios.get(`/api/ChiTietHoaDon/${idHoaDon}/calculateTongTienOfHoaDon`)
    },
    sumSoLuongOfHoaDon(axios, idHoaDon){
      return axios.get(`/api/ChiTietHoaDon/${idHoaDon}/sumSoLuongOfHoaDon`)
    },
    deleteByHoaDon(axios, idHoaDon){
      return axios.delete(`/api/ChiTietHoaDon/${idHoaDon}/deleteByHoaDon`)
    },
    getDataByHoaDon(axios, idHoaDon) {
      return axios.get(`/api/ChiTietHoaDon/${idHoaDon}/getDataByHoaDon`);
    },
  };
  