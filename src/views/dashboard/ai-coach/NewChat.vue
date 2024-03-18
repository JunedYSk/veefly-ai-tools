<template>
  <div class="scroll-idea">
    <div class="d-flex flex-wrap pt-1" v-if="!messages.length">
      <b-button
        variant="outline-secondary"
        size="sm"
        class="mr-1 mb-1 chat-prompts pr-1"
        v-for="prompt in prompts"
        :key="prompt"
        @click="sendMessage(prompt)"
      >
        <div class="image-div"><img src="@/assets/images/preview/ai-coach-idea-image.png" alt=""></div>
        {{ prompt }}
      </b-button>
    </div>

    <div v-else>
      <div v-for="message in messages" :key="message.id">
        <div
          class="user d-flex justify-content-start chat-prompts"
          v-if="message.role == 'user'"
        >
          <div class="rounded-circle overflow-hidden order-1 image-div">
            <img src="@/assets/images/preview/ai-coach-idea-image.png" v-if="selectedChannel" class="w-100">
          </div>
          <div
            class="text-dark mr-1 rounded order-2 message-content-text"
          >
            {{ message.content }}
          </div>
        </div>

        <div
          class="assistant w-100 my-1 mb-3"
          v-if="message.role == 'assistant'"
        >
          <div class="d-flex justify-content-start">
            <!-- <div class="rounded-circle border overflow-hidden" style="height: 100%; width: 35px;">
              <img :src="appLogoImage" class="w-100">
            </div> -->
            <pre
              class="text-dark p-1 rounded font-weight-normal"
              style="background-color: inherit; font-size: initial; white-space: pre-wrap; width: calc(100% - 50px); margin-bottom: 5px;"
              v-html="formatHTML(message.content)"
            />
          </div>

          <div class="text-right">
            <b-button
              variant="primary"
              class="rounded-circle p-0"
              style="height: 35px; width: 35px;"
              @click="copyToClipboard(message.content)"
            >
              <feather-icon icon="CopyIcon" size="19" />
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="assistant w-75 my-1 mb-3"
      v-if="receivingMessages"
    >
      <div class="d-flex justify-content-start">
        <!-- <div class="rounded-circle border overflow-hidden" style="height: 100%; width: 35px;">
          <img :src="appLogoImage" class="w-100">
        </div> -->
        <div
          class="text-light p-1 rounded"
          style="background-color: inherit; font-size: initial; white-space: pre-wrap; width: calc(100% - 50px); margin-bottom: 5px;"
        >
          {{ receivedMessage }}
          <b-spinner v-if="receivedMessage" type="grow" label="Loading..." variant="light" small />
          <b-spinner v-else type="grow" label="Loading..." variant="dark" />
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
  data() {
    return {
      prompts: [
        'Based on my channel, what video ideas do you have for me?',
        'How do I get more views?',
        'Can you audit my channel?',
        'How do my video titles compare in terms of performance?',
        'How can I increase my channel’s subscriber count?',
        'What types of videos do my subscribers like the most?',
        'How can I improve my audience retention rate?',
        'What can I do to encourage more comments and likes on my videos?',
        'How can I better interact with my audience and foster a community?',
      ],
    }
  },
  directives: {
    Ripple,
  },
  computed: {
    selectedChannel() {
      return this.$store.state.user.selectedChannel
    },
  },
  props: ["sendMessage", "messages", "receivingMessages", "receivedMessage"],
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
.chat-prompts{
  padding: 0.4rem;
  border-radius: 20px;
  background: rgba(152, 152, 152, 0.2);
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content; 
}
.image-div{
  margin: 0 0.5rem 0.4rem ;
}
.message-content-text{
  font-size: 1rem;
}
.scroll-idea{
  max-height: 40vh; 
  overflow: auto;
}
/* width */
.scroll-idea::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.scroll-idea::-webkit-scrollbar-track {
  background: #ffffff;
}

/* Handle */
.scroll-idea::-webkit-scrollbar-thumb {
  background: #888;
  height: 20px;
}

/* Handle on hover */
.scroll-idea::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
