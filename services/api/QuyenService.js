export default {
    getData(axios) {
      return axios.get(`/api/Quyen`);
    },
    insert(axios, data) {
      return axios.post(`/api/Quyen`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/Quyen/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/Quyen/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/Quyen/${id}`);
    },
  };
  