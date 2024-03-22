<template>
  <div>
    <!-- for Desktop Start -->
    <div v-if="device == 'desktop'">
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-center position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >  
        <img src="@/assets/images/preview/ai-bg.png" alt="" class="background-image-css">
        <div class="mb-2"><img src="@/assets/images/preview/group-1000002280.png" alt=""></div>
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-2 text-center ai-text">AI Content Generator<br> for YouTube</h1>
          <p class="mt-2 purple-text">Video creation process has never been easier! </p>
        </div>
        <div class="mt-3 search-bar">
          <validation-observer ref="campaignForm" #default="{ invalid }">
            <b-form @submit.prevent="submitIdea">
              <div class="input-with-button position-relative">
                <validation-provider
                  #default="{ errors }"
                  name="url"
                  vid="videoIdea"
                  rules="required"
                  style="width: calc(100% - 78px);"
                >
                  <div class="d-flex">
                    <b-form-input
                      class="vedioList-input-button"
                      ref="videoIdea"
                      v-model="videoIdea"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Create a video about..."
                    />
                  </div>
                  <div class="mt-1">
                    <small v-if="errors.length > 0" class="text-danger">
                      Please enter your YouTube Video Idea
                    </small>
                  </div>
                </validation-provider>
                <b-button
                  class="arrow-btn"
                  type="submit"
                  :disabled="invalid || loading" 
                >
                  <b-spinner variant="dark" v-if="loading"/>
                  <span v-else>
                    <feather-icon class="text-dark" size="30" icon="ArrowRightIcon" />
                  </span>
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
      </div>

      <!-- Secondary UI -->
      <div class="pb-3" v-if="showSecondaryUI">
        <img src="@/assets/images/preview/secondary-ui-bg.png" alt="" class="secondary-ui-bg">
        <h1 class="secondary-ui-text">AI Content Generator</h1>

        <div class="d-flex align-items-start mt-2 mb-3">
          <p class="my-auto mr-1 secondary-ui-ideas-text">
            <strong>Video Idea:</strong>
            {{ videoIdea }}
          </p>
          <b-button
            variant="primary"
            size="md"
            @click="reset"
          >
            Reset
          </b-button>
        </div>

        <div class="row mt-1">
          <b-col lg="8">
            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Title</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(title)"
                    v-if="title"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingTitle">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="titleError" class="error">{{ titleError }}</span>
                <span v-else>{{ title }}</span>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Description</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(description)"
                    v-if="description"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingDescription">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="descriptionError" class="error">{{ descriptionError }}</span>
                <pre class="description" v-else>{{ description }}</pre>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Keywords</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(keywords)"
                    v-if="keywords"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingKeywords">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="keywordsError" class="error">{{ keywordsError }}</span>
                <span v-else>{{ keywords }}</span>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
              v-if="false"
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Thumbnails</h5>
                <div>
                  <!--  -->
                </div>
              </div>
              <p class="content-body mb-0">
                <span v-if="loadingThumbnails">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="thumbnailsError" class="error">{{ thumbnailsError }}</span>
                <span v-else>
                  <div class="thumbnails">
                    <div class="thumbnail" v-for="thumbnail in thumbnails" :key="thumbnail">
                      <img class="thumbnail-img" :src="thumbnail">
                    </div>
                  </div>
                </span>
              </p>
            </b-card>
          </b-col>

          <b-col lg="4">
            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Video Script</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(script)"
                    v-if="script"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 overflow-auto ai-generated-text" style="height: 55vh;">
                <span v-if="loadingScript">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="scriptError" class="error">{{ scriptError }}</span>
                <pre class="script" v-else>{{ script }}</pre>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Voiceover</h5>
              </div>
              <p class="content-body mb-0">
                <span v-if="loadingVoiceover">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="voiceoverError" class="error">{{ voiceoverError }}</span>
                <span v-else>
                  <audio controls class="w-100">
                    <source :src="voiceover" type="audio/mpeg">
                    Your browser does not support audio.
                  </audio>
                </span>
              </p>
            </b-card>
          </b-col>
        </div>
      </div>
    </div>
    <!-- for Desktop Start -->
    <!-- for Mobile Start -->
    <div v-else>
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-start position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >
        <img src="@/assets/images/preview/mobile-ai-bg.png" alt="" class="mobile-ai-bg">
        <div class="mb-2" style="margin-top:8rem;"><img src="@/assets/images/preview/mobile-icon.png" alt=""></div>
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-1 text-center mx-1 ai-text">AI Content Generator<br> for YouTube</h1>
          <p class="mt-1 text-center mx-1 mob-purple-text">Video creation process has never been easier! </p>
        </div>

        <div class="mt-2 w-100 px-1">
          <validation-observer ref="campaignForm" #default="{ invalid }">
            <b-form @submit.prevent="submitIdea">
              <div class="input-with-button position-relative">
                <validation-provider
                  #default="{ errors }"
                  name="url"
                  vid="videoIdea"
                  rules="required"
                  style="width: calc(100% - 67px);"
                >
                  <div class="d-flex">
                    <b-form-input
                      class="vedioList-input-button"
                      ref="videoIdea"
                      v-model="videoIdea"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Create a video about..."
                    />
                  </div>
                  <div class="mt-1 text-center">
                    <small v-if="errors.length > 0" class="text-danger">
                      Please enter your YouTube Video Idea
                    </small>
                  </div>
                </validation-provider>
                <b-button
                  class="arrow-btn"
                  type="submit"
                  :disabled="invalid || loading" 
                >
                  <b-spinner variant="dark" v-if="loading"/>
                  <span v-else>
                    <feather-icon class="text-dark" size="25" icon="ArrowRightIcon" />
                  </span>
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
      </div>

      <!-- Secondary UI -->
      <div class="pb-3" v-if="showSecondaryUI">
        <h1 class="ml-2 mt-2 mob-secondary-ui-text">AI Content Generator</h1>
        <div class="d-flex flex-column align-items-start mt-2 mb-3">
          <p class="my-auto mr-1 ml-2 mob-secondary-ui-ideas-text">
            <strong>Video Idea:</strong>
            {{ videoIdea }}
          </p>
          <b-button
            variant="primary"
            size="md"
            @click="reset"
            class="ml-2 mt-1"
          >
            Reset
          </b-button>
        </div>

        <div class="row mt-1">
          <b-col lg="8">
            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Title</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(title)"
                    v-if="title"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingTitle">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="titleError" class="error">{{ titleError }}</span>
                <span v-else>{{ title }}</span>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Description</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(description)"
                    v-if="description"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingDescription">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="descriptionError" class="error">{{ descriptionError }}</span>
                <pre class="description" v-else>{{ description }}</pre>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Keywords</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(keywords)"
                    v-if="keywords"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 ai-generated-text">
                <span v-if="loadingKeywords">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="keywordsError" class="error">{{ keywordsError }}</span>
                <span v-else>{{ keywords }}</span>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
              v-if="false"
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Thumbnails</h5>
                <div>
                  <!--  -->
                </div>
              </div>
              <p class="content-body mb-0">
                <span v-if="loadingThumbnails">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="thumbnailsError" class="error">{{ thumbnailsError }}</span>
                <span v-else>
                  <div class="thumbnails">
                    <div class="thumbnail" v-for="thumbnail in thumbnails" :key="thumbnail">
                      <img class="thumbnail-img" :src="thumbnail">
                    </div>
                  </div>
                </span>
              </p>
            </b-card>
          </b-col>

          <b-col lg="4">
            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Video Script</h5>
                <div>
                  <div
                    role="button"
                    @click="copyToClipboard(script)"
                    v-if="script"
                  >
                    <feather-icon class="copy-icon" icon="CopyIcon" />
                  </div>
                </div>
              </div>
              <p class="content-body mb-0 overflow-auto ai-generated-text" style="height: 55vh;">
                <span v-if="loadingScript">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="scriptError" class="error">{{ scriptError }}</span>
                <pre class="script" v-else>{{ script }}</pre>
              </p>
            </b-card>

            <b-card
              class="p-1 pb-2 card-css"
              no-body
            >
              <div class="d-flex align-items-start justify-content-between">
                <h5 class="content-title">Voiceover</h5>
              </div>
              <p class="content-body mb-0">
                <span v-if="loadingVoiceover">
                  <b-spinner label="Loading..." variant="primary" />
                </span>
                <span v-else-if="voiceoverError" class="error">{{ voiceoverError }}</span>
                <span v-else>
                  <audio controls class="w-100">
                    <source :src="voiceover" type="audio/mpeg">
                    Your browser does not support audio.
                  </audio>
                </span>
              </p>
            </b-card>
          </b-col>
        </div>
      </div>
    </div>
    <!-- for Mobile End -->
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BImg,
  BForm,
  BFormInput,
  BButton,
  BSpinner,
} from "bootstrap-vue"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import Ripple from "vue-ripple-directive"
import axios from "@axios"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import { required, numeric, length } from "@validations"
import store from "@/store";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BForm,
    BFormInput,
    BButton,
    BSpinner,

    ValidationProvider,
    ValidationObserver,
    required,
  },
  data() {
    return {
      user: null,
      loading: false,
      response: null,
      videoIdea: null,
      showSecondaryUI: false,

      title_prompt: null,
      loadingTitle: false,
      titleError: null,
      title: null,

      description_prompt: null,
      loadingDescription: false,
      descriptionError: null,
      description: null,

      keywords_prompt: null,
      loadingKeywords: false,
      keywordsError: null,
      keywords: null,

      loadingThumbnails: false,
      thumbnailsError: null,
      thumbnails: [],

      script_prompt: null,
      loadingScript: false,
      scriptError: null,
      script: null,

      loadingVoiceover: false,
      voiceoverError: null,
      voiceover: null,

      abortController: null,
      requestCanceller: null,
    }
  },
  computed:{
    device(){
      return store.getters['app/device']
    }  
  },
  directives: {
    Ripple,
  },
  beforeMount() {
    setTimeout(() => this.getUser(), 2000)
  },
  mounted() {
    this.$refs.videoIdea.focus()

    // this.videoIdea = 'Valorant'
    // this.submitIdea()
  },
  methods: {
    submitIdea() {
      this.showSecondaryUI = true

      this.loadingTitle = true
      this.loadingDescription = true
      this.loadingKeywords = true
      this.loadingThumbnails = true
      this.loadingScript = true
      this.loadingVoiceover = true

      this.getData()
    },
    reset() {
      this.videoIdea = null
      this.showSecondaryUI = false

      this.loadingTitle = false
      this.loadingDescription = false
      this.loadingKeywords = false
      this.loadingThumbnails = false
      this.loadingScript = false
      this.loadingVoiceover = false

      this.titleError = null
      this.descriptionError = null
      this.keywordsError = null
      this.thumbnailsError = null
      this.scriptError = null
      this.voiceoverError = null

      setTimeout(() => {
        this.$refs.videoIdea.focus()
      }, 50)

      this.abortController.abort()
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"))
    },
    getData() {
      this.abortController = new AbortController()
      this.requestCanceller = { signal: this.abortController.signal }

      axios
        .post("yt-meta-generator",
          { idea: this.videoIdea },
          this.requestCanceller
        )
        .then(res => {
          this.loading = false
          this.title_prompt = res.data.title_prompt ?? null
          this.description_prompt = res.data.description_prompt ?? null
          this.keywords_prompt = res.data.keywords_prompt ?? null
          this.script_prompt = res.data.script_prompt ?? null

          this.getTitle()
          this.getDescription()
          this.getKeywords()
          this.getScript()
          // this.getThumbnails()
        })
        .catch(err => {
          this.loading = false

          this.titleError = 'Error generating title'
          this.descriptionError = 'Error generating description'
          this.keywordsError = 'Error generating keywords'
          this.thumbnailsError = 'Error generating thumbnails'
          this.scriptError = 'Error generating script'
          this.voiceoverError = 'Error generating voiceover'
        })
    },
    getTitle() {
      axios
        .post("ai-generator/title",
          { prompt: this.title_prompt },
          this.requestCanceller
        )
        .then(res => {
          this.loadingTitle = false
          this.title = res.data
        })
        .catch(err => {
          this.loadingTitle = false
          this.titleError = 'Error generating title'
        })
    },
    getDescription() {
      axios
        .post("ai-generator/description",
          { prompt: this.description_prompt },
          this.requestCanceller
        )
        .then(res => {
          this.loadingDescription = false
          this.description = res.data
        })
        .catch(err => {
          this.loadingDescription = false
          this.descriptionError = 'Error generating description'
        })
    },
    getKeywords() {
      axios
        .post("ai-generator/keywords",
          { prompt: this.keywords_prompt },
          this.requestCanceller
        )
        .then(res => {
          this.loadingKeywords = false
          this.keywords = res.data
        })
        .catch(err => {
          this.loadingKeywords = false
          this.keywordsError = 'Error generating keywords'
        })
    },
    getThumbnails() {
      axios
        .post("ai-generator/thumbnails",
          { prompt: this.videoIdea },
          this.requestCanceller
        )
        .then(res => {
          this.loadingThumbnails = false
          this.thumbnails = res.data
        })
        .catch(err => {
          this.loadingThumbnails = false
          this.thumbnailsError = 'Error generating thumbnails'
        })
    },
    getScript() {
      axios
        .post("ai-generator/script",
          { prompt: this.script_prompt },
          this.requestCanceller
        )
        .then(res => {
          this.loadingScript = false
          this.script = res.data

          this.getVoiceover()
        })
        .catch(err => {
          this.loadingScript = false
          this.scriptError = 'Error generating script'
          this.voiceoverError = 'Error generating voiceover'
        })
    },
    getVoiceover() {
      axios
        .post("ai-generator/voiceover",
          { script: this.script },
          this.requestCanceller
        )
        .then(res => {
          this.loadingVoiceover = false
          this.voiceover = res.data
        })
        .catch(err => {
          this.loadingVoiceover = false
          this.voiceoverError = 'Error generating voiceover'
        })
    },
    copyToClipboard(data) {
      navigator.clipboard.writeText(data).then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Copied to Clipboard",
            icon: "CopyIcon",
            variant: "success",
          }, 
        })
      })
    },
  },
}
</script>

