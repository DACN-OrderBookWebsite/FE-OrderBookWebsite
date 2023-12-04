export default {
    getData(axios) {
      return axios.get(`/api/NhaCungCap`);
    },
    insert(axios, data) {
      return axios.post(`/api/NhaCungCap`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/NhaCungCap/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/NhaCungCap/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/NhaCungCap/${id}`);
    },
  };
  