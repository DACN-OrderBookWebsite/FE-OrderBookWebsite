export default {
    getData(axios) {
      return axios.get(`/api/Nhom`);
    },
    insert(axios, data) {
      return axios.post(`/api/Nhom`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/Nhom/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/Nhom/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/Nhom/${id}`);
    },
  };
  