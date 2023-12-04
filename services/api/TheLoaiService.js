export default {
    getData(axios) {
      return axios.get(`/api/TheLoai`);
    },
    insert(axios, data) {
      return axios.post(`/api/TheLoai`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/TheLoai/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/TheLoai/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/TheLoai/${id}`);
    },
  };
  