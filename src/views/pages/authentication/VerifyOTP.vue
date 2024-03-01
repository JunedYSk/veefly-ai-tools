<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <!-- logo -->
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">Veefly</h2>
        </b-link>
        <hr class="mb-2" />
        
        <b-card-title class="mb-1 text-center">
          Verify Your Phone Number to get {{registrationFreeViews}} free views🚀
        </b-card-title>
        <hr>
        <div v-if="!otpSent">
          <b-card-title class="mb-1 mt-3 text-center">
         Enter your Phone Number
        </b-card-title>
        <validation-observer #default="{ invalid }">
            <b-form @submit.prevent="sendOtp">
              <validation-provider
                  #default="{ errors }"
                  name="Otp"
                  rules="required|numeric"
                >
        <b-input-group class="mb-1">
        <b-input-group-prepend>
          <!-- <b-dropdown
            text="Action"
            variant="outline-primary"
          > -->
            <vue-country-code class="btn-outline-primary" @onSelect="onSelect"> </vue-country-code>
          <!-- </b-dropdown> -->
        </b-input-group-prepend>
        
        <b-form-input v-model="phone_number" :state="errors.length > 0 ? false : null" placeholder="Enter Your Phone Number"/>
          <div class="checkbox mt-1 mx-auto">
            <!-- The following line controls and configures the Turnstile widget. -->
            <div id="turnstile-captcha" :data-sitekey="turnstileKey" data-theme="light"></div>
          </div>
      </b-input-group>
      </validation-provider>
      <b-button
                type="submit"
                variant="primary"
                block
                disabled
                class="mb-1"
              >
                <b-spinner v-if="loading" small />
                <span v-else>Send OTP</span>
              </b-button>
            </b-form>
        </validation-observer>
        <b-card-text class="text-center"><b-link :to="{ name: 'free-views' }">
            I will do it later
          </b-link></b-card-text>
          <!-- <p class="text-danger text-center">Phone verification is temporarily disabled.</p> -->
          </div>
          <div v-else>
          <b-card-title class="mb-1 mt-3 text-center">
         OTP sent on +{{dialCode}} {{  phone_number}} 
        </b-card-title>
        <validation-observer #default="{ invalid }">
            <b-form @submit.prevent="verifyOtp">
              <validation-provider
                  #default="{ errors }"
                  name="Otp"
                  rules="required|digits:6"
                >
        <b-input-group class="mb-1">
        <b-form-input v-model="otp" :state="errors.length > 0 ? false : null" placeholder="Enter Your OTP" />
      </b-input-group>
      </validation-provider>
      
          <span v-if="!otpExpired">OTP Expires in {{ countDown }} seconds.</span>
          <span v-else>OTP expired <a class="text-primary" @click="sendOtp">resend OTP</a></span>
      <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loading"
                class="mb-1"
              >
                <b-spinner v-if="loading" small />
                <span v-else>Verify</span>
              </b-button>
            </b-form>
        </validation-observer>
        <b-card-text class="text-center"><b-link @click="otpSent=false">
            Edit Phone Number
          </b-link></b-card-text>
          </div>
        <b-card-text class="mb-2 mt-3 text-center">
          
          "By continuing you will receive a one-time verification code to your
          phone number by SMS. Message and data rates may apply."
        </b-card-text>

        <b-card-text class="text-center mt-2">
          <hr class="my-2" />
          <b-link @click="logout">
            Login with another Email Id?
          </b-link>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BCard,
  BLink,
  BCardText,
  BCardTitle,
  BButton,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend,
  BInputGroupAppend,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BForm,
  BSpinner
} from "bootstrap-vue";
import axios from "@axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useJwt from "@/auth/jwt/useJwt";
import { initialAbility } from "@/libs/acl/config";
import VueCookies from "vue-cookies";
import VueCountryCode from "vue-country-code";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, numeric, digits } from "@validations";



