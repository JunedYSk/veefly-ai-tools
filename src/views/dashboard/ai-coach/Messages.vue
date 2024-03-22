<template>
  <div class="scroll-idea pl-1" ref="message-list">
    <div v-if="loadingMessages" class="text-center position-absolute w-100 mb-5 bottom-0">
      <b-spinner label="Loading..." variant="primary" />
    </div>
    <div  v-else v-for="message in messages" :key="message.id">
      <div
        class="user d-flex justify-content-end w-100 my-1"
        v-if="message.role == 'user'"
      >
        <div class="bg-secondary rounded-circle overflow-hidden order-2 logo-thumbnail-image ml-1">
          <img :src="selectedChannel.channel_thumbnail" v-if="selectedChannel" class="w-100">
        </div>
        <div
          class="bg-secondary text-light p-1 rounded order-1 question-text"
        >
          {{ message.content }}
        </div>
      </div>

      <div
        class="assistant w-75 my-1 mb-3"
        v-if="message.role == 'assistant'"
      >
        <div class="d-flex justify-content-start">
          <div class=" overflow-hidden logo-thumbnail-image mr-1">
            <img :src="appLogoImage" class="w-100">
          </div>
          <pre
            class="bg-primary text-light p-1 rounded response-text"
            v-html="formatHTML(message.content)"
          />
        </div>

        <div class="text-right">
          <b-button
            variant="secondary"
            class="rounded-circle p-0 copy-icon"
            @click="copyToClipboard(message.content)"
          >
            <feather-icon icon="CopyIcon" size="19" />
          </b-button>
        </div>
      </div>
    </div>

    <div
      class="assistant w-75 my-1 mb-3"
      v-if="questionedTabIndex == 2 && $route.params.id && receivingMessages"
    >
      <div class="d-flex justify-content-start">
        <div class="rounded-circle border overflow-hidden logo-thumbnail-image">
          <img :src="appLogoImage" class="w-100">
        </div>
        <div
          class="bg-primary text-light ml-1 p-1 rounded response-text"
        >
          {{ receivedMessage }}
          <b-spinner v-if="receivedMessage" type="grow" label="Loading..." variant="light" small />
          <b-spinner v-else type="grow" label="Loading..." variant="light" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BSpinner,
  BButton,
} from "bootstrap-vue"
import Ripple from "vue-ripple-directive"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BSpinner,
    BButton,
  },
  directives: {
    Ripple,
  },
  computed: {
    selectedChannel() {
      return this.$store.state.user.selectedChannel
    },
  },
  props: ["loadingMessages", "messages", "receivingMessages", "receivedMessage", "message", "questionedTabIndex"],
  methods: {
    formatHTML(content) {
      if (!content) { return }
      return content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
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
  setup() {
    const { appLogoImage } = $themeConfig.app
    return {
      appLogoImage,
    }
  },
}
</script>

<style scoped>
.scroll-idea{
  max-height: 40vh; 
  overflow: auto;
}
.scroll-idea::-webkit-scrollbar {
  width: 3px;
}
.scroll-idea::-webkit-scrollbar-thumb {
  background-color: rgba(169, 169, 169, 0.514);
}
.logo-thumbnail-image{
  height: 100%; 
  width: 27px;
}
.response-text{
  background-color: inherit; 
  font-size: 1.1rem; 
  white-space: pre-wrap; 
  width: calc(100% - 50px); 
  margin-bottom: 5px;
  font-weight: 400;

}
.question-text{
  max-width: calc(100% - 150px); 
  font-size: 1.1rem;
  font-weight: 400;
}
.copy-icon{
  height: 35px; 
  width: 35px;
}
</style>
