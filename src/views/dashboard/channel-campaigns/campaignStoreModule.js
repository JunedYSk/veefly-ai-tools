import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchPackages(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/channels', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
