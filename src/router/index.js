import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '@axios'
import useJwt from '@/auth/jwt/useJwt'
import { Encrypter } from 'laravel-crypton'
import store from '@/store'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser, isUserAuthenticated } from '@/auth/utils'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import addvideo from './routes/add-video'
import payment from './routes/payment'

Vue.use(VueRouter)

const key = process.env.VUE_APP_API_KEY
let crypt = new Encrypter(key)

let videoId = localStorage.getItem('videoId')
let indexRoute = { name: 'ai-generator', query: { source: 'al' } }

if (videoId) {
  indexRoute = { name: 'add-video', query: { source: 'sp' } }
}

const router = new VueRouter({
  mode: 'history',
  base: '/dashboard',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: indexRoute },
    ...dashboard,
    ...pages,
    ...addvideo,
    ...payment,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  // if (to.name == 'start') {
  //   let user = JSON.parse(localStorage.getItem("user"))
  
  //   if (!user || (user && !user.channel_count)) {
  //     router.push('video-list')
  //   }
  // }

  const isLoggedIn = isUserLoggedIn()
  async function get() {
    await axios.get("/user")
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        store.commit('app/UPDATE_USER', response.data)
        axios.get(process.env.VUE_APP_ADMIN_API_URL +"/user_settings")
        .then(settingsresponse => {
          localStorage.setItem('settings', JSON.stringify(settingsresponse.data));
          store.commit('app/UPDATE_SETTINGS', crypt.decrypt(settingsresponse.data))

          console.log(JSON.parse(localStorage.getItem('user')));

          if ((!response.data.email_verified_at)) {

            if (to.params.hash && to.params.id) {
              return next();
            }
            return next({ name: 'auth-verify-email' })
          }
          // var settings = crypt.decrypt(JSON.parse(localStorage.getItem('settings')));
          // if (
          //   (
          //     (parseInt(response.data.spent) < parseInt(settings.packages_value)) &&
          //     (parseInt(response.data.payment_count) < parseInt(settings.payment_count))
          //   ) &&
          //   (
          //     to.name == 'package-campaigns' ||
          //     to.name == 'packages' ||
          //     to.name == 'monetisation-package' ||
          //     to.name == 'silver-package'
          //   )
          //    ) {
          //     return next({ name: 'video-list' });
          // }
        })
        
      })
      .catch(error => {
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
        // // localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);

        // // Remove userData from localStorage
        localStorage.removeItem('userData')

        // Reset ability
        // console.log($ability);
        // this.$ability.update(initialAbility)

        // Redirect to login page
        return next({ name: 'auth-login' })
      });
  }
  if (isLoggedIn) {
    //Checking if user is authenticated on backend
    get();
  }

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    localStorage.setItem('historyUrl',to.name);
    if (!isLoggedIn) return next({ name: 'auth-login' })
    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()

    if (Object.keys(to.query).length !== 0) {
      localStorage.setItem('queryParams', JSON.stringify(to.query))
    }

    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))

  }
  return next()
})

export default router