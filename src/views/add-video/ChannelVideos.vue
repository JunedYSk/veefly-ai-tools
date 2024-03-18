<template>
  <div class="imgsize" :style="image">
    <b-row class="text-center" align-v="center">  
      <transition name="slide-fade">
        <div class="w-100">
          <!-- Start Desktop Version -->
          <div style=" padding-top: 10vh;" v-if="device == 'desktop'" class="w-100">
            <div>
              <b-row class="px-1 blog-list-wrapperm w-100 mh-100 d-inline-block">
                <MainPromoteCard
                  :key="$route.path"
                  :channelId="channelID"
                  :channel="channel"
                  :channels="channels"
                  :manual-only="manualOnly"
                  class="my-1 d-inline-block"
                />
              </b-row>
            </div>
          </div>
          <!-- End Desktop Version -->

          <!-- Start Mobile Version -->
          <div v-else class="w-100">
            <div>
              <b-row class="blog-list-wrapper mh-100 d-flex justify-content-center">
                <MainPromoteCardMobile
                  :key="$route.path"
                  :channelId="channelID"
                  :channel="channel"
                  :channels="channels"
                  :manual-only="manualOnly"
                />
              </b-row>
            </div>
          </div>
          <!-- End Mobile Version -->
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
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import axios from "@axios";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useVideosList from "../../components/useVideosList";
import videoStoreModule from "../../components/videoStoreModule";
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
      statistics: null,
      manualOnly: false,
      channelID: null,
      channel: null,
      channels: [],
      channel_id: null,
      step2: require("@/assets/images/preview/wave.svg"),
      url: require("@/assets/images/preview/url.svg"),
      image: {
        backgroundImage: `url(${require("@/assets/images/preview/videobg.svg")})`,
        // backgroundColor: 'transparent',
        // boxShadow: 'none',
      },
      mobileImage:{
        backgroundImage:`url(${require("@/assets/images/freeviews/mobile-version-background-image.png")})`
      },
      mobileeclipse:{
        backgroundImage :`url(${require("@/assets/images/freeviews/group-circle.png")})`,
      },

      // validation rules
      required,
    };
  },
  computed: {
    device() {
      return store.getters['app/device']
    },
    selectedChannel() {
      return this.$store.state.user.selectedChannel ?? null
    },
  },
  watch: {
    'selectedChannel': function () {
      if (this.selectedChannel) {
        this.channelID = this.selectedChannel.channel_id
        this.channel = {
          snippet: {
            title: this.selectedChannel.channel_title,
            channelTitle: this.selectedChannel.channel_title,
            thumbnails: {
              medium: {
                url: this.selectedChannel.channel_thumbnail,
              }
            },
          }
        }

        // this.getChannelById(this.channelID)
      }
    },
    videoID() {
      this.getVideoStatus().then((data) => {
        if (data && !this.channel) {
          this.$router.push({
            name: "add-video",
            params: { id: this.videoID },
          });
        }
      });
    },
  },
  beforeMount() {
    let source = this.$route.query.source ?? null

    if (!source) {
      this.$router.push({
        name: "start",
        params: { errors: "Something went wrong" },
      })
    }

    if (source == 'single-video' || source == 'bulk-view-package') {
      this.manualOnly = true
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length !== 0) {
      localStorage.setItem("queryParams", JSON.stringify(this.$route.query));
    }

    if (this.selectedChannel) {
      this.channelID = this.selectedChannel.channel_id
      this.channel = {
        snippet: {
          title: this.selectedChannel.channel_title,
          channelTitle: this.selectedChannel.channel_title,
          thumbnails: {
            medium: {
              url: this.selectedChannel.channel_thumbnail,
            }
          },
        }
      }
    }
  },
  methods: {
    promotenow() {
      this.videoID = this.selectedVideoIds;
      // this.getVideoStatus().then((data) => {
      if (this.videoID) {
        this.$router.push({
          name: "channel-add-video",
          params: { id: this.videoID, channel: this.channel, statistics: this.statistics },
        });
      }
      // });
    },
    getChannelById(channelId) {
      axios
        .get("/video/getChannelById", { params: { channelId } })
        .then(res => {
          this.channels = []
          this.channel = res.data.data
          this.selectChannel(this.channel)
        })
        .catch(err => {
          //
        })
    },
    selectChannel(channel) {
      this.channel = channel;
      this.channelID = channel.id.channelId;

      this.params = { params: { id: this.channelID } }

      this.showPreviousButton = false;
      this.showNextButton = false;
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
    } = useVideosList();

    return {
      channelID,
      videoID,
      campaignUrl,
    };
  },
};
</script>
  
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.     */

