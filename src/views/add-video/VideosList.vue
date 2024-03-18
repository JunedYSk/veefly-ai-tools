<template>
  <div class="imgsize" :style="image">
    <b-row class="text-center" align-v="center">  
      <!-- Start Desktop Version -->
      <transition name="slide-fade">
        <div class="w-100">
          <div  class="w-100" style=" padding-top: 10vh;"  v-if="device == 'desktop'"> 
          <div v-if="!showFilteredResult">
          <b-col>
            <!-- Google Partner Badge Start -->
            <div class="d-flex justify-content-center text-center">
              <div class="mb-3 px-1 px-2 mt-4 display-5" style="background-color: black; border-radius: 8rem; padding: 5px 10px; font-size: larger;">
                <span style="color:#9B51E0;">G</span>
                <span style="color:#2F80ED ;">o</span>
                <span style="color:#EB5757 ;">o</span>
                <span style="color:#F2C94C ;">g</span>
                <span style="color:#2F80ED ;">l</span>
                <span style="color:#27AE60;">e</span>
                <span style="color:#FFFFFF ;">  Partner</span>
              </div>
            </div>
            <!-- Google Partner Badge End -->
            <!-- Heading Text Start -->
            <div id="heading" class="container justify-content-center text-center" >
              <div id="heading-element-2">
                <p class="display-4 mb-5" style="color: #333333;">
                  <span>Start</span> <span>Your</span> <span style="font-weight:1000; color: black;">YouTube</span> <br>
                  <span style="font-weight:1000; color: black;">Promotions</span> <span>with</span> <span>just </span><span style="font-weight:1000; color: black;">$10</span>
                </p>
              </div>
            </div>
            <!-- Heading Text End -->
          </b-col>
          <!-- Input Field Start -->
          <b-col
            md="10"
            lg="8"
            class="mb-0 text-center offset-lg-2 offset-md-1"
          >
          <!-- validation -->
          <validation-observer ref="campaignForm" #default="{ invalid }">
            <b-form @submit.prevent="checkLink">
              <!-- campaign url -->
              <div class="input-with-button">
                <!-- <b-form-group> -->
                <validation-provider
                #default="{ errors }"
                name="url"
                vid="campaignUrl"
                rules="required|url: 'https://.*' "
                style="width: calc(100% - 59px);"
                >
                <div class="d-flex">
                  <b-form-input
                    class="vedioList-input-button"
                    v-model="campaignUrl"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter Your YouTube Video Link"
                    />
                    <div class="youtube">
                      <b-img
                        :src="require('@/assets/images/icons/youtube.png')"
                        alt="logo"
                        height="40px"
                        style="position: absolute; top: -5px; left: -10px;"
                      />
                    </div>
                </div>
                  <div class="mt-1">
                    <small v-if="errors.length > 0" class="text-danger"
                    >Please enter your YouTube Video Link</small
                    >
                  </div>
                </validation-provider>
                <!-- </b-form-group> -->
                <!-- submit button -->
                <b-button
                  class="arrow-btn"
                  type="submit"
                  :disabled="invalid || loading" 
                >
                  <b-spinner variant="dark" v-if="loading"/>
                  <span v-else>
                  <!-- <span>Select Video</span> -->
                  <feather-icon class="text-dark" size="30" icon="ArrowRightIcon"/>
                  <!-- <feather-icon size="50" icon="InfoIcon" /> -->
                  </span>
                </b-button>
              </div>
            </b-form>
          </validation-observer>
          </b-col>
            <!-- Input Field End -->
            <!-- Steps Start -->
          <b-col class="text-center" offset-md="1" md="10" xl="10">
            <div class="container" v-if="showHeroSection">
              <div class="row">
                <div class="col-md-4 px-5">
                  <div class="icons">
                    <b-img class="mt-5 col-md-4 py-1 bg-white rounded-circle" style="width: 60px;height: 60px;" :src="url"/> 
                  </div>
                  <h3 class="mt-2">Enter URL Link</h3>
                  <p>Enter the URL which you want to promote</p>
                </div>
                <div class="col-md-4 px-5">
                  <b-img
                    :src="step2"
                    class="far fa-long-arrow-right icon-position "
                  />
                  <div class="icons">
                    <b-img class="mt-5 col-md-4 py-1 bg-white rounded-circle" style="width: 60px;height: 60px;" :src="cambg"/> 
                  </div>
                  <h3 class="mt-2">Set Up your Campaign</h3>
                  <p>
                    Set your target audience, budget, and check the estimated
                    views
                  </p>
                </div>
                <div class="col-md-4 px-5">
                  <b-img
                    :src="step2"
                    class="far fa-long-arrow-right icon-position "
                  />
                  <div class="icons">
                    <b-img class="mt-5 col-md-4 py-1 bg-white rounded-circle" style="width: 60px;height: 60px;" :src="paybg"/> 
                  </div>
                  <h3 class="mt-2">Make Payment</h3>
                  <p>
                    Complete the payment, and voila, sit back and watch your
                    video go viral
                  </p>
                </div>
              </div>
            </div>
            <!-- <div v-if="showheading" class="divider mt-4 mb-2">
              <b-skeleton-wrapper :loading="skeletonLoading">
                <template #loading>
                  <b-skeleton width="100%"></b-skeleton>
                </template>
              </b-skeleton-wrapper>
              <h2 v-if="videoLists[0]" class="text-wrap">
                {{ videoLists[0].snippet.channelTitle }}
              </h2>
            </div> -->
          </b-col>
          <!-- Steps End -->
          <div class="col-md-8 offset-md-2">
            <Channels @selectChannel="selectChannel" v-bind:channels="channels"/>
          </div>
        </div>
        <div class="w-100" v-else style="display: inline-block;">
          <b-row
            class="px-1 blog-list-wrapper mh-100 d-flex justify-content-center d-inline-block" 
          >
            <MainPromoteCard :key="$route.path" v-if="showFilteredResult" class="my-1 d-inline-block" :channelId="channelID" :channel="channel" :channels="channels"/>
          </b-row>
        </div>
        </div>
            <!-- End Desktop Version -->
            <!-- Start Mobile Version -->
      <div v-else class="w-100">
        <div >
          <div v-if="!showFilteredResult">
          <div style="background: linear-gradient(96deg, #50148B -0.01%, #9B51E0 100.01%);">
            <b-row class="mobile-ui w-100 m-0" :style=" mobileImage">
              <b-col  class="mobile-image">
                <div class="d-flex justify-content-center text-center">
                  <div class=" mb-2" style="background-color: #212121; border-radius: 8rem; padding: 5px 10px; font-size: larger; margin-top: 90px;">
                    <span style="color:#9B51E0;">G</span>
                    <span style="color:#2F80ED;">o</span>
                    <span style="color:#EB5757;">o</span>
                    <span style="color:#F2C94C;">g</span>
                    <span style="color:#2F80ED;">l</span>
                    <span style="color:#27AE60;">e</span>
                    <span style="color:#FFFFFF;">  Partner</span>
                  </div>
                </div>
                <div id="heading" class="container text-center">
                  <div id="heading-element-2">
                    <p class="mb-3 px-0" style="color: #FFFFFF; font-size: 25px; line-height: 2.5rem;">
                      Start Your <span style="color: #333333;" class="font-weight-bold">YouTube</span> Promotions with just $10
                    </p>
                  </div>
                </div>
              </b-col>
              <b-col 
              class="px-1 col-12 mb-3 text-center"
              >
                <validation-observer ref="campaignForm" #default="{ invalid }">
                  <b-form @submit.prevent="checkLink">
                    <!-- campaign url -->
                    <div class="input-with-button">
                      <!-- <b-form-group> -->
                      <validation-provider
                        #default="{ errors }"
                        name="url" 
                        vid="campaignUrl"
                        rules="required|url: 'https://.*' "
                        style="width: calc(100% - 59px);"
                      >
                        <div class="d-flex">
                          <b-form-input
                            class="vedioList-input-button"
                            style="position: relative;"
                            v-model="campaignUrl"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Your YouTube Video Link"
                          />
                          <b-button
                          class="arrow-btn"
                          type="submit"
                          :disabled="invalid || loading"
                      >
                        <b-spinner variant="dark" v-if="loading"/>
                        <span v-else>
                          <feather-icon class="text-dark" size="30" icon="ArrowRightIcon"/> 
                        </span>
                        </b-button>
                          <div class="youtube">
                              <b-img
                              :src="require('@/assets/images/icons/youtube.png')"
                              alt="logo"
                              height="40px"
                              style="position: absolute; top: -9px;left:-14px;"
                              />
                          </div> 
                        </div>
                        <div>
                          <small v-if="errors.length > 0" class="text-danger" style="font-size:11px"
                          >Please enter your YouTube Video Link</small
                          >
                        </div>
                      </validation-provider>
                    </div>
                  </b-form>
                </validation-observer>
              </b-col>
            </b-row>
          </div>   
            <!-- Steps Start -->
            <b-row 
            v-if="showHeroSection" 
            class="eclipse w-100 d-flex m-0 py-2 px-1" 
            :style="mobileeclipse">
            <div class="col-12 px-0">
              <b-row class="layout">
                <div class="col-4 col-xs-4 p-0 d-flex justify-content-center align-items-center">
                  <b-img class="d-flex justify-content-center align-items-center py-1 bg-white rounded-circle"
                  style="width: 60px;height: 60px;"  :src="url"/> 
                </div>
                <div class="col-8 col-xs-8 p-0">
                  <h3 class="mt-2 text-left">Enter URL Link</h3>
                  <p class="text-left pr-1">
                    Enter the URL which you want to promote
                  </p>
                </div>
              </b-row>
            </div>
            <div class="col-12 px-0">
              <b-row class="layout">
                <div class="col-4 col-xs-4 p-0 d-flex justify-content-center align-items-center">
                  <b-img class="d-flex justify-content-center align-items-center py-1 bg-white rounded-circle"
                  style="width: 60px;height: 60px;" :src="cambg"/> 
                </div>
                <div class="col-8 col-xs-8 p-0">
                  <h3 class="mt-2 text-left">Set Up your Campaign</h3>
                  <p class="text-left pr-1">
                    Set your target audience,budget, and check the estimated
                    views
                  </p>
                </div>
              </b-row>
            </div>
            <div class="col-12 px-0">
              <b-row class="layout">
                <div class="col-4 p-0 d-flex justify-content-center align-items-center">
                  <b-img class="d-flex justify-content-center align-items-center py-1 bg-white rounded-circle"
                  style="width: 60px;height: 60px;"
                   :src="paybg"/> 
                </div>
                <div class="col-8 p-0">
                  <h3 class="mt-2 text-left">Make Payment</h3>
                  <p class="text-left pr-1">
                    Complete the payment, and voila, sit back and watch your
                    video go viral
                  </p>
                </div>
              </b-row>
            </div>
          </b-row>
          <!-- Steps End -->
          <!-- Select Channel Starts -->
          <div class="col-md-8 offset-md-2 py-3 px-0 mt-n4">
            <Channels @selectChannel="selectChannel" v-bind:channels="channels"/>
          </div>
        </div>
        <div v-else>
          <b-row
            class="blog-list-wrapper mh-100 d-flex  justify-content-center" 
          >
            <MainPromoteCardMobile :key="$route.path" v-if="showFilteredResult" :channelId="channelID" :channel="channel" :channels="channels" />
          </b-row>
        </div>
          <!-- Select channel ends -->
        </div>
        </div>
      </div>
      </transition> 
    </b-row>
  </div>
