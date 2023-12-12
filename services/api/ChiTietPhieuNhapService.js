export default {
    getData(axios) {
      return axios.get(`/api/ChiTietPhieuNhap`);
    },
    insert(axios, data) {
      return axios.post(`/api/ChiTietPhieuNhap`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/ChiTietPhieuNhap/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/ChiTietPhieuNhap/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/ChiTietPhieuNhap/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/ChiTietPhieuNhap/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/ChiTietPhieuNhap/${id}/edit`);
    },
    getDataByidPhieuNhapAndNameOfSanPham(axios, idPhieuNhap) {
      return axios.get(`/api/ChiTietPhieuNhap/${idPhieuNhap}/getDataByidPhieuNhapAndNameOfSanPham`);
    },
    getDataByCheckSanPhamIsInsertedToPhieuNhap(axios, idPhieuNhap, idSanPham){
      return axios.get(`/api/ChiTietPhieuNhap/${idPhieuNhap}/${idSanPham}/getDataByCheckSanPhamIsInsertedToPhieuNhap`)
    },
    calculateTongTienOfPhieuNhap(axios, idPhieuNhap){
      return axios.get(`/api/ChiTietPhieuNhap/${idPhieuNhap}/calculateTongTienOfPhieuNhap`)
    },
    sumSoLuongOfPhieuNhap(axios, idPhieuNhap){
      return axios.get(`/api/ChiTietPhieuNhap/${idPhieuNhap}/sumSoLuongOfPhieuNhap`)
    },
    deleteByPhieuNhap(axios, idPhieuNhap){
      return axios.delete(`/api/ChiTietPhieuNhap/${idPhieuNhap}/deleteByPhieuNhap`)
    },
    getDataByPhieuNhap(axios, idPhieuNhap) {
      return axios.get(`/api/ChiTietPhieuNhap/${idPhieuNhap}/getDataByPhieuNhap`);
    },
  };
  