[dir=ltr] .navbar-light {
  background: transparent !important;
}

[dir] .btn-secondary:hover:not(.disabled):not(:disabled){
  box-shadow: none;
  /* box-sha */
}
[dir] .form-control:focus:valid, [dir] .form-control:focus.is-valid{
  box-shadow: none;
}
.eclipse {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100px;
  padding-top: 30px;
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

.icon-position {
  font-size: 22px;
  position: absolute;
  left: -120px;
  top: 90px;
  color: #5a44dc;
}

.imgsize {
  background-repeat: no-repeat;
  background-position: center;
  height: auto;
  background-size: cover;
  /* margin: -8%; */
  min-height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(40px);
  opacity: 0;
}

.arrow-btn {
  background-color: rgba(255, 255, 255, 0) !important;
  border: none !important;
  border-collapse: collapse;
}

/* .app-content {
  padding: 0 !important;
} */

@media only screen and (max-width: 415px){
  .channelinput {
    margin: 0 !important;
  }

  .channelinputtext {
    margin-top: 40px;
    margin-left: 20px;
  }

  .blog-list-wrapper .highvideolist{
    border: none;
    box-shadow: none !important;
    background: none;
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

@media only screen and (min-width: 844px) {
  .VideoList-submit {
    flex-shrink: 0;
    margin-top: 0;
    min-width: 210px;
    width: auto;
    height: auto;
  }
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

/* .input-with-button:focus-within {
  box-shadow: 0 0 0 5px #dee1ff;
} */

.VideoList-button:focus {
  outline: none;
}

@media only screen and (max-width: 844px) {
  .hide {
    display: none;
  }
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
  /* .col-md-6 {
      max-width: 65%;
  } */
  .VideoList-button[data-v-6bd6a610] {
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
    /* background-color: #8e56e9; */
    /* background-image: linear-gradient(90deg,#a36bff 1%,#8732f4); */
    /* box-shadow: 0 4px 12px rgba(142,86,233,.4); */
    color: #fff;
    /* transition: box-shadow .2s ease-out,background-color .2s ease-out,color .2s ease-out; */
  }
}
@media only screen and (min-width: 973px) and (max-width: 1450px) {
  .icons {
    height: 135px;
    width: 274px;
    margin-left: -53px;
  }
  .icon-position {
    height: 50px;
    width: 136px;
    position: absolute;
    left: -72px;
    top: 77px;
  }
  .offset-md-3 {
    margin-left: 17%;
  }
  /* .col-md-6 {
      max-width: 65%;
  } */
}
@media only screen and (min-width: 1451px) and (max-width: 1600px) {
  .icons {
    height: 135px;
    width: 274px;
    margin-left: -42px;
  }
  .icon-position {
    height: 50px;
    width: 187px;
    position: absolute;
    left: -103px;
    top: 77px;
  }
  .offset-md-3 {
    margin-left: 17%;
  }
  /* .col-md-6 {
      max-width: 65%;
  } */
}

@media only screen and (max-width: 844px) {
  .hide {
    display: none;
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
  .col-md-6 {
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
  width: 170px;
  height: 200px;
  box-shadow: inset 0 -3px 7px rgba(155, 81, 224, 0.103) !important;
  -webkit-box-shadow: inset 0 0 6px rgba(155, 81, 224, 1) !important;
}

.box {
  transition: box-shadow 0.5s;
  width: 170px;
  height: 190px;
  border-radius: 30px;
  /*   float: left; */
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
  /* width: 375px; */
  height: auto;
  /* box-shadow: inset 0 -3px 7px rgba(0, 0, 0, 0.06) !important; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px !important; */
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
  /* float: left; */
}

.videolisttitle {
  color: #263238;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  /*   float: left; */
}
@media screen and (max-width: 400px) {
  .videolisttitle {
    margin: 0;
    margin-top: 3px;
    /* margin-bottom: -8px; */
    text-align: center;
  }
}

@media screen and (min-width: 426px) and (max-width: 575px) {
  .videolisttitle {
    margin: auto 8px;
  }
}

/* .box2 {
    transition: box-shadow .5s;
    border-radius:10px;
    float: left;
  }
  .box2:hover {
    box-shadow: 0 0 11px rgba(155, 81, 224, 0.384); 
  } */
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

.channelinput {
  /* margin-top: -197px; */
  margin-left: 40px;
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
  font-size: 16px;
  color: black;
}

.highvideolist {
  width: 70vw;
}

@media only screen and (max-width: 426px) {
  .highvideolist {
    width: 80vw;
  }
}
.filtervideolist {
  font-size: 24px;
  color: black;
}

.checkboxhead {
  font-size: 16px;
  font-weight: 500;
  color: black;
}

.selected-video {
  background-color: rgba(155, 81, 224, 1);
}
.card-body {
  padding: 0;
}

@media only screen and (max-width: 426px) {
  .inside-card {
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
  /*   float: left; */
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
  .steptext {
    font-size: 16px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 16px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 14px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 12px;
  }
  .steptextgray {
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
  .steptext {
    font-size: 12px;
  }
  .steptextgray {
    font-size: 12px;
  }
}
@media only screen and (max-width: 844px) {
  .stepshide {
    display: none;
  }
}
@media only screen and(max-width:575px){
  body p{
    line-height: 2.5px !important;
  }
}

@media only screen and(min-width:280px) and (max-width:653px){
  .eclipse b-img {
    width: 0 !important;
  }
  [dir] .pb-1, [dir] .py-1 {
    padding-bottom: 0 !important;
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
.navbar-container {
    padding: 0.8rem 1.4rem !important;
    background: transparent !important;
}

@media only screen and (max-width: 575px){
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

  // .navbar-container #wallet-icon , .dollar-sign , #cash-value{
  //   color: white !important;
  // }

  .vedioList-input-button {
    border-radius: 19px !important;
  }

  [dir=ltr] .navbar-light {
  background: transparent !important;
  }

  .b-avatar.badge-light-primary {
    color: #9B51E0;
  }

  .b-avatar-text {
    font-size: calc(16px);
    background-color: rgba(155,81,224,.12);
  }

}
@media only screen and (max-width: 767px) {
  .imgsize {
    background-image: none !important;
    background: none !important;
  }

  [dir] .b-avatar.badge-light-primary {
    // background-color: rgb(255 255 255 / 87%);
  }

  [dir=ltr] .navbar-light {
  background: transparent !important;
  }

  .input-with-button {
    display: flex;
    height: 61px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 3px 16px rgba(110, 125, 177, 0.28);
    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  }
}
 
@media only screen and (min-width: 768px) and (max-width: 1920px) {
  [dir=ltr] .navbar-light {
  background: transparent !important;
  }
}
@media only screen and (min-width: 576px) and (max-width: 767px) {
  .navbar-container #wallet-icon , .dollar-sign , #cash-value{
    color: white !important;
  }

  .navbar-container ul li .nav-link {
    // color: white !important;
  }
.header-navbar .navbar-container ul.navbar-nav li a.dropdown-user-link .user-name {
    // color: white !important;
    font-size: 16px;
  }
}

@media only screen and (max-width:576px) {
  .navbar-container {
    padding: 0.8rem 0.4rem !important;
  }
}

</style>