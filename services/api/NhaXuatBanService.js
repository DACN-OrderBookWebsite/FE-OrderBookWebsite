export default {
    getData(axios) {
      return axios.get(`/api/NhaXuatBan`);
    },
    insert(axios, data) {
      return axios.post(`/api/NhaXuatBan`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/NhaXuatBan/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/NhaXuatBan/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/NhaXuatBan/${id}`);
    },
  };
  