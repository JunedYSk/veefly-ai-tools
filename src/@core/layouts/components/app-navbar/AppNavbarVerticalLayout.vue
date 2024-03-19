<template>
<!-- <div class="w-100">
  <div style="background: #ff9f43;color: #111;" class="navbar-container content align-items-center text-center">
   <h5 class="my-auto" style="color: #111">We’re facing some issues with our payment partners, VeeFly will be back operational in the next 72 hours</h5>
  </div> -->
  <div class="navbar-container d-flex content align-items-center" style="background:white !important">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1"
    >
      <!-- User Channels Container -->
      <v-select
        v-if="device == 'desktop'"
        class="border desktop-user-channel rounded d-none"
        :class="{ 'd-block': $route.name == 'start' || $route.name == 'channel-videos' || $route.name == 'bulk-views-packages' || $route.name == 'channel-link' || $route.name == 'buy-monetisation-package' || $route.name == 'buy-silver-package' || $route.name == 'ai-daily-ideas' || $route.name == 'ai-coach'}"
        v-model="selectedChannel"
        label="channel_title"
        value="id"
        placeholder="My Channels"
        :options="userChannels"
        @input="OnChangeUserChannel"
        :clearable="false"
        :searchable="false"
        ref="userChannelList"
      >
        <template slot="selected-option" slot-scope="option">
          <b-spinner variant="primary" class="ml-1" v-if="loadingUserChannels" />
          <div v-else>
            <img v-if="option.channel_thumbnail" :src="option.channel_thumbnail" class="rounded-circle mr-1" style="width: 35px;">
            <img v-else src="@/assets/images/referrals/user.png" class="rounded-circle mr-1" style="width: 35px;">
            <span> {{ option.channel_title.length > 19 ? option.channel_title.substr(0, 19) +'...' : option.channel_title }}</span>
          </div>
        </template>

        <template slot="option" slot-scope="option">
          <div>
            <img v-if="option.channel_thumbnail" :src="option.channel_thumbnail" class="rounded-circle mr-1" style="width: 35px;">
            <feather-icon
              icon="PlusIcon"
              size="21"
              class="rounded-circle mr-1"
              style="background-color: #e1e1e1; width: 35px; height: 35px;"
              v-else-if="option.channel_title == 'Add Channel'"
            />
            <img v-else src="@/assets/images/referrals/user.png" class="rounded-circle mr-1" style="width: 35px;">
            {{ option.channel_title }}
          </div>
        </template>
      </v-select>
      <v-select
      v-else
      class="user-channel d-none"
        :class="{ 'd-block': $route.name == 'start' || $route.name == 'channel-videos' || $route.name == 'bulk-views-packages' || $route.name == 'channel-link' || $route.name == 'buy-monetisation-package' || $route.name == 'buy-silver-package' || $route.name == 'ai-daily-ideas'}"
        v-model="selectedChannel"
        label="channel_title"
        value="id"
        placeholder="My Channels"
        :options="userChannels"
        @input="OnChangeUserChannel"
        :clearable="false"
        :searchable="false"
        ref="userChannelList"
      >
        <template #search="{ events, attributes }">
          <div v-if="!selectedChannel && !loadingUserChannels">
            <feather-icon
              icon="PlusIcon"
              size="21"
              class="rounded-circle"
              style="background-color: #e1e1e1; width: 35px; height: 35px;"
            />
            <input
              placeholder="My Channels"
              type="search"
              class="vs__search"
              v-bind="attributes"
              v-on="events"
            >
          </div>
        </template>

        <template slot="selected-option" slot-scope="option">
          <b-spinner variant="primary" class="ml-1" v-if="loadingUserChannels" />
          <div v-else>
            <img v-if="option.channel_thumbnail" :src="option.channel_thumbnail" class="rounded-circle " style="width: 35px; outline: 2px solid #9b51e0">
            <img v-else src="@/assets/images/referrals/user.png" class="rounded-circle mr-1" style="width: 35px;">
             </div>
        </template>

        <template slot="option" slot-scope="option">
          <div>
            <img v-if="option.channel_thumbnail" :src="option.channel_thumbnail" class="rounded-circle mr-1" style="width: 35px;">
            <feather-icon
              icon="PlusIcon"
              size="21"
              class="rounded-circle mr-1"
              style="background-color: #e1e1e1; width: 35px; height: 35px;"
              v-else-if="option.channel_title == 'Add Channel'"
            />
            <img v-else src="@/assets/images/referrals/user.png" class="rounded-circle mr-1" style="width: 35px;">
            {{ option.channel_title }}
          </div>
        </template>
      </v-select>
      
    </div>

    <b-navbar-nav v-if="user != null" class="nav align-items-center ml-auto">
      <!-- <dark-Toggler class="d-none d-lg-block" /> -->
      
      <p v-if="user.vip == 1" class="user-name font-weight-bolder premium mb-0 mr-1 text-primary">
        
        <!-- <b-link :to="{ name: 'free-views' }"> -->
         <i class="fad fa-crown mr-0"></i> Premium 
        <!-- </b-link> -->
        
       
      </p>

      <!-- <p class="font-weight-bolder mb-0 mr-4 text-primary" >
            <span class="icon-container" id="chat-icon">
                <i class='far fa-comment-alt'  style='font-size:24px;color:#9B51e0'></i>
            </span>
      </p> -->

      <div class="mr-md-1 chat-icon rounded position-relative" @click="openWidget" id="myLauncher">
        <p class="position-absolute text-success live-dot">.</p>
        <feather-icon class="text-primary" icon="MessageSquareIcon" size="20" />
      </div>

      <!-- <p class="user-name font-weight-bolder mb-0 mr-4 text-primary">
            <b-link :to="{ name: 'addmoney' }">
                <div class="icon-container" id="wallet_" >
                  <i class="far fa-wallet" id="wallet-icon"></i>
                  <span class="dollar-sign">$</span>            
                  <b-spinner variant="primary" class="ml-1" v-if="loading" small />
                  <span v-else id="cash-value">{{ user.cash }}</span>
                </div>
                <b-tooltip target="wallet_">Wallet</b-tooltip>
            </b-link>
      </p> -->
      <!-- <notification-dropdown /> -->
      <user-dropdown />
    </b-navbar-nav>
     <!-- Start Preview Modal -->
        <b-modal
          ref="add-channel-modal"
          hide-footer
          hide-header
          centered
          size="lg"     
        >
        <div class="position-relative yt-background">
          <div>
            <p class="text-center yt-text d-flex align-items-center justify-content-center"><b-img
              :src="require('@/assets/images/icons/yt-vector.png')"
              alt="logo"
              height="30%"
            /> 
            <span class="ml-1"> Add Youtube Channel </span> </p>
          </div>
          
          <div @click="closeModal()">
            <b-button class="btn-end position-absolute">
              <feather-icon style="color:black; z-index:9999;" size="20" icon="XIcon"/>
            </b-button>
          </div> 
        </div>
          <div style="min-height:25vh;">
            <validation-observer ref="addChannelForm" #default="{ invalid }">
              <b-form @submit.prevent="checkLink">
                <!-- campaign url -->
                <div class="input-with-button mt-3">
                  <!-- <b-form-group> -->
                  <validation-provider
                    #default="{ errors }"
                    name="url"
                    vid="campaignUrl"
                    rules="required"
                    class="w-100"
                  >
                    <div class="d-flex">
                      <b-form-input
                        class="vedioList-input-button"
                        v-model="campaignUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Search With Your Channel Name or Paste Channel Link"
                        />
                        <div class="youtube">
                          <b-img
                            :src="require('@/assets/images/icons/youtube.png')"
                            alt="logo"
                            height="40px"
                            style="position: absolute; top: 10px; left: 10px;"
                          />
                        </div>
                    </div>
                    <div class="mt-1">
                      <small v-if="errors.length > 0" class="text-danger">
                        Please enter your YouTube Channel Name / Link
                      </small>
                    </div>
                  </validation-provider>
                  <!-- </b-form-group> -->
                  <!-- submit button -->
                  <b-button
                    class="arrow-btn"
                    type="submit"
                    :disabled="invalid || addChannelLoading" 
                  >
                    <b-spinner variant="dark" v-if="addChannelLoading"/>
                    <span v-else>
                    <!-- <span>Select Video</span> -->
                    <feather-icon class="text-dark" size="30" icon="ArrowRightIcon"/>
                    <!-- <feather-icon size="50" icon="InfoIcon" /> -->
                    </span>
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
            <div class="">
            <Channels @selectChannel="selectChannel" v-bind:channels="channels"/>
          </div>

          </div>
        </b-modal>
        <!-- End Preview Modal  -->
        <div class="bottom-sheet-height">
        <vue-bottom-sheet-vue2 
          ref="add-channel-modal-mobile"
          modal-class="modal-primary"
          centered
          hide-footer
          hide-header
          size="md"
          class="modaltargetting rounded-t-xl"
          no-close-on-backdrop
        >
          <div class="px-1 text-center" style="height: fit-content; padding-bottom: 120px;">
            <h3 class="mb-2 yt-text-mob">
              <b-img
              :src="require('@/assets/images/icons/yt-vector.png')"
              alt="logo"
              height="20%"
              />
              <span class="ml-1">Add YouTube Channel</span></h3>
              <validation-observer ref="addChannelForm" #default="{ invalid }">
                <b-form @submit.prevent="checkLink">
                  <!-- campaign url -->
                  <div class="input-with-button">
                    <!-- <b-form-group> -->
                    <validation-provider
                      #default="{ errors }"
                      name="url"
                      vid="campaignUrl"
                      rules="required"
                      class="w-100"
                    >
                    <div class="d-flex">
                      <b-form-input
                        class="vedioList-input-button"
                        v-model="campaignUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Your YouTube Channel Name / Link"
                      />
                        <div class="youtube">
                          <b-img
                            :src="require('@/assets/images/icons/youtube.png')"
                            alt="logo"
                            height="40px"
                            style="position: absolute; top: 10px; left: 10px;"
                          />
                        </div>
                    </div>
                    <div class="mt-1">
                      <small v-if="errors.length > 0" class="text-danger">
                        Please enter your YouTube Channel Name / Link
                      </small>
                    </div>
                  </validation-provider>
                  <!-- </b-form-group> -->
                  <!-- submit button -->
                  <b-button
                    class="arrow-btn"
                    type="submit"
                    :disabled="invalid || addChannelLoading" 
                  >
                    <b-spinner variant="dark" v-if="addChannelLoading"/>
                    <span v-else>
                    <!-- <span>Select Video</span> -->
                    <feather-icon class="text-dark" size="30" icon="ArrowRightIcon"/>
                    <!-- <feather-icon size="50" icon="InfoIcon" /> -->
                    </span>
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
            <div class="">
            <Channels @selectChannel="selectChannel" v-bind:channels="channels"/>
          </div>
          </div>
              <!-- Modal content goes here -->
            </vue-bottom-sheet-vue2>
            </div>
  </div>
