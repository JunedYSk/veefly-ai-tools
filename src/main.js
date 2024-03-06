import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import i18n from '@/libs/i18n'
import Zendesk from '@dansmaculotte/vue-zendesk'
import VueGtm from '@gtm-support/vue2-gtm';
import router from './router'
import store from './store'
import App from './App.vue'
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";


// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
import '@/libs/newrelic'

// import '@/libs/tawk'

// Axios Mock Adapter
// import '@/@fake-db/db'

// Zendesk integration

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

Vue.use(Zendesk, {
  key: 'f1069b89-0240-4d91-a9de-53bd7fc41845',
  disabled: false,
  hideOnLoad: true,
  settings: {
    webWidget: {
      color: {
        theme: '#5a44dc'
      },
      position: { 
        horizontal: 'right',
        vertical: 'top'
      },
      offset: {
        horizontal: '0px',
        vertical: '40px'
      }
    }
  },
})
//Facebook pixel tracking
// !function (f, b, e, v, n, t, s) {
//   if (f.fbq) return; n = f.fbq = function () {
//     n.callMethod ?
//     n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//   };
//   if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//   n.queue = []; t = b.createElement(e); t.async = !0;
//   t.src = v; s = b.getElementsByTagName(e)[0];
//   s.parentNode.insertBefore(t, s)
// }(window, document, 'script',
//   'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '348957732948339');
// fbq('track', 'PageView');

// import VueGtag from "vue-gtag";
// Vue.use(VueGtag, {
//   config: {
//     id: "UA-176715867-1"
//   }
// }, router);

Vue.use(VueGtm, {
  id: process.env.VUE_APP_GTM_ID, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  defer: true, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726c7f26c', // Will add `nonce` to the script tag
  // enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  // ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
  trackOnNextTick: false // Whether or not call trackView in Vue.nextTick
});

// Sentry.init({
//   dsn: "https://51330105c37b441d90154ad21b2a84c5@o1091419.ingest.sentry.io/6108296",
//   integrations: [
//     new Integrations.BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracingOrigins: ["api.veefly.com"],
//     }),
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 0.2,
// });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')


////////////////////////////////////////////////////////////////////////////////////////////////
// New Relic Script
////////////////////////////////////////////////////////////////////////////////////////////////
