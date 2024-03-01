<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      { 'expanded': !isVerticalMenuCollapsed || (isVerticalMenuCollapsed && isMouseHovered) },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light'
    ]"
    @mouseenter="updateMouseHovered(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot
        name="header"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon"
      >
        <ul class="nav navbar-nav flex-row">

          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link
              class="navbar-brand"
              to="/"
            >
              <span class="brand-logo">
                <b-img
                  :src="appLogoImage"
                  alt="logo"
                />
              </span>
              <h2 class="brand-text text-#9B51E0">
                {{ appName }}
              </h2>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              />
              <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div
      :class="{'d-block':shallShadowBottom}"
      class="shadow-bottom"
    />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
    >
      <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      />
    <!-- <img src="@/assets/images/banner/menu-bg.png" class="fix"/> -->

    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from '@/navigation/vertical'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BLink, BImg } from 'bootstrap-vue'
import { provide, computed, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import { $themeConfig } from '@themeConfig'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import useVerticalNavMenu from './useVerticalNavMenu'
import { Encrypter } from 'laravel-crypton'

const key = process.env.VUE_APP_API_KEY
let crypt = new Encrypter(key)

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  data(){
    return{
      user: null,
      settings: null,
      menus: [],
    }
  },
  watch: {
    // '$store.state.app.settings': function () {
    //   this.settings = this.$store.state.app.settings
    //   if (this.$store.state.app.user) { this.filterMenu() }
    // },
    // '$store.state.app.user': function () {
    //   this.user = this.$store.state.app.user
    //   if (this.$store.state.app.settings) { this.filterMenu() }
    // },
  },
  methods: {
    filterMenu() {
      this.menus = (this.user.spent > parseInt(this.settings.packages_value) && this.user.payment_count > this.settings.payment_count) 
                    ? this.navMenuItems 
                    : this.navMenuItems.filter(i => (i.route !== 'package-campaigns' && i.route !== 'packages'))
    },
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props)

    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'))

    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    return {
      navMenuItems,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";

.fix{
    position:fixed;
    bottom:0px;
    width: 100%;
}

ul ul li .nav-item .menu-title {
  font-size: 0.98rem !important;
}
.semi-dark-layout .main-menu  {
      background-color: white;
  }
  
  .semi-dark-layout .main-menu-content .navigation-main {
      background-color: white;
  }
  

  .semi-dark-layout .main-menu-content .navigation-main .nav-item .menu-content {
    background-color: #ffffff;
}

.semi-dark-layout .main-menu-content .navigation-main .nav-item .menu-content li:not(.active) a {
    background-color: #ffffff;
}

.main-menu.menu-dark .navigation > li.open:not(.menu-item-closing) > a,  .main-menu.menu-dark .navigation > li.sidebar-group-active > a {
    background: #fff;
    border-radius: 6px;
}

.menu-title.text-truncate{
  font-weight: normal;
  color: black;
}
.main-menu.menu-dark .navigation .navigation-header {
    padding: 2px;
}

.shadow-bottom{
     background: none !important;
}

.semi-dark-layout .main-menu-content .navigation-main .nav-item a {
  color: #333333;}

.main-menu.menu-dark .navigation > li.active > a {
  color: #9B51E0;
}
.vertical-layout.vertical-menu-modern .main-menu .navigation > li > a:hover svg,
.vertical-layout.vertical-menu-modern .main-menu .navigation > li > a:hover i {
    color: #9B51E0; /* Change this to the desired hover color */
}

.semi-dark-layout .main-menu-content .navigation-main .active .menu-title,
.semi-dark-layout .main-menu-content .navigation-main .active i {
    color: #2a2e30;
    font-weight: bold;
    font-weight: 600;
}

.main-menu.menu-dark .navigation > li.active > a {
  background: linear-gradient( rgba(255, 255, 255, 0.7));
}

.main-menu.menu-dark .navigation > li.active > a {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0;
}

.semi-dark-layout .main-menu-content .navigation-main .sidebar-group-active .menu-content .active a {
    background-color: #fff;
}
.main-menu.menu-dark .navigation > li ul .active {
    -webkit-box-shadow: none; 
    box-shadow: none; 
    border-radius: 4px; 
}
.main-menu .navbar-header .navbar-brand .brand-text {
  font-size: 26px;
}
.header-navbar .navbar-container ul.navbar-nav li a.dropdown-user-link .user-name {
  color: #333333;
  font-size: 16px;
}

.brand-logo{
  font-size: 13px;
}
.main-menu.menu-dark .navigation > li.open:not(.menu-item-closing) > a, .main-menu.menu-dark .navigation > li.sidebar-group-active > a {
    color: #9B51E0;
}
.text-truncate .active{
  font-weight: bold;
}
[dir] .main-menu ul {
    padding-bottom: 70px;
}
</style>
