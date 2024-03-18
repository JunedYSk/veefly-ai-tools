<template>
  <!-- Table Container Card -->
  <div>
    <div class="mb-1 ">
        <b-link :to="{ name: 'channel-campaigns' }">
          <feather-icon icon="ChevronLeftIcon" />
          <strong>Back</strong>
        </b-link>
      </div>
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row class="d-flex flex-lg-nowrap flex-xl-nowrap">
        <b-col lg="4" md="4" sm="12" class="d-none d-lg-block d-md-block paddingb m-auto">
          <b-media-body class="ml-1 m-auto">
              <!-- <b-row> -->
              <h2>
                <span class="toCapitalFirst headcolor">{{ '(' + '#' + channelData.id + ')' }} Channel Promotion</span>
              </h2>
              <b-card-text>
                Amount : {{ '$' + channelData.amount}} <br>
                <div class="spacer"></div>
                Created At : {{channelData.created_at}} <br>
                <div class="spacer"></div>
              </b-card-text>
            </b-media-body>
        </b-col>
        <div class="vl d-xl-block d-lg-block d-none"></div>
        <b-col lg="4" md="4" sm="12" class="paddingb mt-2 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 text-center text-md-left m-auto">
          <b-media no-body>
              <b-img
                :src="channelData.channel_options.src"
                blank-color="#ccc"
                fluid
                rounded="circle"
                width="120"
                alt="placeholder"
                class=""
              />

            <b-media-body class="ml-md-1 m-auto">
              <!-- <b-row> -->
              <h2>
                <a v-bind:href="channelData.channel_options.url">{{channelData.channel_options.channelTitle}}</a>
              </h2>
              <!-- <div class="subcountbadge">
                  <span class="ybag"><img style="position:relative; bottom:1px" src="https://www.youtube.com/s/subscriptions/subscribe_embed/img/subscribe_button_branded_lozenge.png" />&nbsp;{{ kFormatter(Math.ceil(channelData.channel_options.subs),2) }}</span>
              </div> -->
              <!-- </b-row> -->
              <b-card-text>
                <!-- Created At : {{channelData.updated_at}} <br> -->
                <!-- <div class="spacer"></div> -->
                Payment : <b-badge v-if="channelData.is_payed == true" pill variant="success">Paid</b-badge>
                <b-badge v-else pill variant="danger">Unpaid</b-badge> <br>
                <div class="spacer"></div>
                Status : 
                <b-badge pill :variant="`${packageStatus(channelData.status).variant}`">{{ packageStatus(channelData.status).value }}</b-badge>
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

        <b-col sm="12" class="d-xs-block d-md-none d-lg-none d-xl-none paddingb text-center text-md-left m-auto">
          <b-media-body class="ml-1 m-auto py-2">
              <!-- <b-row> -->
              <h2>
                <span class="toCapitalFirst headcolor">{{ '(' + '#' + channelData.id + ')' }} {{ channelData.package_name }} Package</span>
              </h2>
              <b-card-text>
                Amount : {{ '$' + channelData.amount}} <br>
                <div class="spacer"></div>
                Created At : {{channelData.created_at}} <br>
                <div class="spacer"></div>
                <!-- Status : 
                <b-badge pill :variant="`${packageStatus(channelData.status).variant}`">{{ packageStatus(channelData.status).value }}</b-badge> -->
              </b-card-text>
            </b-media-body>
        </b-col>
        <div class="vl d-xl-block d-lg-block d-none m-auto"></div>
        <b-col lg="4" md="4" sm="12" class="pb-xs-2 text-center text-md-left m-auto">
          <b-media-body class="ml-1 m-auto">
              <!-- <b-row> -->
            <h2>
              <span class="headcolor">Channel Deliverables</span>
            </h2>
            <b-card-text>
   <!--            Subscribers : {{channelData.options.minSubs}} - {{channelData.options.maxSubs}}<br>
              <div class="spacer"></div> -->
              Total Views :  {{channelData.options.viewsmaxcount}} - {{channelData.options.viewsmincount}}
            </b-card-text>
