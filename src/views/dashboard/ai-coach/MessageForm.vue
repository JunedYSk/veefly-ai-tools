<template>
  <div class="w-100 mt-1 mb-2">
    <b-form
      class="d-flex position-relative"
      @submit.prevent="sendMessage(message); message = null"
    >
      <b-form-input
        v-model="message"
        :disabled="receivingMessages"
        placeholder="Ask me anything"
        ref="message-input"
        class="sreach-bar"
      />
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        :disabled="!message"
        variant="transparent"
        type="submit"
        class="position-absolute"
        style="right: 0;top: 3.5px;"
      >
        <feather-icon icon="ArrowRightIcon" size="20"/>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import {
  BForm,
  BFormInput,
  BButton,
  BSpinner,
} from "bootstrap-vue"
import Ripple from "vue-ripple-directive"

export default {
  components: {
    BForm,
    BFormInput,
    BButton,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  props: ["receivingMessages", "sendMessage"],
  data() {
    return {
      message: null,
    }
  },
  mounted() {
    let el = this
    this.$root.$on('focus-message-input', () => {
      // el.$refs['message-input'].input.focus()
    })
  },
}
</script>

<style scoped>
.sreach-bar{
  border-radius: 1rem;
  padding: 1.8rem 1.3rem;
  border: none;
}
</style>
