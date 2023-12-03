export default {
    getData(axios) {
      return axios.get(`/api/ChucVu`);
    },
    insert(axios, data) {
      return axios.post(`/api/ChucVu`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/ChucVu/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/ChucVu/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/ChucVu/${id}`);
    },
  };
  