<!--             <b-card-text v-if="channelData.package_name == 'monetization'">
              <span style="margin-right: 6px;">Subscribers : 1000</span><feather-icon v-b-tooltip.hover.top='"Maximum your channel will reach 1000 subscribers. e.g If you have 100 subscribers you will get 900 subscribers only!"' icon="InfoIcon" /><br>
              <div class="spacer"></div>
              <span style="margin-right: 6px;">Watch Hours : 4000</span><feather-icon v-b-tooltip.hover.top='"Maximum your channel will reach 4000 watch hours. e.g If you have 1000 watch hours you will get 3000 watch hours only!"' icon="InfoIcon" />
            </b-card-text> -->
          </b-media-body>
        </b-col>
      </b-row>
    </div>

    <!-- Start Desktop Table  -->
    <b-table
      ref="refInvoiceListTable"
      :items="fetchCampaigns"
      stacked="md"
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="Hey! Seems like you have not created a campaign, start promoting now!"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <strong>Loading...</strong>
        </div>
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data"> #{{ data.value }} </template>

      <!-- Column: Video -->
      <template #cell(video)="data">
        <b-img-lazy :src="data.item.options.src" :height="40" />
      </template>

      <!-- Column: Campaign -->
      <template #cell(title)="data">
        <span
          v-if="data.item.options.title"
          v-b-tooltip.hover.top="data.item.options.title"
          class="w-100 text-truncate"
        >
          {{ data.item.options.title.substr(0, 30)
          }}<span v-if="data.item.options.title.length > 30">...</span>
        </span>
      </template>

      <!-- Column: Status -->
      <template #cell(status)="data">
        <b-badge
          pill
          :variant="`${resolveInvoiceStatusVariant(data.value).variant}`"
        >
          {{ resolveInvoiceStatusVariant(data.value).value }}
        </b-badge><feather-icon
            v-if="data.item.is_payed"
            :id="`campaign-status-${data.item.id}-preview-icon`"
            icon="InfoIcon"
            size="16"
            class="mx-1"
          />
          <feather-icon
            v-else
            :id="`campaign-unpaid-${data.item.id}-preview-icon`"
            icon="InfoIcon"
            size="16"
            class="mx-1"
          />
          <b-tooltip
            :title="resolveInvoiceStatusVariant(data.value).msg"
            :target="`campaign-status-${data.item.id}-preview-icon`"
          />
          <b-tooltip
            title="Please add funds to initiate your campaign."
            :target="`campaign-unpaid-${data.item.id}-preview-icon`"
          />
          
          
      </template>

      <!-- Column: Payment Status -->
      <template #cell(is_payed)="data">
        <b-badge
          pill
          :variant="`${resolvePaymentStatusVariant(data.value).variant}`"
        >
          {{ resolvePaymentStatusVariant(data.value).value }}
        </b-badge>
      </template>

      <!-- Column: amount -->
      <template #cell(amount)="data">
        <span class="text-nowrap">
          {{
            data.item.amount
              ? "$ " + data.item.amount
              : data.item.free_views + " Free Views"
          }}
        </span>
      </template>

      <!-- Column: Spent -->

      <!-- Column: Actions -->
    </b-table>
    <!-- End Desktop Table  -->

    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalCampaigns"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTable,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BImgLazy,
  VBTooltip,
  BCardText,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import axios from "@axios";
