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
          <b-img fluid :src="imgUrl" alt="How to get YouTube views" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 pt-5 pt-lg-0 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 pt-2 pt-lg-0o mx-auto">
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
          <!-- <b-card-title class="mb-1"> Adventure starts here 🚀 </b-card-title>
          <b-card-title class="mb-2 small font-weight-bold" title-tag="h1">
            Make your YouTube Video Promotion easy and fun!
          </b-card-title> -->

          <!-- social buttons -->
          <div class="auth-footer-btn d-flex justify-content-center">
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
          </div>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>
          <b-alert v-if="errors" variant="danger" show>
            <div class="alert-body">
              <span>{{ errors }}</span>
            </div>
          </b-alert>
          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="register">
              <!-- firstname -->
              <b-form-group label="Firstname" label-for="register-firstname">
                <validation-provider
                  #default="{ errors }"
                  name="Firstname"
                  vid="firstname"
                  rules="required|alpha|min:2|max:25"
                >
                  <b-form-input
                    id="register-firstname"
                    v-model="user.first_name"
                    name="register-firstname"
                    :state="errors.length > 0 ? false : null"
                    placeholder="John"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- lastname -->
              <b-form-group label="Lastname" label-for="register-lastname">
                <validation-provider
                  #default="{ errors }"
                  name="Lastname"
                  vid="lastname"
                  rules="required|alpha|min:2|max:25"
                >
                  <b-form-input
                    id="register-lastname"
                    v-model="user.last_name"
                    name="register-lastname"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Doe"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group label="Email" label-for="register-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="user.email"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Password">
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  vid="password"
                  rules="required|min:8"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="password"
                      v-model="user.password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>

                  <small class="text-danger">{{ errors[0] }}</small>
                  <password
                    v-model="user.password"
                    :strength-meter-only="true"
                  />
                </validation-provider>
              </b-form-group>

              <b-form-group
              label="Re-type New Password"
              label-for="account-confirm-password"
            >
              <validation-provider
                #default="{ errors }"
                name="confirm_password"
                vid="confirm_password"
                rules="required|min:8|confirmed:password"
              >
                <b-form-input
                  v-model="user.confirm_password"
                  name="confirm_password"
                  placeholder="Re-type New Password"
                  type="password"
                />
                <small v-if="errors.length > 0" class="text-danger">Passwords do not Match</small>
              </validation-provider>
            </b-form-group>

              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="privacy_policy"
                  vid="privacy_policy"
                  :rules="{ required: { allowFalse: false } }"
                >
                  <b-form-checkbox
                    id="register-privacy-policy"
                    v-model="privacy_policy"
                    name="privacy_policy"
                  >
                    I agree to
                    <b-link target="_blank" href="https://veefly.com/privacy-policy/">Privacy Policy</b-link> & <b-link target="_blank" href="https://veefly.com/terms-of-service/"> Terms of Service</b-link>
                  </b-form-checkbox>
                  <small v-if="errors.length > 0" class="text-danger">Please accept the Privacy Policy & Terms of Service</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="promotional_update"
                  vid="promotional_update"
                >
                  <b-form-checkbox
                    id="register-promotional_update"
                    name="promotional_update"
                  >
                    Receive updates on the newest promotional offers and news (Optional).
                  </b-form-checkbox>
                </validation-provider>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid || loading"
                size="lg"
              >
                <b-spinner v-if="loading" small />
                <span v-else>Sign up</span>
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{ name: 'auth-login' }">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import Password from "vue-password-strength-meter";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BCard,
  BSpinner,
  BAlert,
  BImgLazy,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import VueSocialauth from "vue-social-auth";
import axios from "@axios";
import VueCookies from 'vue-cookies'

import Vue from "vue";
import { Encrypter } from 'laravel-crypton'

const key = process.env.VUE_APP_API_KEY
let crypt = new Encrypter(key)

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
    },
  },
});

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BCard,
    Password,
    BSpinner,
    // validations
    ValidationProvider,
    ValidationObserver,
    BAlert,
    VueCookies,
    BImgLazy,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      privacy_policy: null,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_password: null,
        headers: null,
      },
      errors: null,
      loading: false,
      socialLoading: false,
      click_id: null,
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      referral_code: null,
      channel: null,
      videoData: null,
    };
  },
  beforeMount(){
    // console.log(this.$route.query.aff);
    // if(this.$route.query.aff){
    //   axios.post("/affiliates/createClick",{
    //     referral_code: this.$route.query.aff,
    //   }).then((response) => {
    //     this.click_id = response.data.data.id;
    //     this.referral_code = this.$route.query.aff;
    //   })
    // }
    
    // console.log($cookies.get('click_id'))
  },
  mounted() {
    this.user.headers = JSON.parse(sessionStorage.getItem("h_v"));

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
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
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
    register() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          useJwt
            .register({
              payload: crypt.encrypt(this.user)
            })
            .then((response) => {
              this.setUserData(response.data.data);
              if($cookies.get('affiliate_id')){
                this.setReferrer(response.data.data.id)
              }
              else if($cookies.get('referrer')){
                this.setFreeReferrer(response.data.data.id)
              }
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
      response.header = this.user.headers;
      axios
        .post(`/sociallogin/${provider}`, {
          payload: crypt.encrypt(response)
        })
        .then((response) => {
          this.socialLoading = false;

          this.setUserData(response.data);
          if($cookies.get('affiliate_id')){
            this.setReferrer(response.data.id)
          } else if($cookies.get('referrer')) {
            this.setFreeReferrer(response.data.id)
          }
          this.redirect(response.data);
        })
        .catch((err) => {
          this.socialLoading = false;
          // console.log(err.response.data.message);
          this.errors = err.response.data.message;
        });
    },
    setReferrer(){
      axios.post("/affiliates/createCustomer", {
        click_id: $cookies.get('click_id'),
        referral_code: $cookies.get('affiliate_id')
      })
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
      // $cookies.keys().forEach(cookie => $cookies.remove(cookie))
      $cookies.remove("affiliate_id")
      $cookies.remove("click_id")
      this.$router
        // .replace(getHomeRouteForLoggedInUser(userData.role))
        .replace(localStorage.getItem('historyUrl') ? localStorage.getItem('historyUrl') : getHomeRouteForLoggedInUser(userData.role) )
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Welcome ${userData.name}`,
              icon: "CoffeeIcon",
              variant: "success",
              text:
                "You have successfully logged in . Now you can start to explore!",
            },
          });
        });
        // if ($cookies.get("referrer")) {
        //     this.$swal({
        //       title: "Congradulations!",
        //       text:
        //         "150 free views will be credited to your account in a few mins.",
        //       icon: "success",
        //       confirmButtonText: "Ok",
        //       customClass: {
        //         confirmButton: "btn btn-primary ml-1",
        //         cancelButton: "btn btn-outline-danger ",
        //       },
        //       buttonsStyling: false,
        //     }).then(() => {
        //       $cookies.remove("referrer");
        //     });
        //   }
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

.input-group-text {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
