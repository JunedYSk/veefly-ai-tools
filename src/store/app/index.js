import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    settings: null,
    user: null,
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    device: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.md) return 'desktop'
      return 'mobile'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    UPDATE_SETTINGS(state, val) {
      state.settings = val !== undefined ? val : !state.settings
    },
    UPDATE_USER(state, val) {
      state.user = val !== undefined ? val : !state.user
    },
  },
  actions: {},
}
