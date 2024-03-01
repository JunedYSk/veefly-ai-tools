export default {
  namespaced: true,
  state: {
    loading: false,
    videoLists: [],
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, val) {
      state.loading = val
    },
    UPDATE_VIDEO_LISTS(state, val) {
      state.videoLists = val
    },
  },
  actions: {},
}
