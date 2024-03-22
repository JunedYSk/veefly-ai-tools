<template>
  <div class="scroll-idea">
    <div v-if="loadingConversations" class="text-center mt-3">
      <b-spinner label="Loading..." variant="primary" />
    </div>
    <b-nav
      v-else
      class="overflow-auto"
      style="height: calc(100% - 103px);"
      vertical
    >
      <div
        v-for="(conversation, key) in conversations"
        :key="conversation.label"
      >
        <div
          v-if="conversation.data.length"
          class="mb-2"
        >
          <h4 class="mb-1">{{ conversation.label }}</h4>
          <div
            v-for="conversationData in conversation.data"
            :key="conversationData.conv_id"
          >
            <div
              v-if="$route.params.id == conversationData.conv_id"
              class="d-flex align-items-center bg-primary rounded mb-1 conversation-div w-100"
            >
              <input
                class="bg-transparent text-light border-0 outline-none"
                v-model="conversationData.title"
                ref="conv-input"
                :readonly="readOnly"
              />

              <div class="d-flex align-items-center button-div" v-if="!hideOptions">
                <b-button
                  variant="primary"
                  size="sm"
                  class="rounded-sm chat-history-btn"
                  @click="edit"
                >
                  <feather-icon icon="Edit2Icon" size="18" />
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  class="rounded-sm chat-history-btn"
                  :disabled="disableDeleteBtn"
                  @click="deleteConversation(conversationData, key)"
                >
                  <feather-icon icon="Trash2Icon" size="18" />
                </b-button>
              </div>

              <div class="d-flex align-items-center button-div" v-if="hideOptions">
                <b-button
                  variant="primary"
                  size="sm"
                  class="rounded-sm chat-history-btn"
                  @click="updateTitle(conversationData)"
                >
                  <feather-icon icon="CheckIcon" size="18" />
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  class="rounded-sm chat-history-btn"
                  @click="cancelEdit"
                >
                  <feather-icon icon="XIcon" size="18" />
                </b-button>
              </div>
            </div>

            <router-link
              v-else
              :to="{ name: 'ai-coach-chat', params: { id: conversationData.conv_id } }"
              class="d-block chat-prompts text-dark rounded overflow-hidden mb-1 font-weight-normal chat-history-text"
            >
              {{ conversationData.title }}
            </router-link>
          </div>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script>
import {
  BSpinner,
  BNav,
  BNavItem,
  BButton,
  BFormInput,
} from "bootstrap-vue"
import axios from "@axios"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"

export default {
  components: {
    BSpinner,
    BNav,
    BNavItem,
    BButton,
    BFormInput,
  },
  props: ["loadingConversations", "conversations"],
  data() {
    return {
      hideOptions: false,
      readOnly: true,
      disableDeleteBtn: false,
    }
  },
  methods: {
    edit() {
      this.hideOptions = true
      this.readOnly = false
      this.$refs['conv-input'][0].focus()
    },
    cancelEdit() {
      this.hideOptions = false
      this.readOnly = true
    },
    updateTitle(conversation) {
      let id = conversation.id
      let title = conversation.title

      this.hideOptions = false
      this.readOnly = false

      axios
        .post("ai-coach/update_conversation", { id, title })
        .then(res => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Conversation updated successfully",
              icon: "CheckIcon",
              variant: "success",
            }, 
          })
        })
        .catch(err => {
          this.hideOptions = true
          this.readOnly = false
          this.$refs['conv-input'][0].focus()

          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Failed to update conversation",
              icon: "XIcon",
              variant: "danger",
            }, 
          })
        })
    },
    deleteConversation(conversation, conversationGroup) {
      let id = conversation.id

      this.disableDeleteBtn = true

      axios
        .post("ai-coach/delete_conversation", { id })
        .then(res => {
          this.disableDeleteBtn = false

          this.$root.$emit('removeConversation', { conversationId: id, conversationGroup })

          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Conversation deleted successfully",
              icon: "CheckIcon",
              variant: "success",
            }, 
          })

          this.$router.push({ 'name': 'ai-coach' })
        })
        .catch(err => {
          this.disableDeleteBtn = false

          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Failed to delete conversation",
              icon: "XIcon",
              variant: "danger",
            }, 
          })
        })
    },
  },
}
</script>

<style scoped>
.chat-history-btn{
  padding: 2px; 
}
.chat-history-text{
  text-overflow: ellipsis;
  text-wrap: nowrap;
  max-width: 240px;
}
.scroll-idea{
  max-height: 40vh; 
  overflow-y: auto;
}
.scroll-idea::-webkit-scrollbar {
  width: 3px;
}
.scroll-idea::-webkit-scrollbar-thumb {
  background-color: rgba(169, 169, 169, 0.514);
}
.chat-prompts{
  line-height: 23px;
  padding: 4px 1rem;
  border-radius: 20px;
  background: rgba(152, 152, 152, 0.2);
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-size: 1.1rem;
}
.conversation-div{
  max-width: 240px;
  padding: 4px 1rem; 
  font-size: 1rem;
  width: fit-content;
  position: relative;
  text-overflow: ellipsis;
}
.button-div{
  position: absolute;
  right: 12px;
}
@media (max-width: 767px) {
  .chat-history-text{
  text-overflow: ellipsis;
  text-wrap: wrap;
  max-width: 100%;
}
}
</style>
