<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-avatar
            v-if="user.first_name"
            size="40"
            :text="user.first_name.charAt(0)"
            variant="light-primary"
            badge
            class="badge-minimal"
            badge-variant="success"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <validation-observer
      ref="userProfileForm"
      #default="{ invalid }"
    >
      <b-form
        class="mt-2"
        @submit.prevent="update()"
      >
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="First Name"
              label-for="account-username"
            >
              <validation-provider
                #default="{ errors }"
                name="Firstname"
                vid="firstname"
                rules="required|alpha|min:3"
              >
                <b-form-input
                  v-model="user.first_name"
                  placeholder="First Name"
                  name="first_name"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Last Name"
              label-for="account-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Lastname"
                vid="lastname"
                rules="required|alpha|min:3"
              >
                <b-form-input
                  v-model="user.last_name"
                  name="last_name"
                  placeholder="Last Name"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group
              label="E-mail"
              label-for="account-e-mail"
            >
              <b-form-input
                v-model="user.email"
                name="email"
                placeholder="Email"
                readonly
              />
              <label  class="mt-2">Phone</label>
              <b-form-input
                v-model="user.phone"
                name="Phone"
                placeholder="Phone"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="New Password"
              label-for="account-password"
            >
              <validation-provider
                #default="{ errors }"
                name="password"
                vid="password"
                rules="min:8|confirmed:confirm_password"
              >
                <b-form-input
                  v-model="user.password"
                  name="password"
                  placeholder="New Password"
                  type="password"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Re-type New Password"
              label-for="account-confirm-password"
            >
              <validation-provider
               
                name="confirm_password"
                vid="confirm_password"
                rules="min:8|confirmed:password"
              >
                <b-form-input
                  v-model="user.confirm_password"
                  name="confirm_password"
                  placeholder="Re-type New Password"
                  type="password"
                />
                <!-- <small class="text-danger">{{ errors[0] }}</small> -->
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mt-2 mr-1"
              :disabled="invalid || loading"
            >
              Save changes
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BAlert,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
  BAvatar,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from '@axios'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    BAvatar,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      user: {
        first_name: this.userdata.first_name.trim(),
        last_name: this.userdata.last_name,
        email: this.userdata.email,
        phone: this.userdata.phone,
        password: null,
        confirm_password: null,
      },
      profileFile: null,
      loading: false,
      // validation
      required,
      email,
    }
  },
  beforeCreate() {
    this.userdata = JSON.parse(localStorage.getItem("user"));
    // this.user.first_name = this.userdata.first_name;
    // this.user.last_name = this.userdata.last_name;
    // this.user.email = this.userdata.email;
  },
  methods: {
    update() {
      this.$refs.userProfileForm.validate().then(success => {
        if (success) {
          this.loading = true;
          axios
            .put('/users/test', {
              first_name: this.user.first_name, last_name: this.user.last_name, password: this.user.password, confirm_password: this.user.confirm_password, phone: this.user.phone,
            })
            .then(data => {
              this.loading = false
              this.user = data.data.data

              this.$swal({
                icon: "success",
                title: "Updated!",
                text: `Your Profile has been sucessfully updated.`,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });

              // useJwt.setToken(this.user.token);
              // this.user.role = "admin";
              // this.user.ability = [
              //   {
              //     action: "manage",
              //     subject: "all",
              //   },
              // ];

              localStorage.setItem('userData.name', JSON.stringify(this.user.name))
              // this.$ability.update([
              //   {
              //     action: "manage",
              //     subject: "all",
              //   },
              // ]);
            })
        }
      })
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
