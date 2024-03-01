<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.name }}
        </p>
      </div>
      <b-avatar
        size="40"
        :src="userData.profile_pic"
        :text="userData.name.charAt(0)"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.name"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      :to="{ name: 'profile' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Profile</span>
    </b-dropdown-item>

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Logout</span>
    </b-dropdown-item>
    <!-- <b-dropdown-item
      :to="{ name: 'free-views' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="GiftIcon"
        class="mr-50"
      />
      <span>Free Views</span>
    </b-dropdown-item> -->
    </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BAvatar } from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'
import axios from '@axios'
import store from '@/store'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout() {
      
      axios
        .post('/logout')
        .then(data => {
          // Remove userData from localStorage
          // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
          localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
          // localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);

          // Remove userData from localStorage
          localStorage.removeItem('userData')
          localStorage.removeItem('historyUrl')
          localStorage.removeItem('user')
         /*  localStorage.removeItem('check_seen'); */
          sessionStorage.removeItem('check_seen')

          // Reset ability
          this.$ability.update(initialAbility)

          // localStorage.removeItem('selected_channel')
          store.dispatch('channel/reset')

          // Redirect to login page
          this.$router.push({ name: 'auth-login' })
        })
    },
  },
}
</script>