<!-- </div> -->
</template>

<script>
import {
  BTooltip,
} from 'bootstrap-vue'
import { BLink, BNavbarNav, BSpinner, BButton, BFormInput, BImg, BForm } from "bootstrap-vue";
import DarkToggler from "./components/DarkToggler.vue";
import UserDropdown from "./components/UserDropdown.vue";
import store from '@/store'
import axios from '@axios'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from "vee-validate";
// import MainPromoteCard from "@/components/MainPromoteCard";
import VueBottomSheetVue2 from "@webzlodimir/vue-bottom-sheet-vue2";
import Channels from '@/views/add-video/Channels.vue'


// import NotificationDropdown from './components/NotificationDropdown.vue'


import "@core/assets/css/font-awesome-pro.min.css";

export default {
  components: {
    BLink,
        // Navbar Components
    BNavbarNav,
    BSpinner,
    BButton,
    BForm,
    BFormInput, 
    BImg,
    DarkToggler,
    UserDropdown,
    BTooltip,
    // NotificationDropdown,
    ValidationProvider, 
    ValidationObserver,
    VueBottomSheetVue2,
    vSelect,
    Channels,
  
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      addChannelLoading: false,
      loading: true,
      user: {},
      campaignUrl : null,
      loadingUserChannels: true,
      userChannels: [],
      channels: [],
      selectedChannel: null,
      changeSelectedChannel: null,
      baseUrl: window.location.origin,
      image: {
        backgroundImage: `url(${require("@/assets/images/icons/youtube.png")})`,
      },
    };
  },
  watch: {
    '$store.state.app.user': function () {
      this.loading = false
      this.user = this.$store.state.app.user
      if (this.selectedChannel) { this.removeWrongSelectedChannel() }
    },
    '$store.state.user.selectedChannel': function () {
      this.selectedChannel = this.$store.state.user.selectedChannel
      if (this.user) { this.removeWrongSelectedChannel() }
    },
  },
  mounted() {
    this.userChannels.unshift({ channel_title: 'Add Channel' })
    this.getUserChannels()
    // this.$refs.userChannelList.searchEl.focus()
    let el = this

    this.$root.$on('showUserChanneNavlList', function () {
      el.$refs.userChannelList.searchEl.focus()
    })

    this.$root.$on('loadUserChannels', function (data) {
      if (data) { el.changeSelectedChannel = data }
      el.getUserChannels()
    })

    this.$root.$on('changeUserChannels', function (data) {
      if (data) {
        el.selectedChannel = data
        el.OnChangeUserChannel(data)
      }
    })
  },
  computed: {
    device() {
      return store.getters['app/device']
    },
  },
  methods: {
    getUserChannels() {
      this.loadingUserChannels = true

      axios.get('/user_channels', { params: this.params })
        .then(res => {
          this.userChannels = res.data.data
          store.commit('user/UPDATE_CHANNELS', this.userChannels)
          if (this.changeSelectedChannel) {
            this.$store.state.user.selectedChannel = this.$store.state.user.channels.find(c => c.channel_id == this.changeSelectedChannel)
            if (this.$store.state.user.selectedChannel) {
              localStorage.setItem('selected_channel', JSON.stringify(this.$store.state.user.selectedChannel))
            }
          }
          this.userChannels.unshift({ channel_title: 'Add Channel' })
          this.selectedChannel = this.userChannels[1]
          this.loadingUserChannels = false
        })
        .catch(err => {
          let errMsg = 'Something went wrong'
          this.loadingUserChannels = false
        })
    },
    OnChangeUserChannel(selectedChannel) {
      if (selectedChannel.channel_title == 'Add Channel') {
        this.selectedChannel = localStorage.getItem('selected_channel') ? JSON.parse(localStorage.getItem('selected_channel')) : null

        if(this.device == "desktop"){
          this.$refs['add-channel-modal'].show()
        } else {
          this.$refs['add-channel-modal-mobile'].open()
        }

        return
      }

      if (!selectedChannel) { return false }

      store.commit('user/UPDATE_SELECTED_CHANNEL', selectedChannel)
      localStorage.setItem('selected_channel', JSON.stringify(selectedChannel))
    },
    removeWrongSelectedChannel() {
      if (this.user.id && this.selectedChannel && this.selectedChannel.user_id && this.selectedChannel.user_id != this.user.id) {
        localStorage.removeItem('selected_channel')
        if (this.userChannels.length > 1) {
          this.selectedChannel = this.userChannels[1]
          store.commit('user/UPDATE_SELECTED_CHANNEL', this.selectedChannel)
          localStorage.setItem('selected_channel', JSON.stringify(this.selectedChannel))
        }
      }
    },
    checkLink() {
      this.$refs.addChannelForm.validate().then((success) => {
        if (success) {
          this.addChannelLoading = true
          this.videoLists = [];
          this.getID();
        }
      });
    },
    getID() {
      if (
        this.campaignUrl.search("channel") >= 0 ||
        this.campaignUrl.search("user") >= 0 ||
        this.campaignUrl.search("@") >= 0
      ) {
        this.channelID = this.getChannelID(this.campaignUrl);
      } else {
        this.channelID = this.getChannelID(this.campaignUrl);
      }
    },
    getChannelID(url) {
      const pattern1 =
        /^(?:(http|https):\/\/[a-zA-Z-]*\.{0,1}[a-zA-Z-]{3,}\.[a-z]{2,})\/(channel)\/([a-zA-Z0-9_.-]{3,})$/;
      const pattern2 =
        /^(?:https|http)\:\/\/(?:[\w]+\.)?youtube\.com\/(?:c\/|channel\/|user\/|@)?([a-zA-Z0-9_.\-]{1,})$/;
      const matchs1 = url.match(pattern1);
      const matchs2 = url.match(pattern2);
      if (matchs1) {
        this.channelID = matchs1[3];
        this.getChannelById(this.channelID)
      } else if (matchs2) {
        this.channelUsername = matchs2[1];
        this.getChannelIdFromUsername();
      } else {
        this.channelUsername = url;
        this.getChannelIdFromUsername();
      }
      this.showPreviousButton = false;
      this.showNextButton = false;
    },
    getChannelById(channelId) {
      axios
        .get("/video/getChannelById", { params: { channelId } })
        .then(res => {
          this.showHeroSection = false
          this.showChannelSection = false
          this.channels = []
          this.channel = res.data.data
          this.selectChannel(this.channel)
        })
        .catch(() => {
          this.$refs.addChannelForm.setErrors({ campaignUrl: ["Invalid URL"] });
          this.addChannelLoading = false
        });
    },
    getChannelIdFromUsername() {
      const params = { params: { channelUsername: this.channelUsername } };
      axios
        .get("/video/getChannelId", params)
        .then((data) => {
          this.addChannelLoading = false
          this.showHeroSection = false
          this.showChannelSection = true
          this.channels = data.data.data.results;
          this.showPreviousButton = false;
          this.showNextButton = false;
        })
        .catch(() => {
          this.$refs.addChannelForm.setErrors({ campaignUrl: ["Invalid URL"] });
          this.addChannelLoading = false
        });
    },
    selectChannel(channel) {
      // console.log(channel)
      this.showChannelSection = false
      this.channel = channel;
      this.channelID = channel.id.channelId;

      store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', true)

      let channelId = this.channelID
      let channelExists = this.$store.state.user.channels.find(c => c.channel_id == channelId)
      if (channelExists) {
        this.$root.$emit('changeUserChannels', channelExists)
      } else {
        let params = { channelId: channelId, user_id: this.user.id }
        axios.get("/addChannel", { params }).then(res => { this.$root.$emit('loadUserChannels', channelId) })
      }

      store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', false)
      if(this.device == "desktop"){
        this.$refs['add-channel-modal'].hide()
      } else {
        this.$refs['add-channel-modal-mobile'].close()
      }
      setTimeout(() => {
        this.channels = [];
        this.campaignUrl = null;
      }, 500)
      
    },
    openWidget() {
      this.$zendesk.show();
      this.$zendesk.open();
      zE('webWidget:on', 'close', function() {
        zE('webWidget', 'hide');
      });
    },
    closeModal() {
      this.$refs['add-channel-modal'].hide()
    }
  }
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.desktop-user-channel{
  width: 50%;
  @media only screen and (max-width: 870px){width: 95%;}
  @media only screen and (min-width: 870px) and (max-width: 1070px){width: 70%;}
  #vs1__combobox{
    height: 53px;
}
}