export default {
  components: {
    VuexyLogo,
    BCard,
    BLink,
    BCardText,
    BCardTitle,
    BButton,
    VueCookies,
    VueCountryCode,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    ValidationProvider, 
    ValidationObserver,
    BForm,
    BSpinner,


  },
  data() {
    return {
      phone_number: null,
      otpSent: false,
      otp: null,
      sendingEmail: false,
      emailResend: true,
      emailVerifying: false,
      emailVerified: false,
      loading: false,
      dialCode: null,
      countDown : 180,
      registrationFreeViews: 1000,
      otpExpired: false,
      user: {
        email: null,
      },

      // validation rules
    required,
      numeric,
      digits,
      captcha: null,
      recaptchaScriptIsReady: false,
      turnstileKey: process.env.VUE_APP_TURNSTILE_KEY,
    };
  },
  mounted() {
    setTimeout(() => {
      if (turnstile) {
        this.recaptchaScriptIsReady = true;
        turnstile.render('#turnstile-captcha', {
          sitekey: this.turnstileKey,
          callback: (token) => {
              this.captcha = token;
              // console.log(`Challenge Success ${token}`);
          },
        });
      }
    }, 1000);
  },
  setup() {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
    );
    document.head.appendChild(recaptchaScript);
    
  },
  methods: {
    sendOtp() {if(this.invalidDialCode.includes(this.dialCode) ){
        this.$toast({
              component: ToastificationContent,
              props: {
                title: 'This service is currently not available in your region, We are working hard to bring it to you!',
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });
      }
      else{
      this.loading = true;
      axios.post("/users/sendOtp", {
        phone: this.phone_number,
        calling_code: this.dialCode,
        captcha: this.captcha,
      }).then((response) => {
        this.loading = false;
        this.otpSent = true;
        this.$toast({
              component: ToastificationContent,
              props: {
                title: "Otp sent on your phone number",
                icon: "MessageSquareIcon",
                variant: "success",
              },
            });
      }).catch((err) => {
        this.loading = false;
        if(err.response.data.message.phone){
          this.$toast({
            component: ToastificationContent,
              props: {
                title: err.response.data.message.phone[0],
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
          })
        }
        else if(err.response.data.message.calling_code){
          this.$toast({
            component: ToastificationContent,
              props: {
                title: err.response.data.calling_code[0],
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
          })
        }
        else{
        this.$toast({
              component: ToastificationContent,
              props: {
                title: err.response.data.message,
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });
        }
      })
      }
    },
    onSelect({ name, iso2, dialCode }) {
      // console.log(name, iso2, dialCode);
      this.dialCode = dialCode;
    },
    countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
                else{
                  this.otpExpired = true;
                }
    },
    verifyOtp() {
      this.loading = true;
      axios.post("/users/verifyOtp", {
        otp: this.otp,
        phone: this.phone_number,
        calling_code: this.dialCode,
      }).then(() => {
        this.loading = false;

        this.$gtm.trackEvent({
          event: "gtm4wp.OTPVerified",
          ecommerce: {
            purchase: {
              actionField: {
                user_id: this.user.id,
              },
            },
          },
          noninteraction: false, // Optional
        });

        this.$router.push({
          name: "free-views",
        });
        this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `OTP Verified`,
              icon: "CheckIcon",
              variant: "success",
              text: "You will recieve " + registrationFreeViews + " free views in a few mins",
            },
          });
      }).catch((err) => {
        this.loading = false;
        if (err.response.status == 403) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "OTP is expired, Try resending email",
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });
          }
      })
    },
    logout() {
      axios.post("/logout").then((data) => {
        // Remove userData from localStorage
        // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
        // localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);

        // Remove userData from localStorage
        localStorage.removeItem("userData");
        localStorage.removeItem('historyUrl')
        localStorage.removeItem('user')

        // Reset ability
        this.$ability.update(initialAbility);

        // Redirect to login page
        this.$router.push({ name: "auth-login" });
      });
    },
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.phone){  
      this.$router.push({
          name: "campaigns"
        });
        this.$toast({
              component: ToastificationContent,
              props: {
                title: "Phone number already verified for this account",
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });

    }
    if (
      this.$route.query.expires &&
      this.$route.query.signature &&
      this.$route.params.id &&
      this.$route.params.hash
    )
    $cookies.remove("referrer");
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

</style>
