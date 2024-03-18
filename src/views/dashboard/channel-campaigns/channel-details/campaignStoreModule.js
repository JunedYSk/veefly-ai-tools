import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCampaigns(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/campaigns', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
