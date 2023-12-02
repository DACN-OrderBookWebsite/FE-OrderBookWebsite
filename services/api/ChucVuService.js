export default {
    getAll(axios) {
      return axios.$get('/api/ChucVu');
    },
    create(axios, Data) {
      return axios.$post('/api/ChucVu', Data);
    },
    update(axios, id, Data) {
      return axios.$put(`/api/ChucVu/${id}`, Data);
    },
    delete(axios, id) {
      return axios.$delete(`/api/ChucVu/${id}`);
    },
    getDataByid(axios, id) {
      return axios.$get(`/api/ChucVu/${id}`);
    },
  }
  