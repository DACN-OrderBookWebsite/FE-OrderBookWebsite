export default {
    getData(axios) {
      return axios.get(`/api/TrangThaiDonHang`);
    },
    getItem(axios, id) {
      return axios.$get(`/api/TrangThaiDonHang/${id}`);
    },
  };
  