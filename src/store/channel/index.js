import axios from "@axios"

export default {
  namespaced: true,
  state: {
    loading: false,
    params: {},
    filterError: null,
    filterResult: null,
    nextPageToken: null,
    prevPageToken: null,
    videoList: [],
    showPreviousNextButton: false,
    loadingMoreResult: false,

    // Search video
    loadingSearchResult: false,
    searchParams: {},
    searchError: null,
    searchResult: null,
    searchResultVideoList: [],
  },
  getters: {},
  mutations: {
    SET_LOADING(state, val) {
      state.loading = val
    },
    UPDATE_PARAMS(state, val) {
      state.params = val
    },
    SET_FILTER_ERROR(state, val) {
      state.filterError = val
    },
    SET_FILTER_SUCCESS(state, val) {
      state.filterResult = val.data.results
      state.nextPageToken = val.data.info?.nextPageToken ?? null
      state.prevPageToken = val.data.info?.prevPageToken ?? null
    },
    UPDATE_VIDEO_LIST(state, val) {
      state.videoList = val
    },
    ADD_TO_VIDEO_LIST(state, val) {
      if (!state.videoList.some(vid => vid.id.videoId == val.id.videoId)) {
        state.videoList.push(val)
      }
    },
    REMOVE_FROM_VIDEO_LIST(state, videoId) {
      state.videoList = state.videoList.filter(vid => vid.id.videoId != videoId)
    },
    SET_PREVIOUS_NEXT_BUTTON(state, val) {
      state.showPreviousNextButton = val
    },
    SET_MORE_RESULT_LOADING(state, val) {
      state.loadingMoreResult = val
    },
    SET_SEARCH_RESULT_LOADING(state, val) {
      state.loadingSearchResult = val
    },
    UPDATE_SEARCH_RESULT_PARAMS(state, val) {
      state.searchParams = val
    },
    SET_SEARCH_RESULT_ERROR(state, val) {
      state.searchError = val
    },
    SET_SEARCH_RESULT_SUCCESS(state, val) {
      state.searchResult = val.data.results
    },
    UPDATE_SEARCH_RESULT_VIDEO_LIST(state, val) {
      state.searchResultVideoList = val
    },
    ADD_TO_SEARCH_RESULT_VIDEO_LIST(state, val) {
      if (!state.searchResultVideoList.some(vid => vid.id.videoId == val.id.videoId)) {
        state.searchResultVideoList.push(val)
      }
    },
    REMOVE_FROM_SEARCH_RESULT_VIDEO_LIST(state, videoId) {
      state.searchResultVideoList = state.searchResultVideoList.filter(vid => vid.id.videoId != videoId)
    },
  },
  actions: {
    async getRecentVideos({ state, commit }) {
      try {
        let res = await axios.get("/video/getRecentVideos", { params: state.params })
        await commit('SET_FILTER_SUCCESS', res.data)
      } catch (error) {
        let err = err?.response?.data?.message || err?.response?.data || err?.response || err || 'Something went wrong'
        await commit('SET_FILTER_ERROR', err)
      }
    },
    async getPopularVideos({ state, commit }) {
      try {
        let res = await axios.get("/video/getReleventVideos", { params: state.params })
        await commit('SET_FILTER_SUCCESS', res.data)
      } catch (error) {
        let err = err?.response?.data?.message || err?.response?.data || err?.response || err || 'Something went wrong'
        await commit('SET_FILTER_ERROR', err)
      }
    },
    async getChannelVideos({ state, commit }) {
      try {
        let res = await axios.get("/video/getChannelVideos", { params: state.params })
        await commit('SET_FILTER_SUCCESS', res.data)
      } catch (error) {
        let err = err?.response?.data?.message || err?.response?.data || err?.response || err || 'Something went wrong'
        await commit('SET_FILTER_ERROR', err)
      }
    },
    async getVideosByTitle({ state, commit }) {
      try {
        let res = await axios.get("/video/getVideosByTitle", { params: state.searchParams })
        await commit('SET_SEARCH_RESULT_SUCCESS', res.data)
      } catch (error) {
        let err = err?.response?.data?.message || err?.response?.data || err?.response || err || 'Something went wrong'
        await commit('SET_SEARCH_RESULT_ERROR', err)
      }
    },
    filterPageChange({ commit, dispatch }, pageToken) {
      commit('UPDATE_PARAMS', { ...state.params, pageToken })
      dispatch('filterChange')
    },
    async filterChange({ state, commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      dispatch('reset')

      let { channelId, option, pageToken } = payload
      let params = { ...state.params, id: channelId, pageToken: null }

      if (payload.pageToken) {
        params = { ...state.params, pageToken }
      }

      commit('UPDATE_PARAMS', params)

      if (option == 1) { await dispatch('getRecentVideos') } // recent
      else if (option == 2) { await dispatch('getPopularVideos') } // popular
      // else if (option == 3) { await dispatch('getChannelVideos') } // manually
      else if (option == 3) { // manually
        await dispatch('getRecentVideos')

        let videoList = []
        videoList = videoList.concat(state.filterResult)
        commit('UPDATE_SEARCH_RESULT_VIDEO_LIST', videoList)
        commit('SET_LOADING', false)
        return
      }

      commit('SET_LOADING', false)

      if (state.filterError) { return }

      let videoList = []
      videoList = videoList.concat(state.filterResult)
      commit('UPDATE_VIDEO_LIST', videoList)

      let showPreviousNextButton = false
      if (option == 3) { showPreviousNextButton = true }
      commit('SET_PREVIOUS_NEXT_BUTTON', showPreviousNextButton)
    },
    async showMoreResult({ state, commit, dispatch }, payload) {
      commit('SET_MORE_RESULT_LOADING', true)

      let { channelId, pageToken } = payload
      let params = { ...state.params, id: channelId, pageToken: null }

      if (payload.pageToken) {
        params = { ...state.params, pageToken }
      }

      commit('UPDATE_PARAMS', params)

      await dispatch('getChannelVideos')    // manually

      commit('SET_MORE_RESULT_LOADING', false)

      if (state.filterError) { return }

      let videoList = state.videoList
      videoList = videoList.concat(state.filterResult)
      videoList = videoList.filter((value, index, self) => 
        self.findIndex(v => v.id.videoId === value.id.videoId) === index
      )
      commit('UPDATE_VIDEO_LIST', videoList)
    },
    async searchVideo({ state, commit, dispatch }, payload) {
      commit('SET_SEARCH_RESULT_LOADING', true)
      dispatch('resetSearch')

      let { q, channelId } = payload
      let params = { q, channelId }
      commit('UPDATE_SEARCH_RESULT_PARAMS', params)

      await dispatch('getVideosByTitle')

      commit('SET_SEARCH_RESULT_LOADING', false)

      if (state.searchError) { return }

      let videoList = []
      videoList = videoList.concat(state.searchResult)
      commit('UPDATE_SEARCH_RESULT_VIDEO_LIST', videoList)
    },
    addVideo({ commit }, video) {
      commit('ADD_TO_VIDEO_LIST', video)
      commit('REMOVE_FROM_SEARCH_RESULT_VIDEO_LIST', video.id.videoId)
    },
    removeVideo({ commit }, video) {
      commit('ADD_TO_SEARCH_RESULT_VIDEO_LIST', video)
      commit('REMOVE_FROM_VIDEO_LIST', video.id.videoId)
    },
    reset({ commit }) {
      commit('SET_FILTER_ERROR', null)
      commit('UPDATE_VIDEO_LIST', [])
      commit('UPDATE_SEARCH_RESULT_VIDEO_LIST', [])
      commit('SET_PREVIOUS_NEXT_BUTTON', false)
    },
    resetSearch({ commit }) {
      commit('SET_SEARCH_RESULT_ERROR', null)
      commit('UPDATE_SEARCH_RESULT_VIDEO_LIST', [])
    },
  },
}