</template>
<script>
import {
  BRow,
  BButton,
  BCol,
  BCard,
  BCardText,
  BCardTitle,
  BMedia,
  BMediaAside,
  BMediaBody,
  BImgLazy,
  BCardBody,
  BLink,
  BPagination,
  BFormInput,
  BFormGroup,
  BForm,
  BSpinner,
  VBPopover,
  BSkeletonWrapper,
  BSkeleton,
  BSkeletonImg,
  BImg,
  BFormRadio,
  BOverlay,
} from "bootstrap-vue";
import { kFormatter } from "@core/utils/filter";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import axios from "@axios";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useVideosList from "./useVideosList";
import videoStoreModule from "./videoStoreModule";
import Channels from './Channels.vue'
import MainPromoteCard from "@/components/MainPromoteCard";
import MainPromoteCardMobile from "@/components/MainPromoteCardMobile";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BCardBody,
    BCardTitle,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    BImgLazy,
    BPagination,
    BButton,
    BFormInput,
    BFormGroup,
    BForm,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
    VBPopover,
    BSkeletonWrapper,
    BSkeleton,
    BSkeletonImg,
    BImg,
    BFormRadio,
    Channels,
    BOverlay,
    MainPromoteCard,
    MainPromoteCardMobile,
  },
  directives: {
    Ripple,
    "b-popover": VBPopover,
  },
  data() {
    return {
      loading: false,
      params: {},
      showHeroSection: true,
      showChannelSection: false,
      showFilteredResult: false,
      selectedOption: 1,
      stats:null,
      statics:null,
      selectedVideoIds: [],
      selected: 'recent',
      selectedVideoId: null,
      showheading: false,
      showPreviousButton: false,
      showNextButton: false,
      channels: [],
      channel_id: null,
      step2: require("@/assets/images/preview/wave.svg"),
      url: require("@/assets/images/preview/content-copy-one.svg"),
      cambg: require("@/assets/images/preview/email-fast.svg"),
      paybg: require("@/assets/images/preview/account-cash-one.svg"),
      image: {
        backgroundImage: `url(${require("@/assets/images/preview/videobg.svg")})`,
      },
      mobileImage:{
        backgroundImage:`url(${require("@/assets/images/freeviews/mobile-version-background-image.png")})`
      },
      mobileeclipse:{
        backgroundImage :`url(${require("@/assets/images/freeviews/group-circle.png")})`,
      },
      skeletonLoading: false,
      nextPageToken: null,
      prevPageToken: null,
      videoLists: [],
      selectedVideos: [],
      currentVideoId: null,

      // validation rules
      required,
      scrolledToBottom: false,
    };
  },
  computed:{
    device(){
      return store.getters['app/device']
    }  
  },
  watch: {
    videoID() {
      this.getVideoStatus().then((data) => {
        store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', true)
        let params = { videoId: this.videoID, user_id: this.user.id }
        axios.get("/addChannel", { params }).then(res => {
          let channelId = res.data.data.snippet.channelId
          let channelExists = this.$store.state.user.channels.find(c => c.channel_id == channelId)
          if (channelExists) {
            this.$root.$emit('changeUserChannels', channelExists)
          } else {
            this.$root.$emit('loadUserChannels', channelId)
          }
          store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', false)
        })
        // .catch(err => {
        //   if (this.$route.name != 'video-list') {
        //     this.$router.push({
        //       name: "video-list",
        //       params: { errors: "Error on fetching video details" },
        //     })
        //   }
        // })

        if (data && !this.channel) {
          this.$router.push({
            name: "add-video",
            params: { id: this.videoID },
          });
        }
      });
    },
    "selectedOption": function () {
      this.selectedVideoIds = []
    },
    'showFilteredResult': function () {
      if (this.showFilteredResult) {
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
      }
    },
    '$store.state.app.user': function () {
      if (this.$store.state.app.user) {
        this.user = this.$store.state.app.user
      }
    },
  },
  beforeMount() {
    if (this.$route.params.errors) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: this.$route.params.errors,
          icon: "AlertTriangleIcon",
          variant: "danger",
        },
      });
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length !== 0) {
      localStorage.setItem("queryParams", JSON.stringify(this.$route.query));
    }
    let el = this
    this.$root.$on('showChannelSection', function (data) {
      el.showChannelSection = data
    })

    this.$root.$on('showFilteredResult', function (data) {
      el.showFilteredResult = data
    })
  },
  // mounted() {
  //   this.scroll();
  // },
  methods: {
    onBackButtonClick() {
      this.showFilteredResult = false // Hide the <b-row>
      this.selectedVideoIds = []

      if (this.channels.length) { this.showChannelSection = true }
      else { this.showHeroSection = true }
    },
    formatViewsCount(count) {
      count = parseInt(count);
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + "M views";
      }
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K views";
      }
      return count.toLocaleString() + " views";
    },
    getTimeDifference(publishedAt) {
      const publishedDate = new Date(publishedAt);
      const currentDate = new Date();

      // Calculate the time difference in milliseconds
      const timeDiffMs = currentDate - publishedDate;

      // Convert the time difference to seconds, minutes, hours, days, months, and years
      const secondsDiff = Math.floor(timeDiffMs / 1000);
      const minutesDiff = Math.floor(secondsDiff / 60);
      const hoursDiff = Math.floor(minutesDiff / 60);
      const daysDiff = Math.floor(hoursDiff / 24);
      const monthsDiff = Math.floor(daysDiff / 30); // Assuming 30 days per month
      const yearsDiff = Math.floor(monthsDiff / 12);

      if (yearsDiff > 0) {
        return `${yearsDiff} Year${yearsDiff === 1 ? '' : 's'} ago`;
      } else if (monthsDiff > 0) {
        return `${monthsDiff} Month${monthsDiff === 1 ? '' : 's'} ago`;
      } else if (daysDiff > 0) {
        return `${daysDiff} Day${daysDiff === 1 ? '' : 's'} ago`;
      } else if (hoursDiff > 0) {
        return `${hoursDiff} Hour${hoursDiff === 1 ? '' : 's'} ago`;
      } else if (minutesDiff > 0) {
        return `${minutesDiff} Minute${minutesDiff === 1 ? '' : 's'} ago`;
      } else {
        return `${secondsDiff} Second${secondsDiff === 1 ? '' : 's'} ago`;
      }
    },
    kFormatter,
    checkLink() {
      this.$refs.campaignForm.validate().then((success) => {
        if (success) {
          this.loading = true
          this.videoLists = [];
          this.getID();
        }
      });
    },
    getID() {
      if (
        this.campaignUrl.search("v=") === -1 &&
        (
          this.campaignUrl.search("channel") >= 0 ||
          this.campaignUrl.search("user") >= 0 ||
          this.campaignUrl.search("@") >= 0
        )
      ) {
        this.channelID = this.getChannelID(this.campaignUrl);
      } else {
        const videoid = this.getVideoID(this.campaignUrl);
        if (!videoid) {
          this.$refs.campaignForm.setErrors({ campaignUrl: ["Invalid Url"] });
          this.loading = false;
          return;
        }
        this.videoID = videoid;
      }
    },
    selectVideoId(videoID) {
      // console.log("hit 3");
      this.videoID = videoID;
      const index = this.selectedVideoIds.indexOf(videoID);
      if (index > -1) {
        this.selectedVideoIds.splice(index, 1);
      } else {
        if (this.selectedVideoIds.length >= 5) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "You can select up to 5 videos",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
        });
        } else {
          this.selectedVideoIds.push(videoID);
        }
      }
      // console.log("Selected Video IDs:", this.selectedVideoIds);
    },
    promotenow()
    {
      this.videoID = this.selectedVideoIds;
        if (this.videoID) {
          this.$router.push({
            name: "channel-add-video",
            params: { id: this.videoID, channel: this.channel },
          });
        }
    },
    filterPageChange(token) {
      if (!token) return
      this.params.params.pageToken = token
      this.filterChange()
    },
    filterChange() {
      if (!this.selectedOption) { this.selectedOption = 1 }
      this.loading = true
      this.videoLists = []
      this.showPreviousButton = false
      this.showNextButton = false
      this.params.params.id = this.channelID
      let filterResult = null
      if (this.selectedOption == 1) { filterResult = this.getRecent() }   // recent
      else if (this.selectedOption == 2) { filterResult = this.getPopular() }   // popular
      else if (this.selectedOption == 3) { filterResult = this.getChannel() }   // manually
      filterResult
        .then(res => {
          this.loading = false
          if (this.selectedOption == 1 || this.selectedOption == 2) {
            this.videoLists = this.videoLists.concat(res.data.data.results)
            this.selectedVideoIds = this.videoLists.map(
              (video) => video.id.videoId
            )
          }
          else if (this.selectedOption == 3) {
            this.videoLists = this.videoLists.concat(res.data.data.results)
            this.nextPageToken = res.data.data.info.nextPageToken
            this.prevPageToken = res.data.data.info.prevPageToken
            this.showPreviousButton = true
            this.showNextButton = true
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error Fetching Videos List",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          })
          this.loading = false
        })
    },
    getRecent() {
      return axios.get("/video/getRecentVideos", this.params)
    },
    getPopular() {
      return axios.get("/video/getReleventVideos", this.params)
    },
    getChannel() {
      return axios.get("/video/getChannelVideos", this.params)
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
        this.$refs.campaignForm.setErrors({ campaignUrl: ["Invalid URL"] });
        this.loading = false
        return
      }
      this.showPreviousButton = false;
      this.showNextButton = false;
      this.showheading = false;
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
          this.$refs.campaignForm.setErrors({ campaignUrl: ["Invalid URL"] });
          this.loading = false
        });
    },
    getChannelIdFromUsername() {
      const params = { params: { channelUsername: this.channelUsername } };
      axios
        .get("/video/getChannelId", params)
        .then((data) => {
          this.loading = false
          this.showHeroSection = false;
          this.showChannelSection = true;
          this.channels = data.data.data.results;
          this.showPreviousButton = false;
          this.showNextButton = false;
          this.showheading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    hidePreviewModal() {
      if (!this.skeletonLoading) {
        this.showHeroSection = true;
      }
    },

    getVideoID(url) {
      let ID = "";
      url = url
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else ID = url;
      return ID;
    },
    clearInput() {
      this.campaignUrl = '';
    },
    selectChannel(channel) {
      this.showChannelSection = false
      this.showFilteredResult = true
      this.channel = channel;
      this.channelID = channel.id.channelId;
      this.params = { params: { id: this.channelID } }
      this.selectedOption = 1
      this.filterChange()
      this.showPreviousButton = false
      this.showNextButton = false
      this.showheading = false
    },
    async getVideoStatus() {
      // this.loading = true;
      return await axios
        .get("/campaigns/status", {
          params: {
            video_id: this.videoID,
          },
        })
        .then((data) => true)
        .catch((err) => {
          this.loading = false;
          this.rejectedByGoogle(err.response.data.message.message);
        });
    },
    rejectedByGoogle(message) {
      this.$swal({
        icon: "info",
        title: "Oops...",
        text: message,
        customClass: {
          confirmButton: "btn btn-primary",
        },
        confirmButtonText: "I Understood",
        buttonsStyling: false,
      });
    },
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";
    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, videoStoreModule);
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });
    const {
      channelID,
      videoID,
      campaignUrl,
      fetchVideos,
      perPage,
      currentPage,
      totalVideos,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      refetchData,
      resolveJson,
    } = useVideosList();
    return {
      channelID,
      videoID,
      campaignUrl,
      fetchVideos,
      perPage,
      currentPage,
      totalVideos,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      refetchData,
      resolveJson,
    };
  },
};
</script>
<style scoped>
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  white-space: nowrap;
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
}