import useCampaignsList from "./channel-details/useCampaignsList";
import campaignStoreModule from "./channel-details/campaignStoreModule";
import { BMedia, BImg, BMediaAside, BMediaBody } from 'bootstrap-vue';
import { kFormatter } from "@core/utils/filter";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
    BImgLazy,
    VBTooltip,
    BCardText,
    BMedia,
    BImg,
    BMediaAside,
    BMediaBody,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data(){
    return{
      channelData: {
        id: null,
        amount: 499,
        channel_id: null,
        channel_options: {
          url: null,
          channelId: null,
          channelTitle: null,
          src: null,
          subs: null,
        },
        options: {
           minViews: 60000, 
           maxViews: 80000, 
           minSubs: 1600, 
           maxSubs: 2400,
        }
      },
    }
  },
  beforeMount(){
    this.getChannelCampaignDetails();
  },
  methods: {
    kFormatter,
    deleteCampaign(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
          confirmButton: "btn btn-outline-primary",
          cancelButton: "btn btn-primary ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`/channels/${id}`)
            .then((data) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: `Your Channel ID ${id} has been deleted.`,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.refetchData();
            })
            .catch((err) => {
              this.$swal({
                icon: "error",
                title: "Error",
                text: "Failed to delete campaign",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                confirmButtonText: "I Understood",
                buttonsStyling: false,
              });
            });
        }
      });
    },
    getChannelCampaignDetails() {
      this.loading = true;
      // this.href = location.href;
      // this.packageId = href.match(/([^\/]*)\/*$/)[1];
      // console.log(this.packageId)
      axios
      .get(`${process.env.VUE_APP_ADMIN_API_URL}/channels/${this.$route.params.id}` )
        .then((data) => {
          // console.log(data.data.data);
          this.channelData = data.data.data;
          this.channelImage = data.data.data.channel_options.src;
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Unable to fetch package",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
          this.loading = false;
        });
    }
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, campaignStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const statusOptions = [
      { value: "", label: "All" },
      { value: "1", label: "Pending" },
      { value: "2", label: "Under Review" },
      { value: "3", label: "In Progress" },
      { value: "4", label: "Completed" },
      { value: "5", label: "Rejected" },
      { value: "7", label: "Paused" },
      { value: "8", label: "Removed" },
    ];

    const {
      fetchCampaigns,
      tableColumns,
      perPage,
      currentPage,
      totalCampaigns,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      resolvePaymentStatusVariant,
      statusFilter,
      refetchData,
      packageStatus,
      resolveInvoiceStatusVariant,
      resolveJson,
    } = useCampaignsList();

    return {
      fetchCampaigns,
      tableColumns,
      perPage,
      currentPage,
      totalCampaigns,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      resolvePaymentStatusVariant,
      statusFilter,
      packageStatus,
      refetchData,
      statusOptions,
      avatarText,
      resolveInvoiceStatusVariant,
      resolveJson,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.table.b-table.b-table-stacked-sm > tbody > tr > [data-label]::before {
  text-align: left !important;
}

@media screen and (min-width: 240px) {
  .new {justify-content: center !important;}
}
@media screen and (min-width: 480px) {
  .new {justify-content: left !important;}
  .abc {
  margin-left: 10px !important;
  display: contents !important;
}
}
.ml-50 {
  margin-left: 0.9rem !important;
}
.per-page-selector {
  width: 190px !important;
}
.ybag{
    position:relative;
    padding: 2px 5px;
    color: #fff;
    border-radius: 4px;
    background-color:red ;
    min-width: 100px;
}
.ybag::before{
    background-image: url(/s/subscriptions/subscribe_embed/img/subscribe_button_branded_lozenge.png);
    background-repeat: no-repeat;
    background-size: auto;
    width: 16px;
    height: 12px;
}
.subcountbadge{
  margin-left: 2%;
  margin-top: 0.5%;
}
.vl {
  border-left: 1.7px solid #5a44dc;
  height: 120px;
}
.spacer {
  margin-top: 0.4rem;
}
.paddingb {
  margin-bottom: 1.5rem;
}
.toCapitalFirst {
  text-transform: capitalize;
}
.headcolor {
  color: #9B51E0;
}
.backpos {
  position: absolute;
    top: -3%;
    left: 6%;
    z-index: 9999;
}

@media only screen and (max-width: 415px){
  .text-truncate{
    white-space: wrap;
  }
}
</style>
