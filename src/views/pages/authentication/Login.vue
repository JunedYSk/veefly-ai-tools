<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">Veefly</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img
            fluid
            :src="imgUrl"
            alt="How To Increase YouTube Views By Yourself"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <div v-if="channel" class="text-center mb-2">
            <b-img-lazy
              class="rounded-circle shadow-4-strong"
              style="width: 60px;"
              :src="channel.snippet.thumbnails.medium.url"
              alt="Video thumbnail"
            />
            <div class="mt-1">
              <b>{{ channel.snippet.channelTitle }}</b>
            </div>
          </div>
          <div v-if="videoData" class="text-center mb-2">
            <b-img-lazy
              class=" rounded shadow-4-strong"
              style="width: 110px;"
              :src="videoData.snippet.thumbnails.medium.url"
              alt="Video thumbnail"
            />
            <div class="mt-1">
              <b>{{ videoData.snippet.title}}</b>
            </div>
          </div>
          <!-- <b-card-title class="mb-1 font-weight-bold" title-tag="h1">
            Welcome to Veefly! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text> -->

          <!-- social buttons -->
          <!-- <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="outline-secondary"
              href="javascript:void(0)"
              block
              size="lg"
              :disabled="socialLoading"
              @click="AuthProvider('google')"
            >
              <b-spinner v-if="socialLoading" small />
              <span v-else>
                <b-img
                  :src="require('@/assets/images/icons/google.png')"
                  alt="logo"
                  height="20px"
                  class="mr-50"
                />

                <span>Continue with Google</span>
              </span>
            </b-button>
            <br />
          </div> -->

          <!-- divider -->
          <!-- <div class="divider my-2">
            <div class="divider-text">or</div>
          </div> -->

          <b-alert v-if="errors" variant="danger" show>
            <div class="alert-body">
              <span>{{ errors }}</span>
            </div>
          </b-alert>
          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="login">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link
                    :to="{
                      path: '/forgot-password',
                      query: { email: userEmail },
                    }"
                  >
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loading"
                size="lg"
              >
                <b-spinner v-if="loading" small />
                <span v-else>Sign in</span>
              </b-button>
            </b-form>
          </validation-observer>

          <!-- <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link > -->
              <!-- :to="{ name: 'auth-register' }" -->
              <!-- <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BCard,
  VBTooltip,
  BSpinner,
  BAlert,
  BImgLazy,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import VueSocialauth from "vue-social-auth";
import axios from "@axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
import { Encrypter } from 'laravel-crypton'

const key = process.env.VUE_APP_API_KEY
let crypt = new Encrypter(key)

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
      // scope: "email profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly" ,
      // display:"",
      // ux_mode:"redirect",
      // 	prompt_parent_id: 'parent_id'
      // prompt: 'select_account'
    },
  },
});

export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BCard,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
    BAlert,
    VueCookies,
    BImgLazy,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: null,
      password: null,
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      errors: null,
      loading: false,
      socialLoading: false,
      headers: {},
      // validation rules
      required,
      email,
      channel: null,
      videoData: null,
    };
  },
  mounted() {
    this.headers = JSON.parse(sessionStorage.getItem("h_v"));

    if (Object.keys(this.$route.query).length !== 0) {
      localStorage.setItem('queryParams', JSON.stringify(this.$route.query))
    }
    if (localStorage.getItem('channelId')) {
      this.getChannelById()
    } else if (localStorage.getItem('videoId')) {
      this.getVideo()
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    getVideo() {
      const params = { id: localStorage.getItem('videoId') };
      axios
        .post("/video/getVideo", params)
        .then((data) => {
          this.videoData = data.data.data;
          // console.log(this.videoData);
        })
    },
    getChannelById() {
      const params = { params: { channelId: localStorage.getItem('channelId') } };
      axios
        .get("/video/getChannelById", params)
        .then((data) => {
          store.commit('campaign/UPDATE_LOADING', false)
          this.channel = data.data.data;
        })
        .catch(() => {
        });
    },
    login() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          useJwt
            .login({
              payload: crypt.encrypt({
                email: this.userEmail,
                password: this.password,
              }),
            })
            .then((response) => {
              this.loading = false;

              this.setUserData(response.data.data);

              this.redirect(response.data.data);
            })
            .catch((error) => {
              this.loading = false;
              this.errors = error.response.data.message;
            });
        }
      });
    },
    AuthProvider(provider) {
      this.socialLoading = true;
      const self = this;
      this.$auth
        .authenticate(provider)
        .then((response) => {
          self.SocialLogin(provider, response);
        })
        .catch((err) => {
          this.socialLoading = false;
        });
    },
    SocialLogin(provider, response) {
      response.header = this.headers;
      axios
        .post(`/sociallogin/${provider}`, {
          payload: crypt.encrypt(response),
        })
        .then((response) => {
          this.socialLoading = false;
          this.setUserData(response.data);
          if($cookies.get('referrer')) {
            this.setFreeReferrer(response.data.id)
          }
          
          this.redirect(response.data);
        })
        .catch((err) => {
          this.socialLoading = false;
          this.errors =  err.response.data.message;
        });
    },
    setFreeReferrer(){
      axios.post("/users/updateReferral", {
        referrer: $cookies.get('referrer'),
      })
    },
    setUserData(userData) {
      userData.role = "admin";
      userData.ability = [
        {
          action: "manage",
          subject: "all",
        },
      ];
      useJwt.setToken(userData.token);
      // useJwt.setRefreshToken(response.data.refreshToken)
      localStorage.setItem("userData", JSON.stringify(userData));
      this.$ability.update([
        {
          action: "manage",
          subject: "all",
        },
      ]);
    },
    redirect(userData) {
      this.$router
        // .replace(getHomeRouteForLoggedInUser(userData.role))
        .replace(
          (
            localStorage.getItem("historyUrl") && 
            !localStorage.getItem('channelId') && 
            !localStorage.getItem('videoId')
          )
            ? localStorage.getItem("historyUrl")
            : getHomeRouteForLoggedInUser(userData.role)
        )
        .then(() => {
          // $cookies.set("referrer", "test")
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Welcome ${userData.name}`,
              icon: "CoffeeIcon",
              variant: "success",
              text: "You have successfully logged in . Now you can start to explore!",
            },
          });
          // if ($cookies.get("referrer")) {
          //   this.$swal({
          //     title: "Congradulations!",
          //     text:
          //       "150 free views will be credited to your account in a few mins.",
          //     icon: "success",
          //     confirmButtonText: "Ok",
          //     customClass: {
          //       confirmButton: "btn btn-primary ml-1",
          //       cancelButton: "btn btn-outline-danger ",
          //     },
          //     buttonsStyling: false,
          //   }).then(() => {
          //     $cookies.remove("referrer");
          //   });
          // }
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

.input-group-text {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