.vedioList-input-button-container {
  position: relative;
  width: 100%;
}
.vedioList-input-button {
  font-size: 16px;
  line-height: 100%;
  padding: 17px 40px 17px 66px;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 12px;
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
.youtube {
  left: 36px;
  top: 20px;
  position: absolute;
}
.youtube1 {
  left: 36px;
  top: 55px;
  position: absolute;
}
.xicon {
  position: absolute;
  right: 240px;
  top: 20px;
}
.xicon1 {
  position: absolute;
  right: 235px;
  top: 56px;
}
[dir] .btn-secondary:hover:not(.disabled):not(:disabled){
  box-shadow: none;
  /* box-sha */
}
[dir] .form-control:focus:valid, [dir] .form-control:focus.is-valid{
  box-shadow: none;
}
@media only screen and (min-width: 767px) and (max-width: 844px){
  .xicon {
    right: 175px;
  }
}
@media only screen and (max-width: 766px){
  .xicon {
    right: 27px;
  }
}
.icon-position {
  font-size: 22px;
  position: absolute;
  left: -120px;
  top: 90px;
  color: #5a44dc;
}
.imgsize {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  /* margin: -8%; */
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
/* .app-content {
  padding: 0 !important;
} */
.eclipse {
  background-image :url(/Users/admin/Documents/projects/veefly-dashboard-development/src/assets/images/freeviews/group-circle.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100px;
  padding: 30px 0;
}
.eclipse p {
  line-height: normal;
  color: #828282;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.24px;
}
.eclipse h3 {
  color: black;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.32px;
}
.mobile-ui {
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-position-x: center;
}
.mobile-image {
  background-repeat: no-repeat;
  background-position-y: bottom;
}
.arrow-btn {
  background-color: rgba(255, 255, 255, 0) !important;
  border: none !important;
  border-collapse: collapse;
  position: absolute;
  top: 9%;
  right:11px;
 }
/* .app-content {
  padding: 0 !important;
} */
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
.vedioList-input-button {
  padding: 17px 40px 17px 45px;
}
@media only screen and (max-width: 767px) {
  .input-with-button {
    display: flex;
    height: 61px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 3px 16px rgba(110, 125, 177, 0.28);
    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  }
  .arrow-btn {
    right: 4px;
  }
  .vedioList-input-button {
    padding: 13px 40px 13px 45px;
    border-radius: 12px;
  }
}
@media only screen and (min-width: 844px) {
  .videoList-submit {
    flex-shrink: 0;
    margin-top: 0;
    min-width: 210px;
    width: auto;
    height: auto;
  }
}
.videoList-button {
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

.videoList-button:focus {
  outline: none;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .icons {
    height: 135px;
    width: 274px;
    margin-left: -79px;
  }
  .icon-position {
    height: 50px;
    width: 136px;
    position: absolute;
    left: -76px;
    top: 77px;
  }
  .offset-md-3 {
    margin-left: 17%;
  }
  .videoList-button[data-v-6bd6a610] {
    font-weight: 500;
    font-size: 15px;
    line-height: 104%;
    position: relative;
    z-index: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    gap: 16px;
    min-height: 58px;
    color: #fff;
  }
}
@media only screen and (min-width: 973px) and (max-width: 1450px) {
  .icons {
    height: 135px;
    width: 274px;
    margin-left: -47px;
  }
  .icon-position {
    height: 50px;
    width: 136px;
    position: absolute;
    left: -64px;
    top: 77px;
  }
  .offset-md-3 {
    margin-left: 17%;
  }
  .col-md-12 {
    max-width: 65%;
  }
}
@media only screen and (min-width: 1451px) and (max-width: 1600px) {
  .icons {
    height: 135px;
    width: 274px;
    margin-left: -34px;
  }
  .icon-position {
    height: 50px;
    width: 187px;
    position: absolute;
    left: -99px;
    top: 77px;
  }
  .offset-md-3 {
    margin-left: 17%;
  }
  .col-md-6 {
    max-width: 65%;
  }
}
.channnelcard {
  border-radius: 30px;
  /* width: 170px;
  height: 200px; */
  box-shadow: inset 0 -3px 7px rgba(155, 81, 224, 0.103) !important;
  -webkit-box-shadow: inset 0 0 6px rgba(155, 81, 224, 1) !important;
}
.box {
  transition: box-shadow 0.5s;
  width: 170px;
  height: 190px;
  border-radius: 30px;
}
.box:hover {
  box-shadow: 0 0 11px rgba(155, 81, 224, 0.384);
}

.selected-video .videolisttitle {
  color: white;
}
.selected-video .videolistdescription {
  color: white;
}

.mainvideolistcard:hover .videolisttitle,
.mainvideolistcard:hover .videolistdescription {
  color: white;
}
.mainvideolistcard {
  padding: 10px;
  border-radius: 10px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important;
  -webkit-box-shadow: inset 0 0 6px rgb(155, 81, 224) !important;
  width: 100%;
  margin-left: auto;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
}
.mainvideolistcard:hover {
  opacity: 0.7;
  background-color: rgb(155, 81, 224);
}
.videolistdescription {
  color: #69777ebd;
  font-size: 12px;
  font-weight: 500;
  margin-left: 10px;
  line-height: 0;
}

.videolisttitle {
  color: #263238;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
@media screen and (max-width: 400px) {
  .videolisttitle {
    margin:0;
    margin-top:3px;
    text-align: center;
  }
}



@media screen and (min-width: 426px) and (max-width: 575px) {
    .videolisttitle {
      margin: auto 8px;
  }
}

.channelimg {
  width: 85px;
  margin-top: 12px;
}
.channeltitle {
  font-size: 13px;
  font-weight: bold;
  color: black;
  margin-top: 17px;
}
.channelsubs {
  margin-top: 10px;
}
.channelmain {
  margin-left: 24px;
}

.selectchanneltext {
  font-size: 20px;
  margin-left: 16px;
  margin-top: 57px;
  color: black;
}

.channelinput {
  margin-top: -197px;
  margin-left: 40px;
}
.videoinput {
  margin-top: -197px;
  margin-left: 40px;
}
.videomain {
  margin-left: 24px;
}
.selectVideotext {
  font-size: 20px;
  margin-left: 16px;
  margin-top: 57px;
  color: black;
}
.videoinput {
  font-size: 16px;
  color: black;
}
.highvideolist {
  width: 70vw;
}
.highvideolist {
  height: auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.06) !important;
}

.filtervideolist{
  font-size: 24px;
  color: black;
}
.checkboxhead{
  font-size: 16px;
  font-weight: 500;
  color: black;
}
.selected-video{
  background-color: rgba(155, 81, 224, 1);
}
.card-body{
  padding: 0;
  margin-top: 89px;

}
@media only screen and (max-width: 426px) {
.inside-card{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
}
@media only screen and (max-width: 426px) {
.remove_in_responsive {
display: none;
  }
}
.videoliststack {
  border-radius: 10px;
  width: 145px;
  height: 80px;
}
@media only screen and (max-width: 426px) {
.videoliststack {
  width: 90%;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;  
  }
}
.loader-demo-box {
  border-radius: 0.25rem !important;
}
.loader-demo-box {
  width: 100%;
  height: 200px;
}
.jumping-dots-loader {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}
.jumping-dots-loader span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: rgba(155, 81, 224, 1);
  margin: 35px 5px;
}
.jumping-dots-loader span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}
.jumping-dots-loader span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}
.jumping-dots-loader span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}
@keyframes bounce {
  0%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25% {
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
.previewad {
  border-radius: 17px;
  border: 3px solid; /* Replace #FF0000 with your desired border color */
  border-color: rgb(241 226 255 / 52%) !important;
}
.previewad1 {
  border-radius: 17px;
  border: 0px solid;
  background-color: rgba(155, 81, 224, 0.315);
  border-color: rgb(255 255 255 / 52%) !important;
}
.stepsmain {
  text-align: center;
  margin-top: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.steps {
  border-radius: 25px;
    padding: 20px;
    background-color: transparent !important;
    margin-right: 5px;
}
.checkicon {
  position: relative;
    color: rgb(0, 0, 0);
    left: 27px;
}
.steptext {
  font-size: 18px;
    font-weight: 500;
}
.steptextgray {
  font-size: 18px;
    font-weight: 500;
}
.line {
  position: relative;
  left: 330px;
  top: -22px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 37%;
}
.line2 {
  position: relative;
  left: 315px;
  top: -22px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 30%;
}
.line3 {
  position: relative;
  left: 353px;
  top: -22px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 30%;
}
@media only screen and (min-width: 1780px) and (max-width: 1850px) {
  .line {
    position: relative;
    left: 315px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 37%;
  }
  .line2 {
    position: relative;
    left: 300px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }
  .line3 {
    position: relative;
    left: 335px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }
}  
@media only screen and (min-width: 1715px) and (max-width: 1779px) {
  .line {
    position: relative;
    left: 300px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 37%;
  }
  .line2 {
    position: relative;
    left: 290px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }
  .line3 {
    position: relative;
    left: 325px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }
}
@media only screen and (min-width: 1635px) and (max-width: 1714px) {
  .line {
    position: relative;
    left: 300px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }
  .line2 {
    position: relative;
    left: 278px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .line3 {
    position: relative;
    left: 315px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
}
@media only screen and (min-width: 1575px) and (max-width: 1634px) {
  .line {
    position: relative;
    left: 290px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .line2 {
    position: relative;
    left: 275px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 310px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
}
@media only screen and (min-width: 1485px) and (max-width: 1574px) {
  .line {
    position: relative;
    left: 272px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .line2 {
    position: relative;
    left: 255px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 293px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 16px;
  }
  .steptextgray{
    font-size: 16px;
  }
}
@media only screen and (min-width: 1418px) and (max-width: 1484px) {
  .line {
    position: relative;
    left: 255px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .line2 {
    position: relative;
    left: 240px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 270px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1360px) and (max-width: 1417px) {
  .line {
    position: relative;
    left: 242px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .line2 {
    position: relative;
    left: 235px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 250px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1313px) and (max-width: 1359px) {
  .line {
    position: relative;
    left: 230px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 222px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 235px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1218px) and (max-width: 1312px) {
  .line {
    position: relative;
    left: 212px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 205px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 220px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1217px) {
  .line {
    position: relative;
    left: 210px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 205px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 205px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1155px) and (max-width: 1199px) {
  .line {
    position: relative;
    left: 265px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 240px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 272px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1148px) and (max-width: 1154px) {
  .line {
    position: relative;
    left: 245px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 225px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 257px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 1069px) and (max-width: 1147px) {
  .line {
    position: relative;
    left: 245px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 230px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 238px;
    top: -44px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 16px;
  }
  .steptextgray{
    font-size: 16px;
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1068px) {
  .line {
    position: relative;
    left: 224px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 220px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 219px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 990px) and (max-width: 999px) {
  .line {
    position: relative;
    left: 224px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 220px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 219px;
    top: -44px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 934px) and (max-width: 989px) {
  .line {
    position: relative;
    left: 205px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 206px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 205px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 918px) and (max-width: 933px) {
  .line {
    position: relative;
    left: 199px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 190px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 190px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 14px;
  }
  .steptextgray{
    font-size: 14px;
  }
}
@media only screen and (min-width: 860px) and (max-width: 917px) {
  .line {
    position: relative;
    left: 190px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 180px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 180px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 12px;
  }
  .steptextgray{
    font-size: 12px;
  }
}
@media only screen and (min-width: 845px) and (max-width: 859px) {
  .line {
    position: relative;
    left: 180px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line2 {
    position: relative;
    left: 180px;
    top: -22px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .line3 {
    position: relative;
    left: 180px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .steptext{
    font-size: 12px;
  }
  .steptextgray{
    font-size: 12px;
  }
}
@media only screen and (max-width: 844px) {
  .stepshide{
    display: none;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/pages/page-blog.scss";

// .content.app-content {
//   padding: 0 !important;
// }
// .content {
//   padding: 0 !important;
// }

// .app-content .content {
//   padding: 0 !important;
//   margin: auto !important;
// }


@media only screen and (max-width: 575px) {
  .imgsize {
    background-image: none !important;
    background: none !important;
  }
  .navbar-container {
    background: none !important;
  }
  .navbar-container ul li .nav-link {
    // color: white !important;
  }
  // .navbar-container #wallet-icon , .dollar-sign , #cash-value {
  //   color: white !important;
  // }
  [dir=ltr] .navbar-light {
  background: transparent;
}

}
@media only screen and (max-width: 767px) {
  .imgsize {
    background-image: none !important;
    background: none !important;
  }
}
</style>