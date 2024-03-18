<template>
  <b-row class="mt-3">
    <b-col
      class="mb-0 mt-0 col-12 col-md-6 text-center px-0 px-md-2"  
      v-for="channel in channels" :key="channel.id.channelId" cols="6"
      @click="$emit('selectChannel', channel.id.channelId)" >
      <a>
      <b-card tag="article" style="border-radius: 2rem;">
        <div class="row align-items-center" >
          <div class="col-2 text-center img-div">
              <b-img-lazy
                :src="channel.snippet.thumbnails.medium.url"
                :alt="channel.snippet.channelTitle.slice(5)"
                class="rounded-circle card-image"
                fluid
              />
          </div>
          <div class="col-8 d-flex justify-content-center align-items-center">
            <b-card-body class="p-0 text-left">
              <b-card-title class="mb-0">
                <b-link
                  v-b-popover.hover.top="channel.snippet.channelTitle"
                  class="blog-title-truncate text-body-heading"
                >
                  <span v-html="channel.snippet.channelTitle" class="channeltitle"/>
                </b-link>
              </b-card-title>
              <b-media no-body>
                <b-media-body>
                  <span class="text-muted subscriber-count">{{ formatViewsCount(channel.statistics.subscriberCount) }} Subscribers
                  </span>
                </b-media-body>
              </b-media>
                      <!-- <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        class="mt-1"
                        block
                        variant="gradient-primary"
                        @click="$emit('selectChannel', channel.id.channelId)"
                      size="lg"
                    >
                      <span > Select Channel</span>
                    </b-button> -->
            </b-card-body>
          </div>
            <!-- for Desktop -->
            <div @click="$emit('selectChannel', channel.id.channelId)" class="col-2 text-center">
              <b-spinner v-if="loading && (channel.id.channelId == channelId)" small />
              <feather-icon v-else class="text-dark" size="30" icon="ChevronRightIcon" />
            </div>
            <!-- for Desktop -->
        </div>
      </b-card>
      </a>
    </b-col>
  </b-row>
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
    BSpinner,
    VBPopover,
  } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  export default {
    name: 'Channels',
    props: ['loading', 'channels', 'channelId'],
    components: {
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
    BSpinner,
    VBPopover,
    Ripple
    },
    directives: {
      Ripple,
      "b-popover": VBPopover,
    },
    methods: {
      formatViewsCount(count) {
      count = parseInt(count);
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + "M ";
      }
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K ";
      }
      return count.toLocaleString() + " ";
    },
      // selectChannel(id){
      //     this.$emit("selectchannel", id);
      // }
    }
   
  }
</script>
<style scoped>
 .card{
    -webkit-box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.3) !important;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.3) !important;
    margin-bottom: 0.8rem;
  }
  .text-body-heading{
    color: #333 !important;
    font-weight: 700 !important;
  }
  @media(max-width: 350px){
    .card-image{
      width: 80%;
      padding-left: 0;
    }
    .img-div{
      padding: 0;
    }
    .channeltitle{
      font-size: 1rem;
    }
    .subscriber-count{
      font-size: 0.8rem;
    }
    .circle-icon{
      width: 1.5rem;
      margin-right: 2px;
    }
  }
</style>