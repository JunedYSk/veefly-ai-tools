<template>
  <div
    class="app-content content"
    :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass , routeClass]"
    style="background-image: linear-gradient(to right, rgba(255,0,0,0), 	RGB(243, 234, 251));"
    :style='{"padding:0;" : $route.name == "custom-package-details"}'
  >
    <div class="content-overlay" />
    <div class="header-navbar-shadow" />
    <div
      class="content-wrapper"
      :class="contentWidth === 'boxed' ? 'container p-0' : null"
    >
      <slot name="breadcrumb">
        <app-breadcrumb />
      </slot>
      <div class="content-body">
        <transition
          :name="routerTransition"
          mode="out-in"
        >
          <slot />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'

export default {
  components: {
    AppBreadcrumb,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
    computed: {
    routeClass() {
      return this.$route.meta.bodyClass || '';
    }
  },
}
</script>

<style scoped>
@media only screen and (min-width: 767px){
  .package-details-page {
    /* padding: 0 !important; */
    padding: 60px 0 0 0 !important;
  }
}
</style>

