<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1">
          Veefly
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Forgot password V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Forgot password-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card
            v-if="errors"
            border-variant="danger"
            bg-variant="danger"
            text-variant="white"
            class="shadow-none"
          >
            <b-card-text>
              {{ errors }}
            </b-card-text>
          </b-card>
          <br />
          <b-card-title class="mb-1"> Forgot Password? 🔒 </b-card-title>
          <b-card-text class="mb-2">
            Enter your email and we'll send you instructions to reset your
            password
          </b-card-text>

          <!-- form -->
          <validation-observer ref="forgotPassword" #default="{ invalid }">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group label="Email" label-for="forgot-password-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loading"
                ><b-spinner v-if="loading" small />
                <span v-else>Send reset link</span>
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{ name: 'auth-login' }">
              <feather-icon icon="ChevronLeftIcon" /> Back to login
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
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
  BCardTitle,
  BCardText,
  BImg,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BCard,
  BSpinner,
} from "bootstrap-vue";
import { required, email } from "@validations";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import axios from "@axios";

export default {
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BCard,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: null,
      loading: false,
      errors: null,
      sideImg: require("@/assets/images/pages/forgot-password-v2.svg"),
      // validation
      required,
      email,
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/forgot-password-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  beforeMount() {
    this.userEmail = this.$route.query.email;
  },
  methods: {
    validationForm() {
      this.$refs.forgotPassword.validate().then((success) => {
        if (success) {
          this.loading = true;
          axios
            .post(`/password/email`, { email: this.userEmail })
            .then((response) => {
              this.loading = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.message,
                  icon: "EditIcon",
                  variant: "success",
                },
              });
            })
            .catch((err) => {
              this.loading = false;
              this.errors = err.response.data.errors ? err.response.data.errors.email[0] : null;

              if (err.response.data.message && !err.response.data.errors) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: err.response.data.message,
                    icon: "AlertTriangleIcon",
                    variant: "danger",
                  },
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