.bottom-sheet-height .bottom-sheet__content {
  height: auto !important;
}

.title-new {
  align-self: center !important;
}
.user-channel {
    .vs__dropdown-toggle{
    border: none;
    width: fit-content;
  }
  .vs__search{
    display: none;
  }
  .vs__dropdown-menu{
    width: 80vw
  }
  .vs__dropdown-toggle {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  #vs1__combobox{
    padding: 0;
    width: 40px;
    height: 35px;
    // background-color: red;
  }
  .vs__selected{
    margin: 0 !important;
  }
  .vs__selected-options{
    padding: 0;
  }
  .vs__actions{
    display: none;
  }
}
</style>

<style scoped>
.btn-secondary:hover:not(.disabled):not(:disabled) {
  -webkit-box-shadow: none;
}

.btn-end {
  padding: 10px 12px;
  border-radius: 100%;
  top: 9px;
  right: 4px;
  background: transparent !important;
  border: none;
}
.yt-text {  
  color: #333;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
  padding: 23px;
}

.yt-text-mob {
  color: #333;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
  padding: 23px;
}

.yt-background {
  border-radius: 20px 20px 0px 0px;
  background: #E9E9E9;
  padding-top: 11px;
  margin: -20px;
}
.vedioList-input-button-container {
  position: relative;
  width: 100%;
}