<style scoped>
.background-image-css{
  position: absolute;
  height:100%;
  right:0;
  margin-right:-2rem;
}
.purple-text{
  font-size: 1.5rem;
  color: rgba(155, 81, 224, 1);
  font-weight:500;
}
.secondary-ui-bg{
  position: absolute;
  right:0;
  top:0;
  width: 351px;
  margin-top: 69px;
}
.secondary-ui-text{
  font-size:20px;
  color: rgba(155, 81, 224, 1);
  font-weight:700;
}
.secondary-ui-ideas-text{
  font-size:30px;
  font-weight:700;
  color: rgba(51, 51, 51, 1);
  line-height:30px;
}
.ai-generated-text{
  font-weight: 500;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
}
.mobile-ai-bg{
  position: absolute;
  bottom:0;
  width:275px
}
.mob-purple-text{
  font-size: 14px;
  color: rgba(155, 81, 224, 1);
  font-weight:500;
}
.mob-secondary-ui-ideas-text{
  font-size:30px;
  font-weight:700;
  color: rgba(51, 51, 51, 1);
  line-height:35px;
}
.mob-secondary-ui-text{
  font-size:20px;
  color: rgba(155, 81, 224, 1);
  font-weight:700;
}
/* Primary UI */
.input-with-button {
  display: flex;
  padding: 4px;
  height: 68px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 3px 17px 0px rgba(155, 81, 224, 0.308);
  transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
}
.vedioList-input-button {
  padding: 17px 40px 17px 45px;
}
.vedioList-input-button {
  font-size: 16px;
  line-height: 100%;
  padding: 17px 40px 17px 15px;
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
.arrow-btn {
  background-color: rgba(255, 255, 255, 0) !important;
  border: none !important;
  border-collapse: collapse;
  position: absolute;
  top: 9%;
  right: 7px;
 }
.ai-text{
  font-size:49px;
  color: rgba(51, 51, 51, 1);
  font-weight:900;
}
@media only screen and (min-width: 992px) {
  .search-bar{
    width: 60%;
  }

}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .search-bar{
    width: 90%;
  }

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
    right: 0px;
    top:11%;
  }
  .vedioList-input-button {
    padding: 13px 40px 13px 20px;
    border-radius: 12px;
  }
  .ai-text{
    font-size:26px;
  }
}
@media only screen and (max-width: 308px) {
  .ai-text{
    font-size:23px;
  }
  
}

/* Secondary UI */
.card-css{
  border-radius: 20px;
  box-shadow: 0px 0px 22px 0px rgba(155, 81, 224, 0.5);
}
.content-title {
  color: rgba(155, 81, 224, 1);
  font-weight: 700;
  font-size: 1.25rem;
}
.copy-icon{
  color: rgba(155, 81, 224, 1);
  font-weight: 700;
}
.content-body {
  font-size: 1.05rem;
  margin-top: .3rem;
}

.error {
  color: red;
}

.description, .script {
  background-color: inherit;
  white-space: pre-wrap;
  font-size: 1rem;
}

.thumbnails {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  overflow: auto;
  padding-bottom: 1rem;
}

.thumbnails .thumbnail {
  border-radius: 5px;
  overflow: hidden;
  flex-basis: 215px;
  flex-shrink: 0;
}

.thumbnails .thumbnail .thumbnail-img {
  width: 100%;
  border-radius: 12px;
}

</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
