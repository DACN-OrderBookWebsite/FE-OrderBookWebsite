export default {
    getData(axios) {
      return axios.get(`/api/TacGia`);
    },
    insert(axios, data) {
      return axios.post(`/api/TacGia`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/TacGia/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/TacGia/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/TacGia/${id}`);
    },
  };
  