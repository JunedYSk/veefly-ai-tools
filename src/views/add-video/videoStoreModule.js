import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchVideos(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/video/getChannelVideos', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
