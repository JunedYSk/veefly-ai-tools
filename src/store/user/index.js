export default {
  namespaced: true,
  state: {
    channels: [],
    loadingSelectedChannel: false,
    selectedChannel: null,
  },
  mutations: {
    UPDATE_LOADING_SELECTED_CHANNEL(state, val) {
      state.loadingSelectedChannel = val
    },
    UPDATE_CHANNELS(state, val) {
      state.channels = val
      if (state.channels.length) {
        state.selectedChannel = localStorage.getItem('selected_channel')
                                  ? JSON.parse(localStorage.getItem('selected_channel'))
                                  : state.channels[0]
      }
    },
    UPDATE_SELECTED_CHANNEL(state, val) {
      state.selectedChannel = val
    },
  },
  actions: {},
}