.arrow-btn {
  background-color: rgba(255, 255, 255, 0) !important;
  border: none !important;
  border-collapse: collapse;
}

.vedioList-input-button {
  font-size: 16px;
  line-height: 100%;
  padding: 17px 40px 17px 45px;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
  color: #1d1b28;
  text-overflow: ellipsis;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: box-shadow 0.2s ease-out;
}

.vedioList-input-button:focus-visible {
  outline: none;
}

.input-with-button__cancel {
  margin: 0;
  padding: 0;
  outline: none !important;
  border: none;
  background: none;
  cursor: pointer;
  color: #dee1ff;
  transition: color 0.2s ease-out;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  align-items: center;
  width: 40px;
  height: 100%;
}

.VideoList-button {
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  position: relative;
  z-index: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 58px;
  padding: 17px 30px;
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
}

.VideoList-button:focus {
  outline: none;
}

.youtube {
  position: absolute;
}

.premium {
  color: #FFD700 !important;
   background-color: #000;
   /* background-color: #5a44dc; */
    padding: 0.2rem 0.5rem;
    border-radius: 0.358rem;
}
#wallet-icon {
    font-size: 16px;
    margin-right: 20px;
    color: #333333;
      /* Adjust the size as needed */
      line-height: 20px;
}

#cash-value {
    font-size: 16px;
      /* Adjust the size as needed */
      color: #333333;
      line-height: 20px;
}

