<template>
  <div>
    <PhoneAlert/>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex new align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button variant="primary" :to="{ name: 'channel-link' }">
            PROMOTE CHANNEL
          </b-button>
        </b-col>

        <b-col cols="12" md="3">
          <div class="d-flex new abc align-items-center justify-content-end mb-1 mb-md-0">
            <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="(options) => options.value"
              label="label"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
        <!-- Per Page -->

        <b-col
          cols="12"
          md="3"
          class="d-flex new align-items-center justify-content-end mb-1 mb-md-0"
        >
          <!-- <label>Entries</label> -->
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>
      </b-row>
    </div>

    <!-- Start Desktop Table  -->
    <b-table
      ref="refInvoiceListTable"
      :items="fetchPackages"
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
      <!-- <template #cell(video)="data">
        <b-img-lazy :src="data.item.options.src" :height="40" />
      </template> -->

      <!-- Column: Campaign -->
      <template #cell(channel_options)="data">
        <span
          v-if="data.item.channel_options.channelTitle"
          v-b-tooltip.hover.top="data.item.channel_options.channelTitle"
          class="w-100 text-truncate"
        >
          {{ data.item.channel_options.channelTitle.substr(0, 15)
          }}<span v-if="data.item.channel_options.channelTitle.length > 15">...</span>
        </span>
      </template>

      <!-- Column: Status -->
      <template #cell(status)="data">
        <b-badge
          pill
          :variant="`${resolveInvoiceStatusVariant(data.value).variant}`"
        >
          {{ resolveInvoiceStatusVariant(data.value).value }}
        </b-badge>
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

      <!-- Column: watchhours -->
      <template #cell(watchHours)="data">
        <span v-if="data.item.watchHours" class="text-nowrap">
          {{
            parseInt((data.item.watchHours).difference)
          }}
        </span>
        <b-link v-else-if="!data.item.is_payed"
                :to="{ name: 'channel-payment', params: { id: data.item.id } }" class="text-nowrap">
          Pay Now
        </b-link>
        <span v-else class="text-nowrap">
            <a @click="setChannelId(data.item.channel_id)" href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=361826808639-186mlkgug50ddrn9tv2dllomdf0guhtt.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fveefly.com%2Fdashboard%2Fmonetization%2Fgoogle-callback%2Fwelcome&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyt-analytics.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyt-analytics-monetary.readonly%20email%20profile&prompt=consent&include_granted_scopes=true&flowName=GeneralOAuthFlow">Connect YouTube Account</a>
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <!-- <feather-icon
            v-if="data.item.package_name == 'monetization'"
            :id="`campaign-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            v-b-modal="`campaign-row-${data.item.id}-preview-icon`"
          /> -->
          <b-link style="color: #6e6b7b;" :to="{ name: 'channel-details', params: { id: data.item.id } }">
            <feather-icon
            :id="`campaign-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            
          /></b-link>
          <!-- Pending for Production -->
          <!-- <feather-icon
            v-if="data.item.is_renewed == '0' && data.item.status == '4' && data.item.created_at > checkDate && data.item.package_name == 'silverplay'"
            :id="`campaign-row-${data.item.id}-repeat-icon`"
            icon="RepeatIcon"
            size="16"
            @click="dueDate(data.item); checkPackage(data.item.amount)"
            v-b-modal="`campaign-row-${data.item.id}-repeat-icon`"
          />
          <b-tooltip
            title="Renew"
            :target="`campaign-row-${data.item.id}-repeat-icon`"
          /> -->
          <b-tooltip
            title="Preview"
            :target="`campaign-row-${data.item.id}-preview-icon`"
          />
          <b-tooltip
            title="Actions"
            :target="`campaign-row-${data.item.id}-action-icon`"
          />
          <!-- Dropdown -->
          <b-dropdown
            v-if="data.item.amount && !data.item.is_payed"
            :id="`campaign-row-${data.item.id}-action-icon`"
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template  #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <div>
              <b-dropdown-item
                id="DashChannelPayNowBtn"
                v-if="!data.item.is_payed"
                :to="{ name: 'channel-payment', params: { id: data.item.id } }"
              >
                <feather-icon icon="CreditCardIcon" />
                <span class="align-middle ml-50">Pay Now</span>
              </b-dropdown-item>
              <!-- <b-dropdown-item
                v-if="data.item.is_payed | data.item.package_name"
                :to="{ name: 'package-details', params: { id: data.item.id } }"
              >
                <feather-icon icon="CreditCardIcon" />
                <span class="align-middle ml-50">View Details</span>
              </b-dropdown-item> -->
            </div>
          </b-dropdown>
        </div>
        <!-- Pending for Production -->
        <!-- Start Renew Modal -->
        <!-- <b-modal
          :id="`campaign-row-${data.item.id}-repeat-icon`"
          hide-footer
          modal-class="modal-primary"
          centered
          size="lg"
          :title="`Renew : ` + data.item.package_name.charAt(0).toUpperCase() + data.item.package_name.slice(1) + ' ' + 'Package'"
        >
          <div class="m-2">
            <b-row v-if="hide" class="d-flex flex-lg-nowrap flex-xl-nowrap">
              <b-col lg="6" md="6" sm="12" class="paddingb mt-xl-1 mt-lg-0 mt-md-0 mt-sm-0 text-center text-md-left m-auto">
                <b-media no-body>
                    <b-img
                      :src="data.item.channel_options.src"
                      blank-color="#ccc"
                      fluid
                      rounded="circle"
                      width="110"
                      alt="placeholder"
                      class=""
                    />

                  <b-media-body class="ml-md-1 m-auto">
                    <h2>
                      <a v-bind:href="data.item.channel_options.url">
                      {{data.item.channel_options.channelTitle}}
                      </a>
                    </h2>
                    <b-card-text>
                      Payment : <b-badge pill variant="danger">Due</b-badge> <br>
                      <div class="spacer"></div>
                    </b-card-text>
                  </b-media-body>
                </b-media>
              </b-col>
              <div class="vl d-xl-block d-lg-block d-none"></div>
              <b-col lg="6" md="6" sm="12" class="paddingb text-center text-md-left m-auto">
                <b-media-body class="ml-1 m-auto py-2">
                    <h2>
                      <span class="toCapitalFirst headcolor">{{ data.item.package_name }} Package {{ '$' + data.item.amount }} </span>
                    </h2>
                    <b-card-text>
                      Amount : {{ '$' + data.item.amount}} <br>
                      <div class="spacer"></div>
                      Package Due Date : {{ date2 }} <br>
                      <div class="spacer"></div>
                    </b-card-text>
                  </b-media-body>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="hide">
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    block
                    variant="outline-primary"
                    @click="continuePackage(data.item)"
                    :disabled="loading || campaign.id"
                  >
                    <b-spinner v-if="loading" small />
                    <span v-else>Continue Same Plan</span>
                  </b-button>
                </div>
              </b-col>
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      class=""
                      block
                      variant="gradient-primary"
                    @click="hide = !hide"
                    v-if="data.item.amount < checkAmount"
                  >
                    Wish to Upgrade?
                  </b-button>
                </div>
              </b-col>
            </b-row>
            <b-row class="d-flex" v-else>
              <div class="mb-1 mt-n1">
                <b-link @click="hide = !hide">
                  <feather-icon icon="ChevronLeftIcon" />
                  <strong>Back</strong>
                </b-link>
              </div>
              <b-col md="12">
                <b-row class="d-flex flex-lg-nowrap flex-xl-nowrap">
              <b-col lg="6" md="6" sm="12" class="paddingb mt-xl-1 mt-lg-0 mt-md-0 mt-sm-0 text-center text-md-left m-auto">
                <b-media no-body>
                    <b-img
                      :src="data.item.channel_options.src"
                      blank-color="#ccc"
                      fluid
                      rounded="circle"
                      width="110"
                      alt="placeholder"
                      class=""
                    />

                  <b-media-body class="ml-md-1 m-auto">
                    <h2>
                      <a v-bind:href="data.item.channel_options.url">
                      {{data.item.channel_options.channelTitle}}
                      </a>
                    </h2>
                    <b-card-text>
                      Payment : <b-badge pill variant="danger">Due</b-badge> <br>
                      <div class="spacer"></div>
                    </b-card-text>
                  </b-media-body>
                </b-media>
              </b-col>
              <div class="vl d-xl-block d-lg-block d-none"></div>
              <b-col lg="6" md="6" sm="12" class="paddingb text-center text-md-left m-auto">
                <b-media-body class="ml-1 m-auto py-2">
                    <h2>
                      <span class="toCapitalFirst headcolor">{{ data.item.package_name }} Package</span>
                    </h2>
                    <b-card-text>
                      Amount : {{ '$' + campaign.amount}} <br>
                      <div class="spacer"></div>
                      Package Due Date : {{ date2 }} <br>
                      <div class="spacer"></div>
                    </b-card-text>
                  </b-media-body>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="hide">
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    block
                    variant="outline-primary"
                    @click="continuePackage(data.item)"
                    :disabled="loading || campaign.id"
                  >
                    <b-spinner v-if="loading" small />
                    <span v-else>Continue Plan</span>
                  </b-button>
                </div>
              </b-col>
              <b-col md="6">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    class=""
                    block
                    variant="gradient-primary"
                    @click="hide = !hide"
                  >
                    Upgrade Plan
                  </b-button>
                </div>
              </b-col>
            </b-row>
                <b-form-group class="mt-1">
                  <b-form-radio-group
                    class="w-100 mblbtn"
                    id="btn-radios-1"
                    v-model="selectedPackage"
                    button-variant="outline-primary"
                    :options="result"
                    buttons
                    name="radios-btn-default"
                />
                </b-form-group>
                  <p class="d-flex justify-content-center mb-n1 mtop"> Monthly Deliverables</p>
                <div class="alert-body">  </div>
                <b-row>
                  <b-col md="6">
                      <b-alert variant="primary" show>
                        <div class="alert-body text-center">
                          <span><small>Approx Views</small>  </span>
                            <div>
                                <h2
                                style="font-size: 18px"
                                class="d-inline mr-25 text-primary"
                                >
                                {{kFormatter(campaign.options.minViews)}} - 
                                {{kFormatter(campaign.options.maxViews)}}
                                </h2>
                            </div>
                        </div>
                      </b-alert>
                  </b-col>
                  <b-col md="6">
                      <b-alert variant="primary" show>
                        <div class="alert-body text-center">
                          <span><small>Approx Subscribers</small>  </span>
                            <div>
                                <h2
                                style="font-size: 18px"
                                class="d-inline mr-25 text-primary"
                                >
                                {{kFormatter(campaign.options.minSubs, 1)}} - 
                              {{kFormatter(campaign.options.maxSubs,1)}}
                                </h2>
                            </div>
                        </div>
                    </b-alert>
                  </b-col>
                  <b-col md="12">
                    <b-alert
                    variant="success"
                    show
                    >
                    <div class="alert-body text-center">
                      Continue this package for <strong> {{campaign.options.estimatedMonths}} Months </strong> to unlock your SilverPlay Button.
                    </div>
                    </b-alert>
                  </b-col>
                  <b-col md="12">
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      block
                      variant="gradient-primary"
                      @click="changePackage(data.item)"
                      size="lg"
                    >
                      <b-spinner v-if="loading" small />
                      <span v-else> Upgrade Package</span>
                    </b-button>
                  </b-col>
                </b-row>
             </b-col> 
            </b-row>
          </div>
        </b-modal> -->
        <!-- Start Preview Modal -->
        <!-- <b-modal
          :id="`campaign-row-${data.item.id}-preview-icon`"
          hide-footer
          modal-class="modal-primary"
          centered
          size="lg"
          :title="`Channel Title: ` + data.item.channel_options.channelTitle"
        >
          <div class="my-md-3 my-1 mx-md-1 row">
            <b-img-lazy
              style="height: fit-content"
              class="col-md-5 align-items-center"
              :src="data.item.options.src"
            />
            <div class="offset-md-1 align-items-center col-md-10">
              <p class="mt-md-0 mt-2">
                Package Id:
                <strong class="float-right">#{{ data.item.id }}</strong>
              </p>
              <p>
                Amount:
                <strong class="float-right">
                  {{
                    "$ " + data.item.amount
                  }}</strong
                >
              </p>
              <p>
                Package:
                <strong class="float-right">
                  {{
                     data.item.package_name
                  }}</strong
                >
              </p>
              <p>
                Created On:
                <strong class="float-right">{{
                  data.item.created_at.split(" ")[0]
                }}</strong
                ><br />
                <strong class="float-right">{{
                  data.item.created_at.split(" ")[1]
                }}</strong>
              </p>
              <br />
              <p>
                Status:
                <span class="float-right"
                  ><b-badge
                    pill
                    :variant="`${
                      resolveInvoiceStatusVariant(data.item.status).variant
                    }`"
                  >
                    {{ resolveInvoiceStatusVariant(data.item.status).value }}
                  </b-badge></span
                >
              </p>
              <p>
                Payment:
                <span class="float-right">
                  <b-badge
                    pill
                    :variant="`${
                      resolvePaymentStatusVariant(data.item.is_payed).variant
                    }`"
                  >
                    {{ resolvePaymentStatusVariant(data.item.is_payed).value }}
                  </b-badge></span
                >
              </p>
              <div v-if="data.item.status != 5 && data.item.status != 8">
                <div>
                  <p>
                    Watch Hours:
                    <strong class="float-right">
                      {{
                      data.item.watchHours
                        ? parseInt((data.item.watchHours).difference)
                        : "Connect Youtube Account"
                      }}
                    </strong>
                    <span class="float-right" v-if="data.item.watchHours">
                      {{
                        parseInt((data.item.watchHours).difference)
                      }}
                    </span>
                    <span class="float-right" v-else>
                        <a @click="setChannelId" href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=361826808639-186mlkgug50ddrn9tv2dllomdf0guhtt.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fveefly.com%2Fdashboard%2Fmonetization%2Fgoogle-callback%2Fwelcome&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyt-analytics.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyt-analytics-monetary.readonly%20email%20profile&prompt=consent&include_granted_scopes=true&flowName=GeneralOAuthFlow">Connect YouTube Account</a>
                    </span>
                  </p>
                </div>
                <div class="mt-2" v-if="!data.item.is_payed">
                  <b-button
                    class="float-right d-none d-md-block"
                    variant="primary"
                    :to="{ name: 'package-payment', params: { id: data.item.id } }"
                  >
                    Pay Now
                  </b-button>
                  <b-button
                    class="float-right d-md-none"
                    block
                    variant="primary"
                    :to="{ name: 'package-payment', params: { id: data.item.id } }"
                  >
                    Pay Now
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </b-modal> -->
        <!-- End Preview Modal  -->
      </template>
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
            :total-rows="totalPackages"
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
  // Pending for Production
  // BMedia,
  // BImg,
  // BMediaAside,
  // BMediaBody,
  // BFormGroup,
  // BForm,
  // BAlert,
  // BSpinner,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import axios from "@axios";
import useCampaignsList from "./useCampaignsList";
import campaignStoreModule from "./campaignStoreModule";
import PhoneAlert from "@/components/PhoneAlert";
// import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
// import Ripple from "vue-ripple-directive";
// import { BFormRadioGroup } from 'bootstrap-vue';
// import { kFormatter } from "@core/utils/filter";
// import moment from 'moment';
// Pending for Production

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
    PhoneAlert,
    // BMedia,
    // BImg,
    // BMediaAside,
    // BMediaBody,
    // BFormGroup,
    // BForm,
    // BFormRadioGroup,
    // BAlert,
    // BSpinner,
    // Pending for Production
  },
  directives: {
    // Ripple, Pending for Production
    "b-tooltip": VBTooltip,
  },
  // data() {
  //   return {
  //     checkDate: {},
  //     date2: {},
  //     result: [],
  //     selectedPackage: {id: 1, amount: 499},
  //     optionPackage: [
  //       { value: {id: 1, amount: 499}, text: '$499' },
  //       { value: {id: 2, amount: 999}, text: '$999' },
  //       { value: {id: 3, amount: 1499}, text: '$1499' },
  //       { value: {id: 4, amount: 1999}, text: '$1999' },
  //       { value: {id: 5, amount: 2499}, text: '$2499' },
  //     ],
  //     newPackage: [
        
  //     ],
  //     hide: {},
  //     checkAmount: 2499,
  //     loading: false,
  //     campaign: {
  //       id: null,
  //       amount: 499,
  //       channel_id: null,
  //       package_name: "silverplay",
  //       channel_options: {
  //         url: null,
  //         channelId: null,
  //         channelTitle: null,
  //         src: null,
  //         subs: null,
  //       },
  //       options: {
  //          minViews: 60000, 
  //          maxViews: 80000, 
  //          minSubs: 1600, 
  //          maxSubs: 2400,
  //          notes: null, 
  //          subsProgress: 0, 
  //          estimatedMonths: 50,
  //       }
  //     },
  //     baseValues:{
  //          minViews:60000, 
  //          maxViews: 80000, 
  //          minSubs: 1600, 
  //          maxSubs: 2400  
  //     },
  //   };
  // },

  // watch: {
  //   selectedPackage: function() {
  //     this.campaign.amount = this.selectedPackage.amount;
  //     this.campaign.options.minViews = this.baseValues.minViews * this.selectedPackage.id;
  //     this.campaign.options.maxViews = this.baseValues.maxViews * this.selectedPackage.id;
  //     this.campaign.options.minSubs = this.baseValues.minSubs * this.selectedPackage.id;
  //     this.campaign.options.maxSubs = this.baseValues.maxSubs * this.selectedPackage.id;
  //     this.calculateMonths()
  //   },
  // },
  // mounted() {
  //   // this.checkDate = moment(new Date().setDate(new Date().getDate() + 30)).format('YYYY-MM-DD');
  //   this.checkDate = moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD');
  //   // console.log(this.checkDate);
  // },
  // Pending for Production
  methods: {
    // Pending for Production
    // kFormatter,
    // checkPackage(amount){
    //   this.hide = true
    //   this.result = this.optionPackage.filter(optionPackages => optionPackages.value.amount > amount);
    //   if(amount <= 1999) {
    //   this.selectedPackage = this.result[0].value;
    //   }
    // },
    // dueDate(data) {
    //   this.date = data.created_at;
    //   this.date2 = moment(this.date).add(37, 'd').format('YYYY-MM-DD');
    // },
    // continuePackage(packageDetails){
    //   this.loading = true;
    //   this.getChannel(packageDetails.channel_id)
    //   this.campaign.id = packageDetails.id;
    //   this.channelId = packageDetails.channel_id;
    //   this.campaign.amount = packageDetails.amount;
    //   this.campaign.package_name = packageDetails.package_name;
    // },
    // changePackage(packageDetails){
    //   this.loading = true;
    //   this.getChannel(packageDetails.channel_id)
    // },
    // createPackage() {
    //   this.loading = true;
    //   axios
    //     .post("/package-campaigns", this.campaign)
    //     .then((data) => {
    //       this.campaign.id = data.data.data.id;
    //       setTimeout(
    //         () => this.redirect(data),
    //         1200
    //       );
    //     })
    //     .catch((err) => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         props: {
    //           title: err.response.data.message,
    //           icon: "AlertTriangleIcon",
    //           variant: "danger",
    //         },
    //       });
    //       this.loading = false;
    //     });
    // },
    // redirect(data) {
    //   this.$router.push({
    //     name: "package-payment",
    //     params: { id: data.data.data.id },
    //   });
    //   this.loading = false;
    // },
    // getChannel(channelId) {
    //   const params = { params: { id: channelId } };

    //   axios
    //     .get("/video/getChannelVideos", params)
    //     .then((data) => {
    //       this.campaign.channel_id = data.data.data.results[0].snippet.channelId;
    //       this.campaign.channel_options.channelId = data.data.data.results[0].snippet.channelId;
    //       this.campaign.channel_options.channelTitle = data.data.data.results[0].snippet.channelTitle;
    //       this.campaign.channel_options.src = data.data.data.channelinfo[0].snippet.thumbnails.medium.url;
    //       this.campaign.channel_options.subs = data.data.data.statistics.subscriberCount;
    //       this.calculateProgress();
    //       this.createPackage();
    //     })
    //     .catch((err) => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         props: {
    //           title: err.response.data.message,
    //           icon: "AlertTriangleIcon",
    //           variant: "danger",
    //         },
    //       });
    //       this.errorMessage = 'Use Another Channel Link';
    //     });
    // },
    // calculateProgress(){
    //     this.campaign.options.subsProgress = this.campaign.channel_options.subs / 100000 * 100;
    //     if(this.campaign.options.subsProgress >= 100) {
    //         this.campaign.options.subsProgress = 100;
    //     }
    //     else{
    //         this.calculateMonths()
    //     }
    // },
    // calculateMonths(){
    //     this.campaign.options.estimatedMonths = Math.ceil((100000 - this.campaign.channel_options.subs) / ((this.baseValues.minSubs + this.baseValues.maxSubs)*this.selectedPackage.id / 2))
    // },
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
            .delete(`/campaigns/${id}`)
            .then((data) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: `Your Campaign ID ${id} has been deleted.`,
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
    setChannelId(channelId){
      localStorage.setItem('channelId', channelId);
    },
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
      fetchPackages,
      tableColumns,
      perPage,
      currentPage,
      totalPackages,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      resolvePaymentStatusVariant,
      statusFilter,
      refetchData,
      resolveInvoiceStatusVariant,
      resolveJson,
    } = useCampaignsList();
    // console.log("pacl",fetchPackages);
    return {
      fetchPackages,
      tableColumns,
      perPage,
      currentPage,
      totalPackages,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      resolvePaymentStatusVariant,
      statusFilter,
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
// Pending for Production
// .vl {
//   border-left: 1.7px solid #5a44dc;
//   height: 120px;
// }
// .spacer {
//   margin-top: 0.4rem;
// }
// .paddingb {
//   margin-bottom: 1.5rem;
// }
// .toCapitalFirst {
//   text-transform: capitalize;
// }
// .headcolor {
//   color: #5a44dc;
// }
// .mbot{
//   margin-bottom: -24px;
// }
// .mtop{
//   margin-bottom: 4px !important;
// }
// .bbag {
//     background-color: #e5e2f5 !important;
// }
</style>
