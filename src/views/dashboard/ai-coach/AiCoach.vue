<template>
  <div>
    <!-- for desktop Start -->
    <div class="d-none d-md-block">
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-center position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-2 text-center ai-text">Welcome to AI Coach</h1>
          <p class="mt-2 setup-text" v-if="loading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            Loading...
          </p>
          <p class="mt-2 setup-text" v-if="setupLoading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            {{ setupText }}
          </p>
        </div>
      </div>

      <!-- Secondary UI -->
      <div class="ai-coach" v-if="showSecondaryUI">
        <b-modal 
          id="modal-center" 
          centered hide-footer 
          cancel-title 
          header-bg-variant="transparent" 
          no-close-on-esc
          v-model="visible"
          >
          <div class="d-flex flex-column align-items-center pb-3">
            <div><img src="@/assets/images/preview/daily-ideas-design-image.png" alt=""></div>
            <p class="text-center premium-heading-text mt-2">You‘ve reached your limit of <br class="breaking-point"> free AI content plan</p>
            <p class="text-center premium-heading-para">Generate Unlimited AI content with Premium</p>
            <div class="mt-1">
              <b-button
                variant="primary"
                class="veefly-premium-btn"
              >
                Get Veefly Premium
              </b-button>
            </div>
          </div>
        </b-modal>
        <img class="bg-image" src="@/assets/images/preview/ai-bg.png" alt="">
        <div class="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
          <div class="mb-2"><img src="@/assets/images/preview/ai-coach-image.png" alt=""></div>
          <h1 class="display-4 mb-5 text-center ai-text">AI Coach for your channel</h1>
        </div>
        <div class="main-div mb-3">
          <b-tabs content-class="mt-2 w-100" class="w-100 font-weight-bolder h4 mb-0">
            <b-tab title="Disabled" disabled>
              <template #title>
                <img
                  :src="selectedChannel.channel_thumbnail"
                  :alt="selectedChannel.channel_title"
                  class="rounded-circle"
                  style="width: 38px; height: 38px;margin-top: -8px;"
                  fluid
                />
              </template>
            </b-tab>
            <b-tab class="pt-2 top-idea-tab" title="AI Coach" active>
              <div class="d-flex align-items-center">
                <p class="font-weight-bolder mb-2 mr-2">Try asking about</p>
                <b-button
                  variant="outline-primary"
                  class="rounded w-25 mb-2"
                  @click="showNewChatUI=true; messages=[]"
                  :to="{ name: 'ai-coach' }"
                  block
                >
                  <feather-icon icon="PlusIcon" />
                  New Chat
                </b-button>
              </div>
              <new-chat
                v-if="showNewChatUI"
                :send-message="sendMessage"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
              />
            </b-tab>
            <b-tab class="pt-2 top-idea-tab" title="Chat History">
              <div class="row">
                <div class="col-md-6">
                  <conversations
                    :loading-conversations="loadingConversations"
                    :conversations="conversations"
                  />
                </div>
                <div class="col-md-6 px-0">
                  <messages
                    :loading-messages="loadingMessages"
                    :messages="messages"
                    :receiving-messages="receivingMessages"
                    :received-message="receivedMessage"
                    ref="messages"
                  />
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
        <div class="w-100 d-flex flex-column align-items-center">
          <div class="note-div mb-1 d-flex justify-content-center align-items-center">
            <feather-icon icon="ClockIcon" size="18" class="text-primary "/>
            <p class="ml-1 mb-0 text-primary">There is a 72H delay in fetching Youtube data.</p>
          </div>
          <message-form
            :receiving-messages="receivingMessages"
            :send-message="sendMessage"
            ref="message-form"
          />
          <p class="text-primary text-center mb-4">Please be aware that this is an alpha version of the AI, and as such it may not always behave as expected. Use it at your own risk.</p>
        </div>
        <!-- <b-card class="">
          <b-card-body class="d-flex justify-content-between p-0" style="min-height: 80vh;">
            <div class="bg-light w-25 p-1 rounded-sm">
              <b-button
                variant="outline-primary"
                class="rounded"
                @click="showNewChatUI=true; messages=[]"
                :to="{ name: 'ai-coach' }"
                block
              >
                <feather-icon icon="PlusIcon" />
                New Chat
              </b-button>

              <h4 class="d-flex align-items-center my-2">
                <feather-icon icon="ClockIcon" size="19" />
                <span style="padding-left: 7px;">Chat History</span>
              </h4>

              <conversations
                :loading-conversations="loadingConversations"
                :conversations="conversations"
              />
            </div>

            <div class="position-relative w-75">
              <new-chat
                v-if="showNewChatUI"
                :send-message="sendMessage"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
              />

              <messages
                v-else
                :loading-messages="loadingMessages"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
                ref="messages"
              />

              <message-form
                :receiving-messages="receivingMessages"
                :send-message="sendMessage"
                ref="message-form"
              />
            </div>
          </b-card-body>
        </b-card> -->
      </div>
    </div>
    <!-- for desktop End -->
    <!-- for Mobile Start -->
    <div class="d-md-none">
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-center position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-2 text-center ai-text">Welcome to AI Coach</h1>
          <p class="mt-2 setup-text" v-if="loading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            Loading...
          </p>
          <p class="mt-2 setup-text" v-if="setupLoading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            {{ setupText }}
          </p>
        </div>
      </div>

      <!-- Secondary UI -->
      <div class="ai-coach" v-if="showSecondaryUI">
        <b-modal 
          id="modal-center" 
          centered hide-footer 
          cancel-title 
          header-bg-variant="transparent" 
          no-close-on-esc
          v-model="visible"
          >
          <div class="d-flex flex-column align-items-center pb-3">
            <div><img src="@/assets/images/preview/daily-ideas-design-image.png" alt=""></div>
            <p class="text-center premium-heading-text mt-2">You‘ve reached your limit of <br class="breaking-point"> free AI content plan</p>
            <p class="text-center premium-heading-para">Generate Unlimited AI content with Premium</p>
            <div class="mt-1">
              <b-button
                variant="primary"
                class="veefly-premium-btn"
              >
                Get Veefly Premium
              </b-button>
            </div>
          </div>
        </b-modal>
        <img class="bg-image" src="@/assets/images/preview/ai-bg.png" alt="">
        <div class="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
          <div class="mb-2"><img src="@/assets/images/preview/ai-coach-image.png" alt=""></div>
          <h1 class="display-4 mb-5 text-center ai-text">AI Coach for your channel</h1>
        </div>
        <div class="main-div mb-3">
          <b-tabs content-class="mt-2 w-100" class="w-100 font-weight-bolder h4 mb-0">
            <b-tab title="Disabled" disabled>
              <template #title>
                <img
                  :src="selectedChannel.channel_thumbnail"
                  :alt="selectedChannel.channel_title"
                  class="rounded-circle"
                  style="width: 38px; height: 38px;margin-top: -8px;"
                  fluid
                />
              </template>
            </b-tab>
            <b-tab class="pt-2 top-idea-tab" title="AI Coach" active>
              <div class="d-flex align-items-center">
                <p class="font-weight-bolder mb-2 mr-2">Try asking about</p>
                <b-button
                  variant="outline-primary"
                  class="rounded w-75 mb-2"
                  @click="showNewChatUI=true; messages=[]"
                  :to="{ name: 'ai-coach' }"
                  block
                >
                  <feather-icon icon="PlusIcon" />
                  New Chat
                </b-button>
              </div>
              <new-chat
                v-if="showNewChatUI"
                :send-message="sendMessage"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
              />
            </b-tab>
            <b-tab class="pt-2 top-idea-tab" title="Chat History">
              <conversations
                :loading-conversations="loadingConversations"
                :conversations="conversations"
              />
              <!-- <messages
            
                :loading-messages="loadingMessages"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
                ref="messages"
              /> -->
            </b-tab>
          </b-tabs>
        </div>
        <div class="w-100 d-flex flex-column align-items-center px-1">
          <div class="note-div mb-1 d-flex justify-content-center align-items-center">
            <feather-icon icon="ClockIcon" size="18" class="text-primary "/>
            <p class="ml-1 mb-0 text-primary">There is a 72H delay in fetching Youtube data.</p>
          </div>
          <message-form
            :receiving-messages="receivingMessages"
            :send-message="sendMessage"
            ref="message-form"
          />
          <p class="text-primary text-center mb-4">Please be aware that this is an alpha version of the AI, and as such it may not always behave as expected. Use it at your own risk.</p>
        </div>
        <!-- <b-card class="">
          <b-card-body class="d-flex justify-content-between p-0" style="min-height: 80vh;">
            <div class="bg-light w-25 p-1 rounded-sm">
              <b-button
                variant="outline-primary"
                class="rounded"
                @click="showNewChatUI=true; messages=[]"
                :to="{ name: 'ai-coach' }"
                block
              >
                <feather-icon icon="PlusIcon" />
                New Chat
              </b-button>

              <h4 class="d-flex align-items-center my-2">
                <feather-icon icon="ClockIcon" size="19" />
                <span style="padding-left: 7px;">Chat History</span>
              </h4>

              <conversations
                :loading-conversations="loadingConversations"
                :conversations="conversations"
              />
            </div>

            <div class="position-relative w-75">
              <new-chat
                v-if="showNewChatUI"
                :send-message="sendMessage"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
              />

              <messages
                v-else
                :loading-messages="loadingMessages"
                :messages="messages"
                :receiving-messages="receivingMessages"
                :received-message="receivedMessage"
                ref="messages"
              />

              <message-form
                :receiving-messages="receivingMessages"
                :send-message="sendMessage"
                ref="message-form"
              />
            </div>
          </b-card-body>
        </b-card> -->
      </div>
    </div>
    <!-- for Mobile End -->
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BButton,
  BSpinner,
  BTabs,
  BTab,
  BModal,
} from "bootstrap-vue"
import Ripple from "vue-ripple-directive"
import axios from "@axios"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import store from "@/store";
import { uuid } from 'vue-uuid'
import Conversations from './Conversations.vue'
import MessageForm from './MessageForm.vue'
import Messages from './Messages.vue'
import NewChat from './NewChat.vue'