.dollar-sign {
    font-size: 16px;
      /* Adjust the size as needed */
      color: #333333;
      line-height: 20px;
}

.icon-container {
    display: flex;
    align-items: center;
    /* box-shadow: 0 3px 10px rgba(84, 84, 84, 0.1); */
      /* Adjust the shadow values as needed */
    padding: 10px;
    border-radius: 4px;
      /* Add rounded corners if desired */
}
.input-with-button {
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.20);
}
.chat-icon {
  padding: 8px;
  cursor: pointer;
  background-color: #f3eafb;
  margin : 0 7px;
}

.ml-0\.5 {
  margin-left: 0.55rem !important;
}

.live-dot {
  font-size: 3rem;
  top: -18px;
  right: 0px;
}

#wallet-icon{
  color: #333333 !important;
  margin-right: 9px !important;
  font-size: 20px !important;
}

.icon-container{
  border-radius: 76px;
  margin-right: -38px;
  /* width: 114px; */
  height: 35px;
}
[dir=ltr] .vertical-overlay-menu .content {
  background: #EAEAEA;
}

@media only screen and (max-width:280px) {
    .chat-icon {
    margin: 0 7px;
  }
  .dollar-sign, #cash-value {
    font-size: 13px;
  }
  .fa-wallet{
    display: none;
  }

}
@media only screen and (max-width: 767px){
  #wallet-icon{
    color: #00BD4C !important;
  }

  .icon-container{
    border: 2px solid #00BD4C;
    background: rgba(0, 189, 76, 0.17);
  }
  .input-with-button{
    display: flex;
    height: 62px;
    padding: 0;
    border: 1px solid #d8d6de;
    border-radius: 17px;
  }

}

@media only screen and (min-width: 768px) {
  .input-with-button {
    display: flex;
    padding-top: 4px;
    padding-right: 4px;
    padding-bottom: 4px;
    padding-left: 4px;
    height: 68px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 3px 16px rgba(110, 125, 177, 0.28);
    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  }
}

</style>