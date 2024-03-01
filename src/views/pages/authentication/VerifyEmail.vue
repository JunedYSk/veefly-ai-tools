<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-card class="mb-0" v-if="emailResend">
        <b-link class="brand-logo">
          <!-- logo -->
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">Veefly</h2>
        </b-link>
        <hr class="mb-2" />

        <b-card-title class="mb-1 text-center">
          Verify Your Email Address 🚀
        </b-card-title>
        <b-card-text class="mb-2 text-center">
          A Verification Link has been sent to <strong>{{ user.email }}</strong
          ><br />
          Please verify to continue.
        </b-card-text>

        <b-card-text class="text-center mt-2">
          <b-link v-if="!sendingEmail" @click="resendEmail()">
            Resend Verification Mail
          </b-link>
          <span v-else> Sending... </span>
          <hr class="my-2" />
          <b-link @click="logout">
            Login with another Email Id?
          </b-link>
        </b-card-text>
      </b-card>
      <b-card class="mb-0" v-else>
        <b-link class="brand-logo">
          <!-- logo -->
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">Veefly</h2>
        </b-link>
        <hr class="mb-2" />
        <div v-if="emailVerifying">
          <b-card-title class="mb-1 text-center">
            Verifying...
          </b-card-title>
          <b-card-text class="mb-2 text-center">
            We are verifying your email. Please hang in there...
          </b-card-text>
        </div>
        <div v-else>
          <div v-if="emailVerified">
            <b-card-title class="mb-1 text-center">
              Email Verified
            </b-card-title>
            <b-card-text class="mb-2 text-center">
              
              <div class="mt-1" v-if="referrer">
                <h6 class="text-primary">Verify your Phone Number to Claim {{registrationFreeViews}} free views</h6>
                <b-button
                  class="my-1"
                  variant="primary"
                  :to="{ name: 'verify-otp' }"
                >
                  Verify Now
                </b-button> <br>
                <b-link :to="{ name: 'video-list' }">
                  Do this later
                </b-link>
              </div>
              <div v-else>
                <h6 class="text-primary">Your email has been verified successfully.</h6>
                <b-button
                  class="mt-1"
                  variant="primary"
                  :to="redirectRoute"
                >
                  Promote your first video 🚀
                </b-button>
              </div>
            </b-card-text>
          </div>
          <div v-else>
            <b-card-title class="mb-1 text-center">
              Email Verification Failed
            </b-card-title>
            <b-card-text class="mb-2 text-center">
              <b-link v-if="!sendingEmail" @click="resendEmail()">
                Resend Verification Mail
              </b-link>
              <span v-else> Sending... </span>
            </b-card-text>
          </div>

          <!-- <b-card-text class="text-center mt-2">
          <b-link v-if="!sendingEmail" @click="resendEmail()">
            Resend Verification Mail
          </b-link>
          <span v-else> Sending ... </span>
        </b-card-text> -->
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { BCard, BLink, BCardText, BCardTitle, BButton } from "bootstrap-vue";
import axios from "@axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useJwt from "@/auth/jwt/useJwt";
import { initialAbility } from "@/libs/acl/config";
import VueCookies from "vue-cookies";

export default {
  components: {
    VuexyLogo,
    BCard,
    BLink,
    BCardText,
    BCardTitle,
    BButton,
    VueCookies,
  },
  data() {
    return {
      sendingEmail: false,
      emailResend: true,
      emailVerifying: false,
      emailVerified: false,
      referrer: false,
      registrationFreeViews: 1000,
      user: {
        email: null,
      },
      redirectRoute: { name: 'channel-link', query: { source: 'al' } },
    };
  },
  methods: {
    resendEmail() {
      this.sendingEmail = true;

      axios
        .post(`/email/resend`)
        .then((response) => {
          this.sendingEmail = false;

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Email sent`,
              icon: "InboxIcon",
              variant: "success",
              text: "Check your email for verification",
            },
          });
        })
        .catch((err) => {
          this.sendingEmail = false;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Failed to send email try after some time",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },
    verifyEmail() {
      this.emailVerifying = true;

      axios
        .post(
          `/verify-email/${this.$route.params.id}/${this.$route.params.hash}?expires=` +
            this.$route.query.expires +
            "signature=" +
            this.$route.query.signature
        )
        .then((response) => {
          this.emailVerifying = false;
          this.emailVerified = true;
          this.$gtm.trackEvent({
            event: "gtm4wp.registrationemailverified",
            ecommerce: {
              purchase: {
                actionField: {
                  user_id: this.user.id,//<<user_id variable>>,
                },
              },
            },
            noninteraction: false, // Optional
          });
        })
        .catch((err) => {
          this.emailVerifying = false;
          this.emailResend = false;
          if (err.response.status == 403) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Link is expired, Try resending email",
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });
          }
        });
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
    // showMessage() {
    //   if ($cookies.get("referrer")) {
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
    // },
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.email_verified_at){  
      this.$router.push({
          name: "campaigns"
        });
        this.$toast({
              component: ToastificationContent,
              props: {
                title: "Email is already verified for this account",
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
    ) {
      this.emailResend = false;
      this.verifyEmail();
    }
    if($cookies.get("referrer")){
      this.referrer = true;
    }

    if (localStorage.getItem('videoId')) {
      this.redirectRoute = { name: 'add-video', query: 'sp' }
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