export default {
  components: {
    BCard,
    BCardBody,
    BButton,
    BSpinner,

    Conversations,
    MessageForm,
    Messages,
    NewChat,
    BTabs,
    BTab,
    BModal,
  },
  data() {
    return {
      visible: false,
      loading: true,
      setupLoading: false,
      setupText: null,

      channelId: null,
      hasSetup: false,

      showSecondaryUI: false,
      showNewChatUI: false,

      loadingConversations: false,
      conversationsError: false,
      conversations: [],

      conv_id: null,

      loadingMessages: false,
      messageError: false,
      messages: [],

      receivingMessages: false,
      receivedMessage: null,

      messageSent: false,
      messageSentInterval: null,
      thread_id: null,
      message_id: null,
      run_id: null,
      conversation_id: null,
      status: null,

      abortController: null,
      requestCanceller: null,
    }
  },
  computed: {
    device() {
      return store.getters['app/device']
    },
    selectedChannel() {
      return this.$store.state.user.selectedChannel
    },
  },
  directives: {
    Ripple,
  },
  watch: {
    'selectedChannel': function () {
      if (this.selectedChannel) {
        this.channelId = this.selectedChannel.channel_id

        this.checkAssistantExists()

        this.getConversations()

        if (this.$route.params.id) {
          this.getMessages()
        } else {
          this.showNewChatUI = true
          this.messages = []
        }
      }
    },
    'showSecondaryUI': function () {
      if (this.showSecondaryUI) {
        this.$root.$emit('focus-message-input')
      }
    },
    '$route.params.id': function () {
      if (this.$route.params.id) {
        this.getMessages()
      } else {
        this.showNewChatUI = true
        this.messages = []
      }
    },
    'messageSent': function () {
      if (this.messageSent) {
        this.messageSentInterval = setInterval(() => {
          this.getMessageStatus()
        }, 3500)
      }
    },
  },
  mounted() {
    this.showSecondaryUI = false

    this.channelId = this.selectedChannel?.channel_id ?? null

    if (this.channelId) {
      this.checkAssistantExists()

      this.getConversations()

      if (this.$route.params.id) {
        this.getMessages()
      } else {
        this.showNewChatUI = true
        this.messages = []
      }
    }

    let el = this
    this.$root.$on('removeConversation', function ({ conversationId, conversationGroup }) {
      el.removeConversation(conversationId, conversationGroup)
    })
  },
  methods: {
    checkAssistantExists() {
      this.loading = true
      this.setupLoading = false

      axios
        .post("ideation/check", { channelId: this.channelId })
        .then(res => {
          this.hasSetup = res.data.has_setup
          this.loading = false

          if (!this.hasSetup) { this.setupAssistant() }
          else { this.showSecondaryUI = true }
        })
    },
    setupAssistant() {
      this.showSecondaryUI = false
      this.setupLoading = true
      this.setupText = 'Since, this is your first time. It will take few seconds.'

      setTimeout(() => {
        this.setupText = 'Creating a personalized experience for you.'
      }, 3500)

      axios
        .post("ideation/setup", { channelId: this.channelId })
        .then(res => {
          this.hasSetup = res.data.has_setup
          this.setupLoading = false
          this.showSecondaryUI = true
        })
    },
    getConversations() {
      this.loadingConversations = true
      this.conversationsError = false

      axios
        .post("ai-coach/conversations", { channelId: this.channelId })
        .then(res => {
          this.conversations = res.data.data
          this.loadingConversations = false
        })
        .catch(error => {
          this.loadingConversations = false
          this.conversationsError = true
        })
    },
    getMessages() {
      this.loadingMessages = true
      this.messageError = false

      let conv_id = this.$route.params.id

      if (!this.$route.params.id) {
        conv_id = this.conv_id
      }

      if (!conv_id) { return }

      this.$root.$emit('focus-message-input')

      axios
        .post("ai-coach/messages", { conv_id })
        .then(res => {
          this.messages = res.data.data
          this.loadingMessages = false

          setTimeout(() => {
            let elem = this.$refs.messages.$refs['message-list']
            elem.scrollTop = elem.scrollHeight
          }, 5)
        })
        .catch(error => {
          this.loadingMessages = false
          this.messageError = true
        })
    },
    sendMessage(msgText) {
      if (!msgText) { return }

      this.messages.push({
        role: 'user',
        content: msgText,
      })

      let conv_id = this.$route.params.id

      if (!this.$route.params.id) {
        conv_id = uuid.v4()
      }

      setTimeout(() => {
        this.receivingMessages = true
      }, 500)

      setTimeout(() => {
        let elem = this.$refs.messages.$refs['message-list']
        elem.scrollTop = elem.scrollHeight
      }, 550)

      axios
        .post("ai-coach/send", { channelId: this.channelId, text: msgText, conv_id })
        .then(res => {
          this.thread_id = res.data.tid
          this.message_id = res.data.mid
          this.run_id = res.data.rid
          this.conversation_id = res.data.conversation_id

          this.messageSent = true
        })
        .catch(error => {
          this.loadingMessages = false
        })
    },
    getMessageStatus() {
      let requestData = {
        tid: this.thread_id,
        rid: this.run_id
      }

      axios
        .post("ideation/personalized_ideas_status", requestData)
        .then(res => {
          this.status = res.data.status

          if (this.status == 'in_progress') {
            // this.getMessage()
          }
          else if (this.status == 'completed') {
            setTimeout(() => {
              this.getMessage()

              clearInterval(this.messageSentInterval)
              this.messageSentInterval = null
              this.messageSent = false
            }, 1500)
          }
        })
    },
    getMessage() {
      this.receivingMessages = true

      axios
        .post("ai-coach/receive", { channelId: this.channelId, rid: this.run_id, conversation_id: this.conversation_id })
        .then(res => {
          // this.messages = res.data.data
          // this.receivedMessage = res.data.messages
          this.messages.push({
            role: 'assistant',
            content: res.data.message
          })

          if (this.status == 'completed') {
            this.receivingMessages = false
          }

          this.getConversations()
        })
        .catch(error => {
          this.receivingMessages = false
        })
    },
    removeConversation(conversationId, conversationGroup) {
      if (conversationGroup == 0) {
        el.conversations[0].data = el.conversations[0].data.filter(c => c.id !== conversationId)
      }
      else if (conversationGroup == 1) {
        el.conversations[1].data = el.conversations[1].data.filter(c => c.id !== conversationId)
      }
      else if (conversationGroup == 2) {
        el.conversations[2].data = el.conversations[2].data.filter(c => c.id !== conversationId)
      }
      else if (conversationGroup == 3) {
        el.conversations[3].data = el.conversations[3].data.filter(c => c.id !== conversationId)
      }
    },
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
}
</script>

<style scoped>
.setup-text{
  font-size: 1.5rem;
  color: rgba(155, 81, 224, 1);
  font-weight:500;
}
.bg-image{
  position: absolute;
  height:90%;
  right:0;
  z-index:0;
}
.main-div{
  padding: 2.2rem;
  box-shadow: 0px 0px 40px 0px rgba(155, 81, 224, 0.21);
  border-radius: 30px;
  background-color: white;
  position: relative;
  z-index: 2;
  max-height: 75vh;
}
.top-idea-tab{
  border-top: 1px solid rgba(217, 217, 217, 1);
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
}
.note-div{
  background: rgba(155, 81, 224, 0.2);
  border-radius: 2rem;
  padding: 0.7rem 1.5rem;
}
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
.like-button{
   background: rgba(155, 81, 224, 0.2) !important;
   border: none;
   color: rgba(155, 81, 224, 1) !important;
}
.main-heading{
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.02em;
    text-align: left;
}
.credit-text{
  color: rgba(155, 81, 224, 1);
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0.02em;
  text-align: right;
}
.make-blur{
  filter: blur(7px);
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;
}
.middle-blur-div{
  position: absolute;
  bottom: -6%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.premium-heading-text{
  color: rgba(51, 51, 51, 1);
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: -0.02em;
}
.premium-heading-para{
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: rgba(155, 81, 224, 1);
}
.main-top-heading{
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.02em;
  text-align: left;
  color: rgba(130, 130, 130, 1);
}
   
/* Primary UI */
.ai-text{
  font-size:49px;
  color: rgba(51, 51, 51, 1);
  font-weight:900;
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
  /* .main-div{
    height: 700px;
  } */
  .main-heading{
     font-size: 1.25rem;
  }
  .credit-text{
    font-size: 1.5rem;
  }
}



@media only screen and (max-width: 308px) {
  .ai-text{
    font-size:23px;
  }  
}

/* Secondary UI */
.card-css{
  /* border-radius: 20px; */
  box-shadow: none;
  background-color: transparent;
  margin-bottom: 0;
}
.content-title {
  color: rgba(51, 51, 51, 1);

  font-size: 1.3rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-align: left;

}
.copy-icon{
  color: rgba(155, 81, 224, 1);
  font-weight: 700;
}

</style>
