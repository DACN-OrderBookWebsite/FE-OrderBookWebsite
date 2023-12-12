export default {
    getData(axios) {
      return axios.get(`/api/PhanQuyen`);
    },
    insert(axios, data) {
      return axios.post(`/api/PhanQuyen`, data);
    },
    update(axios, id, data) {
      return axios.put(`/api/PhanQuyen/${id}`, data);
    },
    getItem(axios, id) {
      return axios.$get(`/api/PhanQuyen/${id}`);
    },
    delete(axios, id) {
      return axios.delete(`/api/PhanQuyen/${id}`);
    },
    getPermission(axios) {
      return axios.get('/api/PhanQuyen/create');
    },
    getEdit(axios, id) {
      return axios.get(`/api/PhanQuyen/${id}/edit`);
    },
    
  };
  