import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useVideosList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  const perPage = ref(10)
  const totalVideos = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const channelID = ref('')
  const videoID = ref('')
  const campaignUrl = ref('')

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalVideos.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchVideos = (ctx, callback) => {
    // console.log(channelID)
    store
      .dispatch('app-invoice/fetchVideos', {
        id: channelID,
        page_size: perPage.value,
        page: currentPage.value,
        sort_by: sortBy.value,
        sort_desc: isSortDirDesc.value,
      })
      .then(response => {
        const { invoices, total } = response.data
        callback(response.data.data.data)
        totalVideos.value = response.data.data.total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching video list",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const resolveJson = options => JSON.parse(options)

  const checkLink = () => {
    this.$refs.campaignForm.validate().then(success => {
      if (success) {
        getID()
      }
    })
  }
  const getID = () => {
    if (
      this.campaignUrl.search('channel') >= 0
      || this.campaignUrl.search('user') >= 0
    ) {
      this.channelID = this.getChannelID(this.campaignUrl)

      // (this.channelID)? this.isChannelUrl = true: this.isChannelUrl =false;
      this.fetchVideos()
    } else {
      this.videoID = this.getVideoID(this.campaignUrl)

      // (this.videoID)? this.videoUrl = true: this.videoUrl =false;
      // console.log(this.videoID)

      if (this.videoUrl) {
        this.$router.push({ name: 'add-video', params: { id: this.videoID } })
      }
    }

    // if (!this.vId == 0 || !this.channelId == 0) {
    //   this.badUrl = false;
    // } else {
    //   this.badUrl = true;
    // }
  }

  const selectVideoId = videoID => {
    this.vId = videoID
    this.getVideo()
  }

  // getChannel() {
  //   this.channelsLoading = true;

  //   axios
  //     .post("/video/getChannelVideos", { id: this.channelID })
  //     .then((data) => {
  //       this.status = data.data.data;
  //     });
  // },
  // getVideo() {
  //   if (!this.campaign_id) this.checkVideo();
  //   else this.checkedVideo = 10;

  //   var gUrl =
  //     "https://www.googleapis.com/youtube/v3/videos?id=" +
  //     this.vId +
  //     "&key=" +
  //     this.apiKey +
  //     "&part=snippet,statistics";
  //   axios.get(gUrl).then((data) => {
  //     this.videoData = data.data;
  //     this.badUrl = data.data.items && data.data.items.length < 1;
  //     if (this.badUrl) return;
  //     Vue.set(
  //       this.params,
  //       "video_tags",
  //       this.videoData.items[0].snippet.tags
  //     );
  //     if (this.channelLink) {
  //       this.videoUrl = "https://www.youtube.com/watch?v=" + this.vId;
  //     }
  //     if (this.videoData.items && this.videoData.items.length > 0)
  //       this.loadedVideo = true;
  //     if (!this.params.title)
  //       Vue.set(
  //         this.params,
  //         "title",
  //         this.videoData.items["0"].snippet.title
  //       );
  //     axios
  //       .get(
  //         "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" +
  //           this.videoData.items[0].snippet.channelId +
  //           "&key=" +
  //           this.apiKey
  //       )
  //       .then((data) => {
  //         this.channel = data.data;
  //       });
  //   });
  // },
  const getChannelID = url => {
    const pattern = /^(?:(http|https):\/\/[a-zA-Z-]*\.{0,1}[a-zA-Z-]{3,}\.[a-z]{2,})\/(channel|user)\/([a-zA-Z0-9_-]{3,})$/
    const matchs = url.match(pattern)
    return matchs[3]
  }

  const getVideoID = url => {
    let ID = ''
    url = url
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i)
      ID = ID[0]
    } else ID = url
    return ID
  }

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

    refetchData,
    resolveJson,
    checkLink,
    getID,
    getChannelID,
    getVideoID,
    selectVideoId,
  }
}
