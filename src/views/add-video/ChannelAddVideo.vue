<template>
<div>
  <!-- for desktop -->
  <div class="desktopresponsive" v-if="device == 'desktop'">
    <div>
    <div v-if="showLoader" class="jumping-dots-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <b-row v-else>
      <!-- Steps start-->
        <!--       <div class="row stepsmain1 w-100 stepshide">
        <b-col>
          <feather-icon class="checkicon1 custom-size1" icon="CheckIcon" />
          <b-button
            variant="primary"
            class="btn-primary steps1 shadow-lg"
            style="cursor: default"
          ></b-button>
          <span class="steptext1 text-s1">Paste Channel link</span>

          <div v-if="gender" class="line-s"></div>
          <div v-else class="line-s"></div>
        </b-col>

        <b-col class="video_selection">
          <div v-if="gender">
            <feather-icon class="checkicon1 custom-size1" icon="CheckIcon" />
            <b-button
              variant="primary"
              class="btn-primary steps1 shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptext1 text-s2">Video selection</span>
            <div class="line2-s"></div>
          </div>
          <div v-else>
            <feather-icon class="checkicon1 custom-size1" icon="CheckIcon" />
            <b-button
              class="btn-primary steps1 shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptextgray1 text-s2">Video selection</span>
            <div class="line2-s"></div>
          </div>
        </b-col>

        <b-col class="set_audience">
          <div>
            <feather-icon class="checkicon1 custom-size1" icon="CheckIcon" />
            <b-button
              class="btn-primary steps1 shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptextgray1 text-s3">Set Audience & Interest</span>
            <div class="line3-s"></div>
          </div>
        </b-col>

        <b-col class="startpromotion-s">
          <div>
            <feather-icon class="checkicon1 custom-size1" icon="CheckIcon" />
            <b-button
              class="btn-primary steps1 shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptextgray1 text-s4">Start Promotion</span>
          </div>
        </b-col>
      </div> -->
      <!-- Steps end-->
      <b-col class="position-fixed w-25 w-32 leftsection">
        <b-skeleton-wrapper :loading="skeletonLoading">
          <template #loading>
            <b-card no-body>
              <div class="bg-light-primary rounded-top text-center">
                <b-skeleton-img aspect="12:9"></b-skeleton-img>
              </div>
              <b-card-body>
                <b-card-title class="text-center">
                  <b-skeleton width="100%"></b-skeleton>
                  <b-skeleton width="100%"></b-skeleton>
                </b-card-title>
                <div class="bg-gradient-primary rounded text-center">
                  <b-skeleton-img aspect="59:25"></b-skeleton-img>
                </div>
              </b-card-body>
            </b-card>
          </template>
          <!-- ------------------------------------------------------------------------------------ -->
          <b-card
            v-if="channel"
            class="channelcard p-2 shadow-lg bg-white"
            no-body
          >
            <div class="channel-name-card">
              <b-img
                class="mw-100 rounded-circle shadow-4-strong channelimg"
                :src="channel ? channel.snippet.thumbnails.medium.url : ''"
                alt="Video thumbnail"
              />
              <div class="videolisttitle">
                <div class="videolisttitle1">Channel Promotion</div>
                <div class="videolisttitle2">
                  <b>{{ channel.snippet.channelTitle }}</b>
                </div>
              </div>
            </div>
          </b-card>
          <!-- --------------------------------------------------------------------------- -->

          <!-- --------------------------------------------------------------------------- -->

          <div v-if="videoData && videoData.length >= 1">
            <b-card
              class="mulvideocard overflow-auto scrollbar shadow-lg bg-white"
              no-body
            >
              <div
                class="scrollheight border-bottom"
                v-for="(video, index) in campaignOptions"
                :key="index"
              >
                <b-img
                  class="mw-100 m-1 channelvideocardimg"
                  :src="video.src"
                  alt="Video thumbnail"
                />
                <div class="title-and-cross-wrapper">
                  <div>
                    <span class="channelvideolisttitle">
                      {{ video.title.substr(0, 40)
                      }}<span v-if="video.title.length > 40">...</span>
                    </span>
                  </div>
                  <div v-if="campaignOptions && campaignOptions.length !== 1">
                    <feather-icon
                      size="29"
                      class="text-dark cross-icon"
                      style="color: red"
                      icon="XIcon"
                      @click="removeVideo(index)"
                    />
                  </div>
                </div>
              </div>
            </b-card>
          </div>
          <!-- --------------------------------------------------------------------------- -->

          <!--   <b-card v-if="videoData.length === 1" class="videocard shadow-lg bg-white" no-body>
          <b-img
            class="mw-100 videocardimg"
            :src="videoData ? videoData[0].snippet.thumbnails.maxres.url : ''"
            alt="Video thumbnail"
          />
          <b-card-body >
            <div
              v-b-popover.hover.top="videoData[0].snippet.title"
              class="titlecard font-weight-bold"
            >
              {{ videoData[0].snippet.title.substr(0, 40)
              }}<span v-if="videoData[0].snippet.title.length > 40">...</span>
            </div>
            <div class="ml-n1 channeltitlecard font-weight-bold">
              <div>
                <span class="">
                  <b-img
                    :src="require('@/assets/images/icons/youtube.png')"
                    alt="logo"
                    height="54px"
                  />
                  {{ campaign.options.channelTitle }}
                </span>
              </div>
            </div>
          </b-card-body>
        </b-card> -->
          <b-card
            class="pt-1 videoCardApproxViews text-center shadow-lg"
          >
            <div class="titlecard">Estimated View Count</div>
            <div class="mt-1">
              <div v-if="viewsMin && viewsMax" class="d-inline mr-25 titlecard">
                <h2 class="titlecard" style="font-size: 30px">
                  {{ viewsMin }} -
                  {{ viewsMax }}
                </h2>
              </div>

              <h2
                v-else
                style="font-size: 30px"
                class="d-inline mr-25 titlecard"
              >
                0
              </h2>
            </div>
            <b-card
              v-if="showPromocodeStatusBox && promoCodeDetails && promoCodeDetails.status"
              class="promocodecard text-center shadow-lg bg-white mt-2"
            >
              <div
                v-if="promoCodeDetails && promoCodeDetails.status"
                class="text-center"
              >
                <div class="main-container">
                  <div class="check-container">
                    <div class="check-background">
                      <svg
                        viewBox="0 0 65 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 25L27.3077 44L58.5 7"
                          stroke="white"
                          stroke-width="13"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="check-shadow"></div>
                  </div>
                </div>

                <small class="text-success d-inline"
                  >{{ promoCode }} Applied successfully.</small
                >
                <small
                  v-if="
                    promoCodeDetails.calc_amount || !promoCodeDetails.views_proc
                  "
                  class="text-success d-inline"
                  >You will be charged
                  <span style="font-size: 14px"
                    ><b>${{ promoCodeDetails.calc_amount }}</b></span
                  >
                  for this Campaign.</small
                >
                <small
                  v-if="!promoCodeDetails.calc_amount"
                  class="text-success d-inline"
                  >You will get extra
                  <span style="font-size: 14px"
                    ><b
                      >{{
                        viewsMinPromo
                      }}
                      -
                      {{
                        viewsMaxPromo
                      }}</b
                    ></span
                  >
                  views for this Campaign.</small
                >
              </div>
            </b-card>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>

      <!-- <div class="w-100 mt-n3">
        <b-skeleton-wrapper :loading="skeletonLoading">
          <template #loading>
            <b-card style="z-index: 996" class="w-100 position-fixed">
              <b-row>
                <b-col cols="4">
                  <div class="bg-light-primary text-center">
                    <b-skeleton-img aspect="12:9"></b-skeleton-img>
                  </div>
                </b-col>
                <b-col cols="8" class="pl-0">
                  <b-card-title class="mb-0">
                    <b-skeleton width="100%"></b-skeleton>
                    <b-skeleton width="100%"></b-skeleton>
                    <b-skeleton width="60%"></b-skeleton>
                  </b-card-title>
                </b-col>
              </b-row>
              <div class="bg-gradient-primary rounded text-center">
                <b-skeleton-img aspect="8:1"></b-skeleton-img>
              </div>
            </b-card>
          </template>
          <b-card v-if="videoData" style="z-index: 996" class="position-fixed">
            <b-row class="mb-1">
              <b-col cols="4">
                <div class="bg-light-primary text-center">
                  <b-img
                    class="mw-100"
                    :src="
                      videoData
                        ? channel
                          ? channel.snippet.thumbnails.medium.url
                          : videoData[0].snippet.thumbnails.high.url
                        : ''
                    "
                    alt="Video Thumbnail"
                  />
                </div>
              </b-col>
              <b-col cols="8" class="p-0">
                <b-card-title class="mb-0">
                  {{ videoData[0].snippet.title.substr(0, 60)
                  }}<span v-if="videoData[0].snippet.title.length > 60"
                    >...</span
                  >
                </b-card-title>
              </b-col>
            </b-row>
            <div class="bg-gradient-primary rounded text-center">
              <b-badge
                style="color: #fff; font-size: 10px"
                variant="dark-primary"
                pill
              >
                Approx Views
              </b-badge>
              <div>
                <h2
                  v-if="viewsMin && viewsMax"
                  style="color: #fff; font-size: 15px"
                  class="d-inline mr-25"
                >
                  {{ viewsMin }} -
                  {{ viewsMax }}
                </h2>
                <h2
                  v-else
                  style="color: #fff; font-size: 30px"
                  class="d-inline mr-25"
                >
                  0
                </h2>
              </div>
            </div>
          </b-card>
        </b-skeleton-wrapper>
      </div> -->

      <b-col offset-md="4" md="8">
        <!-- slider section start -->
        <div class="mb-2 mobileslider">
          <hr />
          <div class="row">
            <b-col cols="9">
              <h6 class="mt-1 enterbudget">Enter your Budget</h6>
            </b-col>
            <b-col cols="3" class="mobilebudget">
              <validation-provider
                :rules="
                  'required|min_value: ' +
                  (campaignOptions
                    ? campaignOptions.length *
                      parseInt(settings.minimal_channel_budget)
                    : 0) +
                  ' |integer'
                "
                v-slot="{ errors }"
                name="budget"
              >
                <div class="d-flex">
                  <b-form-input
                    class="inputbudget mobileinputbudget budgetborder "
                    :state="errors.length > 0 ? false : null"
                    v-model="campaign.amount"
                    type="number"
                    @keydown="filterKey"
                    @wheel.prevent
                  />
                  <div class="youtube mobileyoutube">
                    <feather-icon icon="DollarSignIcon" size="21" />
                  </div>
                </div>
                <div class="mt-1">
                  <small v-if="errors.length > 0" class="text-danger">{{
                  errors[0]
                }}</small>
                </div>
              </validation-provider>
            </b-col>
          </div>
          <vue-slider
            class="mt-2"
            v-model="campaign.amount"
            :direction="direction"
            :min="
              campaign.vid
                ? campaign.vid.length *
                  parseInt(settings.minimal_channel_budget)
                : 0
            "
            :max="maxBudget"
            :dot-size="30"
            :marks="budgetMarkers"
            :height="12"
            tooltip="always"
            :class="
              (
                campaignOptions
                  ? campaignOptions.length *
                      parseInt(settings.minimal_channel_budget) >
                    campaign.amount
                  : 0
              )
                ? 'vue-slider-danger'
                : null
            "
          />
          <!--    <b-alert
          class="mt-3 alertoffersection"
          variant="danger"
          v-if="campaign.amount < parseInt(settings.step1)"
          show
        >
          <div class="alert-body alertoffer">
            <span
              >Spend
              <strong>${{ parseInt(settings.step1) - campaign.amount }}</strong>
              more and get
              <strong
                >{{ settings.percents_step1 }}% more views for FREE!</strong
              >
              <b-button
                class="ml-50 btn-sm acceptofferbutton shadow-lg bg-white"
                href="#"
                variant="light"
                @click="campaign.amount = parseInt(settings.step1)"
                >Accept Offer</b-button
              ></span
            >
          </div>
        </b-alert> -->
          <!--     <b-alert
          class="mt-3 alertoffersection"
          variant="warning"
          v-else-if="campaign.amount < parseInt(settings.step2)"
          show
        >
          <div class="alert-body">
            <div class="row">
              <b-col cols="10">
                <span
                  >You're getting between
                  <strong
                    >{{ viewsMinDif }} and {{ viewsMaxDif }} extra views</strong
                  >
                  towards your campaign, but Spend
                  <strong
                    >${{ parseInt(settings.step2) - campaign.amount }}</strong
                  >
                  more and get
                  <strong
                    >{{ settings.percents_step2 }}% more views for FREE!</strong
                  >
                </span>
              </b-col>
              <b-col class="mobileoffer" cols="2">
                <b-button
                  class="ml-50 btn-sm acceptofferbutton shadow-lg bg-white"
                  variant="light"
                  href="#"
                  @click="campaign.amount = parseInt(settings.step2)"
                  >Accept Offer</b-button
                >
              </b-col>
            </div>
          </div>
        </b-alert> -->
          <!--    <b-alert class="mt-3 alertoffersection" variant="success" v-else show>
          <div class="alert-body">
            <span
              >Congratulations, you're getting between
              <strong
                >{{ viewsMinDif }} and {{ viewsMaxDif }} extra views</strong
              >
              towards your campaign!</span
            >
          </div>
        </b-alert> -->
        </div>
        <hr />
        <!-- slider -->

        <!-- promocode start -->

        <div class="mt-4">
          <validation-observer ref="applyPromoCodeForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="applyPromoCode">
              <!-- email -->
              <div class="input-with-button">
                <validation-provider
                  #default="{ errors }"
                  name="Promocode"
                  rules="min:4"
                  class="w-100"
                >
                  <div class="d-flex">
                    <b-form-input
                      class="vedioList-input-button"
                      v-model="promoCode"
                      :state="errors.length > 0 ? false : null"
                      placeholder="%  Apply Promocode"
                    />
                  </div>
                  <div class="promocodewarn">
                    <small class="text-danger">{{ errors[0] }}</small>
                  </div>
                </validation-provider>
                <b-button
                  type="submit"
                  
                  block
                  :disabled="invalid || promoCodeLoading || !promoCode"
                  class="VideoList-button VideoList-submit d-none d-lg-block"
                >
                  <b-spinner v-if="promoCodeLoading" small />
                  <span style="font-size: 18px" v-else>Apply Code</span>
                </b-button>
                <!-- for tablet -->
                <b-button
                  type="submit"
                  :disabled="invalid ||!promoCode"
                  class="VideoList-submit d-none d-lg-none d-md-block my-auto mr-1"
                >
                  <span style="font-size: 20px ;">Apply</span>
                </b-button>
              </div>
              <b-form-group class="pt-5 pb-3" v-if="campaign.amount > 0">
                <div class="overflow-auto scrollbar">
                  <div class="scrollheight mt-1">
                    <span v-if="allPromocodes.length > 0">Top Promocodes:</span>
                    <b-row
                      v-for="item in allPromocodes"
                      :key="item.id"
                      class="mt-1 mb-1 mobcols promo-background"
                    >
                      <b-col
                        
                        md="10"
                        class=" col-sm-8 d-md-flex d-sm-flex align-items-center centerdiv"
                      >
                        <span class="promotext"> {{ item.description }} </span>
                      </b-col>

                      <b-col
                       class=""
                        md="2"
                      >
                        <b-button
                          variant="light"
                          class="btncolor border-0 shadow-lg bg-white float-right"
                          @click="promoCode = item.name"
                        >
                          <span class="buttons" v-if="promoCode == item.name">
                            Applied!
                          </span>
                          <span class="buttons" v-else> {{ item.name }} </span>
                        </b-button>
                      </b-col>
                    </b-row>
                    <span v-if="falsePromocodes.length > 0"
                      >Other Promocodes:</span
                    >
                    <b-row
                      v-for="item in falsePromocodes"
                      :key="item.id"
                      class="mt-1 mobcols promo-background"
                    >
                      <b-col
                        md="10"
                        class="d-md-flex align-items-center centerdiv"
                      >
                        <span class="promotextdanger">
                          {{ item.description }}<br /><small
                            class="text-danger"
                          >
                            Add ${{ item.min_amount - campaign.amount }} more to
                            avail this promocode.
                          </small></span
                        >
                      </b-col>
                      <b-col md="2">
                        <b-button
                          variant="light"
                          class="btncolor border-0 shadow-lg bg-white float-right applypendingd"
                          disabled
                          ><span class="buttons">
                            {{ item.name }}
                          </span></b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-form-group>
              <b-form-group v-else>
                <!-- <span>No Promocodes available!</span> -->
              </b-form-group>
              <!-- submit buttons -->
              <b-row>
                <b-col cols="4" offset="8"> </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </div>
        <!-- promocode end -->

      
        <b-alert variant="primary" class="optionalsetp mt-n4" show>
          <div class="alert-body">
            <span
              >This step is OPTIONAL.
              <strong>Targeting reduces views</strong> of your campaign since it
              targets a certain group of audience who will watch your
              video.</span
            >
          </div>
        </b-alert>
        <label style="color: black; font-size:20px; margin-top:20px"
          >Target by Country

          <feather-icon
            v-b-popover.hover.top="
              'Please select the countries that you want to target.'
            "
            class="text-primary"
            title="Regional Targeting"
            icon="InfoIcon"
          />
        </label>
       <div class="d-flex justify-content-end flex-column-reverse">
        <v-select
          v-model="campaign.options.countries"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          multiple
          label="name"
          placeholder="SELECT COUNTRIES"
          :options="countryOptions"
          class="countryselect"
          :disabled="promoCodeDetails.country_disabled == 1"
          :close-on-select="false" 
        />
          <div class="location">
           <feather-icon size="20" icon="MapPinIcon" />
          </div>
       </div>

        <div v-if="promoCodeDetails.country_disabled == 1" class="mt-1 text-danger">
          <span style="font-size: 13px; margin-left: 4px;"
            >Country targeting is not available on {{ promoCodeDetails.name }} promocode!</span
          >
        </div>
        <!-- slider section end -->
        <!-- <div style="height: 150px" class="d-md-none" /> -->
        <!-- readonly input -->
        <validation-observer #default="{ invalid }">
          <b-form @submit.prevent="createCampaign">
            <!--      <b-form-group
            class="mt-4"
            label="Your YouTube Video URL"
            label-for="readOnlyInput"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="campaign.options.url"
              readonly
            />
            <b-link :to="{ name: 'video-list' }">
              <small>or Promote Another YouTube Video?</small>
            </b-link>
          </b-form-group> -->

            <hr class="my-3" />

            <!-- input -->

            <!------------------------------------------------------------------------------------------>
            <div class="mt-n1">
              <b-form-checkbox
                v-model="selected"
                name="option1"
                class="custom-control-primary mt-2"
                :disabled="promoCodeDetails.advance_disabled == 1"
              >
                <span class="checkboxhead"
                  >Automatically add the most relevant targeting for your
                  channel</span
                >
              </b-form-checkbox>
            </div>
            <div v-if="promoCodeDetails.advance_disabled  == 1" class="mt-1 text-danger">
              <feather-icon
                size="14"
                icon="AlertCircleIcon"
              />
              <span style="font-size: 13px; margin-left: 4px;"
                >Advanced targeting is not available on {{ promoCodeDetails.name }} promocode!</span
              >
            </div>
            <div class="mt-1">
              <span style="font-size: 17px"
                >Deselect this checkbox to unveil advanced targeting
                options.</span
              >
            </div>

            <b-modal
              ref="modal-preview1"
              modal-class="modal-primary"
              centered
              hide-footer
              hide-header
              size="md"
              class="modaltargetting"
              no-close-on-backdrop
            >
              <div class="modaltargetinner">
                <h3 style="color: black" class="font-weight-bolder">
                  VeeFly strongly advises to set advertising campaign to
                  automatic targeting.
                </h3>
                <!--    <ul>
              <li>
                <feather-icon class="checkicon custom-size" icon="CheckIcon" />
                Automatic Targeting will utilize the YouTube Ads Algorithm to
                display your videos in the recommended list, specifically to
                viewers from your chosen countries who have shown interest in
                similar content.
              </li>
              <li>
                Typically, automatic targeting yields the best outcomes in terms
                of interactions and subscribers, while also attracting more
                views than manual targeting.
              </li>
             </ul> -->

                <div class="d-flex mt-2">
                  <div class="mr-1">
                    <feather-icon
                      class="text-primary size-13"
                      size="20"
                      icon="CheckIcon"
                    />
                  </div>
                  <div>
                    <p>
                      Automatic Targeting will utilize the YouTube Ads Algorithm
                      to display your videos in the recommended list,
                      specifically to viewers from your chosen countries who
                      have shown interest in similar content.
                    </p>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="mr-1">
                    <feather-icon
                      class="text-primary font-weight-bold"
                      size="20"
                      icon="CheckIcon"
                    />
                  </div>
                  <div>
                    <p>
                      Typically, automatic targeting yields the best outcomes in
                      terms of interactions and subscribers, while also
                      attracting more views than manual targeting.
                    </p>
                  </div>
                </div>
                <div class="row mt-2">
                  <b-col cols="6" class="d-flex justify-content-center">
                    <b-button
                      style="width: 200px"
                      class="align-items-center selectmanually"
                      @click="selectManually()"
                      ><span style="color: rgb(155, 81, 224); font-weight: bold"
                        >Select Manually</span
                      ></b-button
                    >
                  </b-col>
                  <b-col cols="6" class="d-flex justify-content-center">
                    <b-button
                      style="width: 200px"
                      class="bg-gradient-primary previewad"
                      @click="selectAutomatic()"
                    >
                      <span style="font-weight: bold">Keep Automatic</span>
                    </b-button>
                  </b-col>
                </div>
              </div>
              <!-- Modal content goes here -->
            </b-modal>

            <div class="my-0" v-if="selectmanullay">
              <span class="headingcheck"> Select your audience type </span>
              <div class="mt-3">
                <span
                  class="mr-1"
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Gender:</span
                >
              </div>
              <div>
                <b-form-radio-group
                  v-model="campaign.options.gender"
                  :options="gender"
                  class="demo-inline-spacing mb-1 d-md-inline"
                />
              </div>
              <div class="mt-2">
                <span
                  class="mr-1"
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Age:</span
                >
              </div>
              <div class="mt-2">
                <b-form-checkbox
                  v-model="allage"
                  v-for="i in allag"
                  :key="i.value"
                  :value="i.value"
                  @change="selectAllAge"
                  inline
                >
                  {{ i.text }}
                </b-form-checkbox>
                <b-form-checkbox
                  v-for="i in age"
                  :key="i.value"
                  v-model="campaign.options.agegroup"
                  :value="i.value"
                  @change="selectAge"
                  inline
                >
                  {{ i.text }}
                </b-form-checkbox>
              </div>
              <span class="headingcheck"
                >Select your interest related to this video</span
              >
              <div class="mt-3">
                <span
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Interests:</span
                >
              </div>
              <div class="mt-2">
                <div class="itable">
                  <b-form-checkbox
                    v-model="allinterest"
                    v-for="i in allint"
                    :key="i.value"
                    :value="i.value"
                    @change="selectAll"
                  >
                    {{ i.text }}
                  </b-form-checkbox>
                  <b-form-checkbox
                    v-for="i in interest"
                    :key="i.value"
                    v-model="topic"
                    :value="i"
                    @change="selectInterest"
                  >
                    {{ i.text }}
                  </b-form-checkbox>
                </div>
              </div>
            </div>

            <!--           <div v-if="selected == 'advanced'">
            <label v-if="campaign.options.song_brand == 1" class="mt-4"
              >Describe your Video using Keywords and Phrases.
              <b-badge
                class="ml-50"
                variant="primary"
                href="#"
                @click="addTags()"
                >Add Keywords from Video</b-badge
              >
              <feather-icon
                v-b-popover.hover.focus.top="
                  'If someone were to search for your video, which keywords/phrases should the video show for? The more descriptive the better; avoid broad keywords. Use spaces for words (example: video game, online tutorial, how to shave my beard etc.). Separate each keyword with ``ENTER`` on your keyboard. You may also enter names of similar channels.'
                "
                class="ml-50 text-primary"
                title="Keywords Tips"
                icon="InfoIcon"
            /></label>
            <b-form-tags
              v-if="campaign.options.song_brand == 1"
              v-model="campaign.options.user_tags"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              input-id="tags-remove-on-delete"
              :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
              separator=" "
              :tag-validator="tagValidator"
              placeholder="Enter new tags separated by Enter or Spacebar"
              remove-on-delete
              class="mb-2"
            />
          </div> -->

            <hr class="mt-2 mb-4" />
            <label style="color: black ;font-size: 20px;font-weight: 600;">What do you want besides views?</label>
            <b-button-toolbar class="w-100 d-md-none d-lg-block">
              <b-form-radio-group
                v-model="campaign.options.goal"
                buttons
                button-variant="outline-primary"
                class="w-100 besides"
                label="text"
                :options="goalOptions"
                value-field="goal"
              />
            </b-button-toolbar>

            <v-select
              v-model="campaign.options.goal"
              class="d-md-block  d-lg-none border-4"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="text"
              :options="goalOptions"
              :reduce="(goalOptions) => goalOptions.goal"
              append-to-body
              :calculate-position="withPopper"
            />
            <b-input-group
              v-if="campaign.options.goal == 'website'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Your Website Link"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Please paste your website`s URL. And we will show it as button in your AD.'
                  "
                  title="Website Traffic"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <b-input-group
              v-if="campaign.options.goal == 'page'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Your Social Media Link"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Here you can add your Social Media Profile or Page, such as: Facebook, Instagram, TikTok, Twitter etc. We will urge people to Subscribe, Follow or Like.'
                  "
                  title="Social Media Fans"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <b-input-group
              v-if="campaign.options.goal == 'app'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Application Link from Google PlayStore or Apple Store"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Paste your link of your Application from Google Play or Apple Store. We will show a button in your AD to the place of your choice.'
                  "
                  title="Application Installs"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
            <!------------------------------------------------------------------------------------------>
            <!--   <hr class="my-3" /> -->
            <!--   <label
            >What is Your Video Content?
            <feather-icon
              v-b-popover.hover.top="
                'If you are going to promote a music video, please choose Music Video. For everything else use the Regular Video button.'
              "
              class="text-primary"
              title="Video Type"
              icon="InfoIcon"
            />
          </label> -->
            <!--    <b-button-toolbar class="w-100">
            <b-form-radio-group
              v-model="campaign.options.song_brand"
              buttons
              button-variant="outline-primary"
              class="w-100"
              :options="videoTypeOptions"
            />
          </b-button-toolbar> -->

            <!-- <label v-if="campaign.options.song_brand == 2" class="mt-4"
            >Enter Genre Name, Artists or Bands that are relatable to your
            music.
            <b-badge class="ml-50" variant="primary" href="#" @click="addTags()"
              >Add Keywords from Video</b-badge
            >
            <feather-icon
              v-b-popover.hover.focus.top="
                'Add the genre which describes best your type of music in your video. If you are promoting a song or a band, list at least 3 artists that are most similar to your style of music. We will find the people who are like those artists.'
              "
              class="ml-50 text-primary"
              title="Music Video"
              icon="InfoIcon"
            />
          </label>
          <b-form-tags
            v-if="campaign.options.song_brand == 2"
            v-model="campaign.options.user_tags"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            input-id="tags-remove-on-delete"
            :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
            separator=" "
            :tag-validator="tagValidator"
            placeholder="Enter new Artist or Band separated by Enter or Spacebar"
            remove-on-delete
          /> -->
            <hr class="my-1" />

            <!-- modal promocode button -->
            <!-- <div class="text-center">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              v-b-modal.modal-promocode
              variant="flat-primary"
            >
              Apply PromoCode
            </b-button>
          </div> -->

            <div class="row">
              <b-col class="col-sm-12 col-xl-6 col-12">
                <b-button
                  v-b-modal.modal-preview
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  size="lg"
                  variant="outline-primary"
                  class="mt-1 previewad1 border-0"
                >
                  <span class="align-middle">Preview Campaign</span>
                </b-button>

                <b-modal
                  id="modal-preview"
                  modal-class="modal-primary"
                  centered
                  hide-footer
                > 
                  <h4 class="mx-1 mb-0 preview-title text-center">How will your Ad look like?</h4>
                  <AdPreview
                    :title="campaign.options.title"
                    :views="campaign.options.view_count"
                    :img="campaign.options.src"
                    :channelTitle="campaign.options.channelTitle"
                  />
                </b-modal>
              </b-col>
              <b-col class="col-sm-12 col-xl-6 col-12"
                ><!-- <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                size="lg"
                block
                :disabled="loading || invalid"
                class="mt-1 bg-gradient-primary previewad"
                type="submit"
                v-if="videoData.length <= 1"
              >
                <span v-if="loading">
                  <span class="mr-1">Creating</span>
                  <b-spinner style="width: 2rem; height: 2rem" />
                </span>
                <span v-else
                  ><span>Create Campaign</span>
                  <feather-icon
                    style="width: 1.5rem; height: 1.5rem"
                    icon="ArrowUpRightIcon"
                    class="ml-50"
                /></span>
              </b-button> -->
                <b-button
                  id="DashChannelPromoteChannelBtn"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="lg"
                  block
                  :disabled="loading || invalid"
                  class="mt-1 bg-gradient-primary previewad"
                  type="submit"
                >
                  <span v-if="loading">
                    <span class="mr-1">Creating</span>
                    <b-spinner style="width: 2rem; height: 2rem" />
                  </span>
                  <span v-else
                    ><span>Promote Channel</span>
                    <feather-icon
                      style="width: 1.5rem; height: 1.5rem"
                      icon="ArrowUpRightIcon"
                      class="ml-50"
                  /></span>
                </b-button>
              </b-col>
            </div>
          </b-form>
        </validation-observer>
        <b-modal
          id="modal-promocode"
          ref="modal-promocode"
          centered
          hide-footer
          title="Apply PromoCode"
        >
          <validation-observer ref="applyPromoCodeForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="applyPromoCode">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Promocode"
                  rules="required|min:4"
                >
                  <b-form-input
                    v-model="promoCode"
                    :state="errors.length > 0 ? false : null"
                    placeholder="VEEFLY50"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group v-if="campaign.amount > 0">
                <div class="overflow-auto scrollbar">
                  <div class="scrollheight">
                    <span>Top Promocodes:</span>
                    <b-row
                      v-for="item in allPromocodes"
                      :key="item.id"
                      class="mt-1 mb-1 mobcols promo-background"
                    >
                      <b-col md="3">
                        <b-button
                          variant="primary"
                          class="btncolor"
                          @click="promoCode = item.name"
                        >
                          <span class="buttons" v-if="promoCode == item.name">
                            Applied!
                          </span>
                          <span class="buttons" v-else> {{ item.name }} </span>
                        </b-button>
                      </b-col>
                      <b-col
                        md="9"
                        class="pl-md-0 d-md-flex align-items-center centerdiv"
                      >
                        <span class="promotext"> {{ item.description }} </span>
                      </b-col>
                    </b-row>
                    <span v-if="falsePromocodes.length > 0"
                      >Other Promocodes:</span
                    >
                    <b-row
                      v-for="item in falsePromocodes"
                      :key="item.id"
                      class="mt-1 mobcols promo-background"
                    >
                      <b-col md="3">
                        <b-button variant="primary" class="btncolor" disabled
                          ><span class="buttons">
                            {{ item.name }}
                          </span></b-button
                        >
                      </b-col>
                      <b-col
                        md="9"
                        class="pl-md-0 d-md-flex align-items-center centerdiv"
                      >
                        <span class="promotextdanger">
                          {{ item.description }}<br /><small
                            class="text-danger"
                          >
                            Add ${{ item.min_amount - campaign.amount }} more to
                            avail this promocode.
                          </small></span
                        >
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-form-group>
              <b-form-group v-else>
                <span>No Promocodes available!</span>
              </b-form-group>

              <b-row>
                <b-col cols="4" offset="8">
                  <b-button
                    type="submit"
                    variant="primary"
                    block
                    :disabled="invalid || promoCodeLoading"
                    class="mt-3 float-right"
                  >
                    <b-spinner v-if="promoCodeLoading" small />
                    <span v-else>Apply </span>
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-modal>
      </b-col>
    </b-row>
  </div>
  </div>



  <!-- for mobile -->
  <div v-else class="mobileresponsive">
    <div>
    <div v-if="showLoader" class="jumping-dots-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div v-else>
      <div class="w-100">
        <b-skeleton-wrapper :loading="skeletonLoading">
          <template #loading>
            <b-card style="z-index: 996" class="w-100 position-fixed">
              <b-row>
                <b-col cols="4">
                  <div class="bg-light-primary text-center">
                    <b-skeleton-img aspect="12:9"></b-skeleton-img>
                  </div>
                </b-col>
                <b-col cols="8" class="pl-0">
                  <b-card-title class="mb-0">
                    <b-skeleton width="100%"></b-skeleton>
                    <b-skeleton width="100%"></b-skeleton>
                    <b-skeleton width="60%"></b-skeleton>
                  </b-card-title>
                </b-col>
              </b-row>
              <div class="bg-gradient-primary rounded text-center">
                <b-skeleton-img aspect="8:1"></b-skeleton-img>
              </div>
            </b-card>
          </template>
          <b-card ref="videoEle" v-if="videoData" style="z-index: 996">
            <b-row class="mb-1" style="justify-content: center;">
              <b-col cols="6">
                <div class="text-center">
                  <b-img
                    class="mw-100 rounded-circle"
                    :src="
                      videoData
                        ? channel
                          ? channel.snippet.thumbnails.medium.url
                          : videoData[0].snippet.thumbnails.high.url
                        : ''
                    "
                    alt="Video Thumbnail"
                  />
                </div>
              </b-col>
              <b-col cols="8" class="p-0 justify-content: center;">
                <b-card-title class="mb-0 text-center">
                  <!-- {{ videoData[0].snippet.title.substr(0, 60)
                  }}<span v-if="videoData[0].snippet.title.length > 60"
                    >...</span> -->
                  <div class="videolisttitle2">
                    <div class="d-flex justify-content-center">
                        <div class="d-flex align-items-center">
                          
                          <b><img src="@/assets/images/icons/yt.png"> {{ channel.snippet.channelTitle }}</b>
                        </div>
                      </div>
                    <b>{{ kFormatter(channel.statistics.subscriberCount) }}</b>
                </div>
                </b-card-title>
              </b-col>
            </b-row>
            <div :class="{ 'stuck': isSticky }">
              <div class="bg-gradient-primary  rounded d-flex approx-views justify-content: center;">
                  <img src="@/assets/images/icons/eyeicon.png" class="viewseye my-auto " />
                  <p class="my-auto" style="color: #fff; font-size: 12px; font-weight: 400;">Approx Views</p>
                  <h2 v-if="viewsMin && viewsMax" style="color: #fff; font-size: 12px" class="d-inline mr-25 my-auto ml-1">
                      {{ viewsMin }} -
                      {{ viewsMax }}
                    </h2>
                    <h2 v-else style="color: #fff; font-size: 20px;font-weight: 700; margin-left: 10px;" class="d-inline mr-25 my-auto">
                        0
                    </h2>
              </div>
            </div>
          </b-card>
        </b-skeleton-wrapper>
      </div>

      <div
        class="w-100 "
        v-if="videoData && videoData.length >= 1"
      >
        <b-card
          class="mobilemulvideocard overflow-none bg-transparent shadow-none"
          no-body
          :style="{ height: campaignOptions.length == 1 ? 'auto' : cardHeight, backdropFilter: cardBlur, WebkitMask: cardWebkitMask }"
        >
          <div
            class="p-1 border-bottom"
            v-for="(video, index) in campaignOptions"
            :key="index"
          >
            <b-img
              class="mw-100 mx-1 my-auto channelvideocardimg"
              :src="video.src"
              alt="Video thumbnail"
            />
            <div class="my-auto d-flex">
                <span class="channelvideolisttitle1">
                  {{ video.title.substr(0, 40)
                  }}<span v-if="video.title.length > 40">...</span>
                </span>
              <div v-if="cardButtonAll && campaignOptions && campaignOptions.length !== 1">
                <feather-icon
                  size="29"
                  class="text-dark cross-icon"
                  style="color: red"
                  icon="XIcon"
                  @click="removeVideo(index)"
                />
              </div>
            </div>
          </div>
        </b-card>
        
        <div v-if="campaignOptions.length >=2" class="button-container">
          <p class="togglebtn" @click="toggleHeight" style="color: #9B51E0;"><span v-if="cardButtonAll">Hide</span><span v-else>Show All</span></p>
        </div>
      </div>

      <b-col offset-md="4" md="8">
        
        <!-- slider section start -->
        <div class="mb-2 mobileslider">
          <hr v-if="campaignOptions.length >=2" />
          <validation-provider
                :rules="
                  'required|min_value: ' +
                  (campaignOptions
                    ? campaignOptions.length *
                      parseInt(settings.minimal_channel_budget)
                    : 0) +
                  ' |integer'
                "
                v-slot="{ errors }"
                name="budget"
          >
           <div class="row ">
            <b-col cols="9" class="d-flex align-items-center">
              <h6 class="mt-1 enterbudget"> Enter your Budget</h6>
            </b-col>
            <b-col cols="3" class="mobilebudget">
              
                <div class="d-flex">
                  <b-form-input
                    class="inputbudget mobileinputbudget budgetborder"
                    :state="errors.length > 0 ? false : null"
                    v-model="campaign.amount"
                    type="number"
                    @keydown="filterKey"
                    @wheel.prevent
                  />
                  <div class="youtube mobileyoutube">
                    <feather-icon icon="DollarSignIcon" size="21" />
                  </div>
                </div>
            </b-col>
           </div>
                <div style="text-align: center;" class="mt-1">
                  <small v-if="errors.length > 0" class="text-danger">{{errors[0]}}</small>
                </div>
          </validation-provider>
          <vue-slider
            class="mt-2 px-1"
            v-model="campaign.amount"
            :direction="direction"
            :min="
              campaign.vid
                ? campaign.vid.length *
                  parseInt(settings.minimal_channel_budget)
                : 0
            "
            :max="maxBudget"
            :dot-size="30"
            :marks="budgetMarkers"
            :height="12"
            tooltip="always"
            :class="
              (
                campaignOptions
                  ? campaignOptions.length *
                      parseInt(settings.minimal_channel_budget) >
                    campaign.amount
                  : 0
              )
                ? 'vue-slider-danger'
                : null
            "
          />
          
        </div>
        <hr />
        <!-- slider -->

        <!-- promocode start -->

        <div class="mt-4">
          <p class="mcoupon" style="font-size: 20px;font-weight: 600;">Use Coupon Code</p>
          <validation-observer ref="applyPromoCodeForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="applyPromoCode">
              <!-- email -->
              <div class="d-flex">
                <validation-provider
                  #default="{ errors }"
                  name="Promocode"
                  rules="min:4"
                  class="w-100"
                >
                  <div class="col-12 d-flex p-0">
                    <b-form-input
                      class="vedioList-input-button"
                      v-model="promoCode"
                      :state="errors.length > 0 ? false : null"
                      placeholder="VEEFLY50"
                    />
                  </div>

                    <div class="promocodewarn">
                    <small class="text-danger">{{ errors[0] }}</small>
                    </div>
                  
                </validation-provider>
                <div class="col-3 p-0">
                <b-button
                  type="submit"
                  variant="primary"
                  :disabled="invalid || promoCodeLoading || !promoCode"
                  class="VideoList-button VideoList-submittwo w-100"
                >
                  <b-spinner v-if="promoCodeLoading" small />
                  <span style="font-size: 17px" v-else>Apply</span>
                </b-button>
                </div>
              </div>
              <b-form-group class="pt-2 pb-3" v-if="campaign.amount > 0">
                <div class="overflow-auto scrollbar">
                  <div class="scrollheight mt-1">
                    <span v-if="allPromocodes.length > 0">Top Promocodes:</span>
                    <b-row
                      v-for="item in allPromocodes"
                      :key="item.id"
                      class="mt-1 mb-1 mobcols promo-background"
                    >
                      <b-col 
                        class="d-flex align-items-center centerdiv col-9"
                      >
                        <span class="promotext"> {{ item.description }} </span>
                      </b-col>

                      <b-col
                       class="col-3"
                      >
                        <b-button
                          variant="light"
                          class="btncolor border-0 shadow-lg bg-white float-right"
                          @click="promoCode = item.name"
                        >
                          <span class="buttons" v-if="promoCode == item.name">
                            Applied!
                          </span>
                          <span class="buttons" v-else> {{ item.name }} </span>
                        </b-button>
                      </b-col>
                    </b-row>
                    <span v-if="falsePromocodes.length > 0"
                      >Other Promocodes:</span
                    >
                    <b-row
                      v-for="item in falsePromocodes"
                      :key="item.id"
                      class="mt-1 mobcols promo-background"
                    >
                      <b-col
                        
                        class="d-md-flex align-items-center centerdiv col-9"
                      >
                        <span class="promotextdanger">
                          {{ item.description }}<br /><small
                            class="text-danger"
                          >
                            Add ${{ item.min_amount - campaign.amount }} more to
                            avail this promocode.
                          </small></span
                        >
                      </b-col>
                      <b-col class="col-3">
                        <b-button
                          variant="light"
                          class="btncolor border-0 shadow-lg bg-white float-right applypending"
                          disabled
                          ><span class="buttons">
                            {{ item.name }}
                          </span></b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-form-group>
              <b-form-group v-else>
                <!-- <span>No Promocodes available!</span> -->
              </b-form-group>
              <!-- submit buttons -->
              <b-row>
                <b-col cols="4" offset="8"> </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </div>
        <!-- promocode end -->

      
        <b-alert variant="primary" class="optionalsetp mt-n4" show>
          <div class="alert-body">
            <span
              >This step is OPTIONAL.
              <strong>Targeting reduces views</strong> of your campaign since it
              targets a certain group of audience who will watch your
              video.</span
            >
          </div>
        </b-alert>
        <label style="color: black; font-size:20px; margin-top:20px; font-weight: 600;"
          >Target by Country

          <feather-icon
            v-b-popover.hover.top="
              'Please select the countries that you want to target.'
            "
            class="text-primary"
            title="Regional Targeting"
            icon="InfoIcon"
          />
        </label>
       <div class="d-flex justify-content-end flex-column-reverse">
        <v-select
          v-model="campaign.options.countries"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          multiple
          label="name"
          placeholder="SELECT COUNTRIES"
          :options="countryOptions"
          class="countryselect"
          :disabled="promoCodeDetails.country_disabled == 1"
          :close-on-select="false" 
        />
          <div class="location">
           <feather-icon size="20" icon="MapPinIcon" />
          </div>
       </div>

        <div v-if="promoCodeDetails.country_disabled == 1" class="mt-1 text-danger">
          <span style="font-size: 13px; margin-left: 4px;"
            >Country targeting is not available on {{ promoCodeDetails.name }} promocode!</span
          >
        </div>
        <!-- slider section end -->
        <!-- <div style="height: 150px" class="d-md-none" /> -->
        <!-- readonly input -->
        <validation-observer #default="{ invalid }">
          <b-form @submit.prevent="createCampaign">
            <!--      <b-form-group
            class="mt-4"
            label="Your YouTube Video URL"
            label-for="readOnlyInput"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="campaign.options.url"
              readonly
            />
            <b-link :to="{ name: 'video-list' }">
              <small>or Promote Another YouTube Video?</small>
            </b-link>
          </b-form-group> -->

            <hr class="my-3" />

            <!-- input -->

            <!------------------------------------------------------------------------------------------>
            <div class="mt-n1">
              <b-form-checkbox
                v-model="selected"
                name="option1"
                class="custom-control-primary mt-2"
                :disabled="promoCodeDetails.advance_disabled == 1"
              >
                <span class="checkboxhead" style="font-weight: 600;"
                  >Automatic Targeting</span
                >
              </b-form-checkbox>
              <p style="color: #787878;
                font-size: 14px;font-weight: 500; margin-top: 14px">Automatically add the most relevant targeting for
                        your
                        channel</p>
            </div>
            <div v-if="promoCodeDetails.advance_disabled  == 1" class="mt-1 text-danger">
              <feather-icon
                size="14"
                icon="AlertCircleIcon"
              />
              <span style="font-size: 13px; margin-left: 4px;"
                >Advanced targeting is not available on {{ promoCodeDetails.name }} promocode!</span
              >
            </div>
            <div class="mt-1">
              <span style="font-size: 14px; color: #9B51E0"
                >Deselect this checkbox to unveil advanced targeting
                options.</span
              >
            </div>

            <vue-bottom-sheet-vue2 
              ref="bottom-sheet-preview1"
              modal-class="modal-primary"
              centered
              hide-footer
              hide-header
              size="md"
              class="modaltargetting"
              no-close-on-backdrop
              :can-swipe="false" 
              :overlay-click-close="false"
            >
              <div class="modaltargetinner">
                <h3 style="color: black" class="font-weight-bolder">
                  VeeFly strongly advises to set advertising campaign to
                  automatic targeting.
                </h3>

                <div class="d-flex mt-2">
                  <div class="mr-1">
                    <feather-icon
                      class="text-primary size-13"
                      size="20"
                      icon="CheckIcon"
                    />
                  </div>
                  <div>
                    <p>
                      Automatic Targeting will utilize the YouTube Ads Algorithm
                      to display your videos in the recommended list,
                      specifically to viewers from your chosen countries who
                      have shown interest in similar content.
                    </p>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="mr-1">
                    <feather-icon
                      class="text-primary font-weight-bold"
                      size="20"
                      icon="CheckIcon"
                    />
                  </div>
                  <div>
                    <p>
                      Typically, automatic targeting yields the best outcomes in
                      terms of interactions and subscribers, while also
                      attracting more views than manual targeting.
                    </p>
                  </div>
                </div>
                <div class="row mt-2">
                  <b-col class="d-flex justify-content-center mb-1">
                    <b-button
                      style="width: 250px"
                      class="align-items-center selectmanually"
                      @click="selectManually()"
                      ><span style="color: rgb(155, 81, 224); font-weight: bold"
                        >Select Manually</span
                      ></b-button
                    >
                  </b-col>
                  <b-col class="d-flex justify-content-center">
                    <b-button
                      style="width: 250px"
                      class="bg-gradient-primary previewad"
                      @click="selectAutomatic()"
                    >
                      <span style="font-weight: bold">Keep Automatic</span>
                    </b-button>
                  </b-col>
                </div>
              </div>
              <!-- Modal content goes here -->
            </vue-bottom-sheet-vue2>

            <div class="my-0" v-if="selectmanullay">
              <span class="headingcheck"> Select your audience type </span>
              <div class="mt-3">
                <span
                  class="mr-1"
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Gender:</span
                >
              </div>
              <div>
                <b-form-radio-group
                  v-model="campaign.options.gender"
                  :options="gender"
                  class="demo-inline-spacing mb-1 d-md-inline"
                />
              </div>
              <div class="mt-2">
                <span
                  class="mr-1"
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Age:</span
                >
              </div>
              <div class="mt-2">
                <b-form-checkbox
                  v-model="allage"
                  v-for="i in allag"
                  :key="i.value"
                  :value="i.value"
                  @change="selectAllAge"
                  inline
                >
                  {{ i.text }}
                </b-form-checkbox>
                <b-form-checkbox
                  v-for="i in age"
                  :key="i.value"
                  v-model="campaign.options.agegroup"
                  :value="i.value"
                  @change="selectAge"
                  inline
                >
                  {{ i.text }}
                </b-form-checkbox>
              </div>
              <span class="headingcheck"
                >Select your interest related to this video</span
              >
              <div class="mt-3">
                <span
                  style="
                    color: rgb(34, 29, 29);
                    font-size: 15px;
                    font-weight: 500;
                  "
                  >Interests:</span
                >
              </div>
              <div class="mt-2">
                <div class="itable">
                  <b-form-checkbox
                    v-model="allinterest"
                    v-for="i in allint"
                    :key="i.value"
                    :value="i.value"
                    @change="selectAll"
                  >
                    {{ i.text }}
                  </b-form-checkbox>
                  <b-form-checkbox
                    v-for="i in interest"
                    :key="i.value"
                    v-model="topic"
                    :value="i"
                    @change="selectInterest"
                  >
                    {{ i.text }}
                  </b-form-checkbox>
                </div>
              </div>
            </div>

            <!--           <div v-if="selected == 'advanced'">
            <label v-if="campaign.options.song_brand == 1" class="mt-4"
              >Describe your Video using Keywords and Phrases.
              <b-badge
                class="ml-50"
                variant="primary"
                href="#"
                @click="addTags()"
                >Add Keywords from Video</b-badge
              >
              <feather-icon
                v-b-popover.hover.focus.top="
                  'If someone were to search for your video, which keywords/phrases should the video show for? The more descriptive the better; avoid broad keywords. Use spaces for words (example: video game, online tutorial, how to shave my beard etc.). Separate each keyword with ``ENTER`` on your keyboard. You may also enter names of similar channels.'
                "
                class="ml-50 text-primary"
                title="Keywords Tips"
                icon="InfoIcon"
            /></label>
            <b-form-tags
              v-if="campaign.options.song_brand == 1"
              v-model="campaign.options.user_tags"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              input-id="tags-remove-on-delete"
              :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
              separator=" "
              :tag-validator="tagValidator"
              placeholder="Enter new tags separated by Enter or Spacebar"
              remove-on-delete
              class="mb-2"
            />
          </div> -->
          <!-- describe -->
           <!-- <div v-if="selectmanullay">
                    <label v-if="campaign.options.song_brand == 1" class="mt-4" style="font-size: 18px;">Describe your Video using Keywords
                        and Phrases.
                        <b-badge class="ml-50" variant="primary" href="#" @click="addTags()">Add Keywords from
                            Video</b-badge>
                        <feather-icon v-b-popover.hover.focus.top="
                    'If someone were to search for your video, which keywords/phrases should the video show for? The more descriptive the better; avoid broad keywords. Use spaces for words (example: video game, online tutorial, how to shave my beard etc.). Separate each keyword with ``ENTER`` on your keyboard. You may also enter names of similar channels.'
                  " class="ml-50 text-primary" title="Keywords Tips" icon="InfoIcon" /></label>
                    <b-form-tags v-if="campaign.options.song_brand == 1" v-model="campaign.options.user_tags" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" input-id="tags-remove-on-delete" :input-attrs="{ 'aria-describedby': 'tags-validation-help' }" separator=" " :tag-validator="tagValidator" placeholder="Enter new tags separated by Enter or Spacebar" remove-on-delete class="mb-2 tags_placeholder" />
           </div> -->

            <hr class="mt-2 mb-4" />
            <label style="color: black ;font-size: 20px;font-weight: 600;">What do you want besides views?</label>

            <v-select
              v-model="campaign.options.goal"
              class="border-4"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="text"
              :options="goalOptions"
              :reduce="(goalOptions) => goalOptions.goal"
              append-to-body
              :calculate-position="withPopper"
              true-value="top"
              false-value="bottom"
            />
            <b-input-group
              v-if="campaign.options.goal == 'website'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Your Website Link"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Please paste your website`s URL. And we will show it as button in your AD.'
                  "
                  title="Website Traffic"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <b-input-group
              v-if="campaign.options.goal == 'page'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Your Social Media Link"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Here you can add your Social Media Profile or Page, such as: Facebook, Instagram, TikTok, Twitter etc. We will urge people to Subscribe, Follow or Like.'
                  "
                  title="Social Media Fans"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <b-input-group
              v-if="campaign.options.goal == 'app'"
              class="input-group-merge mt-2"
            >
              <b-form-input
                v-model="campaign.options.goal_url"
                placeholder="Enter Application Link from Google PlayStore or Apple Store"
              />
              <b-input-group-append>
                <b-button
                  v-b-popover.hover.top="
                    'Paste your link of your Application from Google Play or Apple Store. We will show a button in your AD to the place of your choice.'
                  "
                  title="Application Installs"
                  class="btn-icon"
                  variant="outline-primary"
                >
                  <feather-icon icon="InfoIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
            
            <hr class="my-1" />

            <div class="row">
              <b-col class="col-sm-12 col-xl-6 col-12 mb-3">
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  size="md"
                  variant="outline-primary"
                  class="mt-1 previewad1 border-0 "
                  @click="previewCampaign"
                >
                  <span class="align-middle">Preview Campaign</span>
                </b-button>

                <vue-bottom-sheet-vue2 
                  ref="myBottomSheet"
                  class="preview-ad-modal"
                  modal-class="modal-primary"
                  centered
                  hide-footer
                  title="How will your Ad look like?"
                > 
                  <h4 class="mx-1 mb-0 preview-title text-center">How will your Ad look like?</h4>
                  <AdPreview
                    :title="campaign.options.title"
                    :views="campaign.options.view_count"
                    :img="campaign.options.src"
                    :channelTitle="campaign.options.channelTitle"
                  />
                  <b-col>
                      <b-button id="DashVideoCreateCampaignBtn" v-ripple.400="'rgba(113, 102, 240, 0.15)'" size="lg" block :disabled="loading || invalid || !campaign.amount" class="mt-1 bg-gradient-primary previewad " type="submit">
                            <span v-if="loading">
                                <span class="mr-1">Creating</span>
                                <b-spinner style="width: 2rem; height: 2rem" />
                            </span>
                            <span v-else><span>Create Campaign</span>
                              <feather-icon style="width: 1.5rem; height: 1.5rem" icon="ArrowUpRightIcon" class="ml-50" /></span>
                        </b-button>
                    </b-col>
                </vue-bottom-sheet-vue2>

              </b-col>
              <b-col class="col-sm-12 col-xl-6 col-12">
                <div class="createbtn" style="position: fixed; bottom: 0; left: 0; width: 100%; background-color: #fff; z-index: 999;">
                  <b-col class="col-12 mb-2">
                    <b-button id="DashVideoCreateCampaignBtn" v-ripple.400="'rgba(113, 102, 240, 0.15)'" size="lg" block :disabled="loading || invalid || !campaign.amount" class="mt-1 bg-gradient-primary previewad createbtncolor" type="submit">
                       <span v-if="loading">
                          <span class="mr-1">Creating</span>
                            <b-spinner style="width: 2rem; height: 2rem" />
                          </span>
                        <span v-else><span>Create Campaign</span>
                        <feather-icon style="width: 1.5rem; height: 1.5rem" icon="ArrowUpRightIcon" class="ml-50" /></span>
                     </b-button>
                  </b-col>
                </div>

              </b-col>
            </div>
          </b-form>
        </validation-observer>
        <b-modal
          id="modal-promocode"
          ref="modal-promocode"
          centered
          hide-footer
          title="Apply PromoCode"
        >
          <validation-observer ref="applyPromoCodeForm" #default="{ invalid }">
            <b-form class="mt-2" @submit.prevent="applyPromoCode">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Promocode"
                  rules="required|min:4"
                >
                  <b-form-input
                    v-model="promoCode"
                    :state="errors.length > 0 ? false : null"
                    placeholder="VEEFLYROCKS"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group v-if="campaign.amount > 0">
                <div class="overflow-auto scrollbar">
                  <div class="scrollheight">
                    <span>Top Promocodes:</span>
                    <b-row
                      v-for="item in allPromocodes"
                      :key="item.id"
                      class="mt-1 mb-1 mobcols promo-background"
                    >
                      <b-col md="3">
                        <b-button
                          variant="primary"
                          class="btncolor"
                          @click="promoCode = item.name"
                        >
                          <span class="buttons" v-if="promoCode == item.name">
                            Applied!
                          </span>
                          <span class="buttons" v-else> {{ item.name }} </span>
                        </b-button>
                      </b-col>
                      <b-col
                        md="9"
                        class="pl-md-0 d-md-flex align-items-center centerdiv"
                      >
                        <span class="promotext"> {{ item.description }} </span>
                      </b-col>
                    </b-row>
                    <span v-if="falsePromocodes.length > 0"
                      >Other Promocodes:</span
                    >
                    <b-row
                      v-for="item in falsePromocodes"
                      :key="item.id"
                      class="mt-1 mobcols promo-background"
                    >
                      <b-col md="3">
                        <b-button variant="primary" class="btncolor" disabled
                          ><span class="buttons">
                            {{ item.name }}
                          </span></b-button
                        >
                      </b-col>
                      <b-col
                        md="9"
                        class="pl-md-0 d-md-flex align-items-center centerdiv"
                      >
                        <span class="promotextdanger">
                          {{ item.description }}<br /><small
                            class="text-danger"
                          >
                            Add ${{ item.min_amount - campaign.amount }} more to
                            avail this promocode.
                          </small></span
                        >
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-form-group>
              <b-form-group v-else>
                <span>No Promocodes available!</span>
              </b-form-group>

              <b-row>
                <b-col cols="4" offset="8">
                  <b-button
                    type="submit"
                    variant="primary"
                    block
                    :disabled="invalid || promoCodeLoading"
                    class="mt-3 float-right"
                  >
                    <b-spinner v-if="promoCodeLoading" small />
                    <span v-else>Apply </span>
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-modal>
      </b-col>
    </div>
  </div>
  </div>
</div>  
</template>

<script>
import {
  BCard,
  BImg,
  BCardBody,
  BBadge,
  BCardText,
  BCardTitle,
  BCol,
  BFormGroup,
  BRow,
  BFormInput,
  BButtonGroup,
  BFormRadioGroup,
  BButton,
  BButtonToolbar,
  BFormSelect,
  BFormSelectOption,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BTabs,
  BTab,
  BFormValidFeedback,
  BFormInvalidFeedback,
  BForm,
  BFormRow,
  BModal,
  VBModal,
  BFormTags,
  BLink,
  VBPopover,
  BAlert,
  BSpinner,
  BSkeletonWrapper,
  BSkeleton,
  BSkeletonImg,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormRadio,
} from "bootstrap-vue";
import VueSlider from "vue-slider-component";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import vSelect from "vue-select";
import axios from "@axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, min_value } from "@validations";
import AdPreview from "@/components/AdPreview";
import _ from "lodash";
import Vue from 'vue'
import { Encrypter } from 'laravel-crypton'
// import { all } from "q";
import {createPopper} from '@popperjs/core'
import VueBottomSheetVue2 from "@webzlodimir/vue-bottom-sheet-vue2";


const key = process.env.VUE_APP_API_KEY
let crypt = new Encrypter(key)

/* eslint-disable global-require */
export default {
  components: {
    BCol,
    BCard,
    BImg,
    BCardBody,
    BBadge,
    BCardText,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BRow,
    BButtonGroup,
    BButton,
    BFormRadioGroup,
    BButtonToolbar,
    VueSlider,
    BFormSelect,
    BFormSelectOption,
    BInputGroupPrepend,
    BInputGroupAppend,
    BInputGroup,
    vSelect,
    BTabs,
    BTab,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BForm,
    BFormRow,
    BModal,
    BLink,
    VBPopover,
    BAlert,
    BFormTags,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    AdPreview,
    BSkeletonWrapper,
    BSkeleton,
    BSkeletonImg,
    required,
    min_value,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormRadio,
    VueBottomSheetVue2,
  },
  directives: {
    Ripple,
    "b-modal": VBModal,
    "b-popover": VBPopover,
  },

  data() {
    return {
      placement: 'top',
      screenWidth: window.innerWidth,
      goalOptions: 'goalOptions',
      cardHeight: '144px',
      cardBlur: 'blur(20px)',
      cardBorder: '1px solid white',
      cardWebkitMask: 'linear-gradient(0deg, transparent, black 114%)',
      cardButtonAll: false,
      selectmanullay: false,
      modalVisible: false,
      viewsMin: null,
      viewsMax: null,
      viewsMinPromo: null,
      viewsMaxPromo: null,
      viewsMinBase: null,
      viewsMaxBase: null,
      showLoader: false,
      channeldetails: {
        options: {},
      },
      channelamount: null,
      channelUrl: null,
      campaignids: {
        channel_options: {
          url: null,
          channelId: null,
          channelTitle: null,
          src: null,
        },
        options: {},
        channel_id: null,
        amount: null,
        channel_campaigns: [],
      },
      campaignOptions: [],
      channel_ids: null,
      dummy: [],
      /* selected: 'auto', */
      gender: [
        { id: 0, text: "All genders", value: "GENDER_UNDETERMINED" },
        { id: 1, text: "Male", value: "GENDER_MALE" },
        { id: 2, text: "Female", value: "GENDER_FEMALE" },
      ],
      allage: ["AGE_RANGE_UNDETERMINED"],
      age: [
        { id: 0, text: "18-24", value: "AGE_RANGE_18_24" },
        { id: 1, text: "25-34", value: "AGE_RANGE_25_34" },
        { id: 2, text: "35-44", value: "AGE_RANGE_35_44" },
        { id: 3, text: "45-54", value: "AGE_RANGE_45_54" },
        { id: 4, text: "55-64", value: "AGE_RANGE_55_64" },
        { id: 5, text: "65+", value: "AGE_RANGE_65_UP" },
      ],
      allag: [{ id: 0, text: "All age", value: "AGE_RANGE_UNDETERMINED" }],
      allinterest: ["0"],
      interest: [
        {
          id: 0,
          text: "Traveling",
          value: "67",
          affinityAudienceIds: "92945",
          inMarketAudienceIds: "80287",
        },
        {
          id: 1,
          text: "Business and career",
          value: "12",
          affinityAudienceIds: null,
          inMarketAudienceIds: "80883",
        },
        {
          id: 2,
          text: "Children and education",
          value: "958",
          affinityAudienceIds: null,
          inMarketAudienceIds: "80226",
        },
        {
          id: 3,
          text: "Banking and Finance",
          value: "16",
          affinityAudienceIds: "93017",
          inMarketAudienceIds: "80130",
        },
        {
          id: 4,
          text: "Hobbies and interests",
          value: "65",
          affinityAudienceIds: "92947",
          inMarketAudienceIds: null,
        },
        {
          id: 5,
          text: "Cookery",
          value: "71",
          affinityAudienceIds: "93002",
          inMarketAudienceIds: "80891",
        },
        {
          id: 6,
          text: "Construction and repair",
          value: "48",
          affinityAudienceIds: null,
          inMarketAudienceIds: "80469",
        },
        {
          id: 7,
          text: "Sports and fitness",
          value: "20",
          affinityAudienceIds: "92950",
          inMarketAudienceIds: "80545",
        },
        {
          id: 8,
          text: "Music and music videos",
          value: "35",
          affinityAudienceIds: "91900",
          inMarketAudienceIds: "80875",
        },
        {
          id: 9,
          text: "Beauty and health",
          value: "44",
          affinityAudienceIds: "93040",
          inMarketAudienceIds: "80546",
        },
        {
          id: 10,
          text: "Science and technology",
          value: "231",
          affinityAudienceIds: "93040",
          inMarketAudienceIds: null,
        },
        {
          id: 11,
          text: "Cars and transportation",
          value: "205",
          affinityAudienceIds: "93028",
          inMarketAudienceIds: null,
        },
        {
          id: 12,
          text: "Video games",
          value: "8",
          affinityAudienceIds: null,
          inMarketAudienceIds: "80928",
        },
      ],
      allint: [{ id: 0, text: "All interest", value: "0" }],
      selected: true,
      ////////////////////////////////////////////////////////
      allPromocodes: [],
      falsePromocodes: [],
      dir: "ltr",
      budgetMarkers: [],
      countryOptions: [],
      goalOptions: [
        { value: 0, text: "Subscribers", goal: "subscribers" },
        { value: 1, text: "Like & Comment", goal: "like" },
        { value: 2, text: "Website Traffic", goal: "website" },
        { value: 3, text: "Social Fans", goal: "page" },
        { value: 4, text: "App Installs", goal: "app" },
      ],
      videoTypeOptions: [
        { value: 1, text: "Regular Video" },
        { value: 2, text: " Music Video" },
      ],
      promoCode: null,
      promoCodeDetails: {},
      videoId: null,
      topic: [],
      videoData: null,
      campaign: {
        amount: null,
        vid: null,
        options: {
          gender: "GENDER_UNDETERMINED",
          agegroup: [],
          affinityAudienceIds: [],
          song_brand: 1,
          countries: [],
          src: null,
          url: null,
          channelTitle: null,
          channelId: null,
          goal: "subscribers",
          goal_url: null,
          user_tags: [],
          view_count: null,
          likes: null,
          dislikes: null,
          comments: null,
          viewsMin: 0,
          viewsMax: 0,
          description1: null,
          description2: null,
        },
      },
      settings: {},
      targeting: 0,
      viewsMinDif: 0,
      viewsMaxDif: 0,
      loading: false,
      promoCodeLoading: false,
      skeletonLoading: true,
      maxBudget: 1000,
      budgetMarkersLength: 0,
      stepValue: 250,
      removedMarkers: [],
      queryParams: {},
      views_proc: true,
      autoApply: false,
      showPromocodeStatusBox: false,
      isSticky: false,
    };
  },
  computed: {
    // stateAll() {
    //   if(this.campaign.options.interest){
    //     return this.campaign.options.interest.length === 3;
    //   }
    //   return this.campaign.options.interest.length === 3;
    // },
    // state() {
    //   // Overall component validation state
    //    console.log('watch dirty stats');
    //   return this.dirty ? this.tags.length > 2 && this.tags.length < 9 : null
    // },
    value: {
      get() {
        return [this.campaign.amount];
      },
      set([bugdet]) {
        this.campaign.amount = bugdet;
      },
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = "rtl";
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = "ltr";
      return this.dir;
    },
    device(){
      return store.getters['app/device']
    }
  },
  watch: {
    // "videoId": function () {
    //   this.getVideo();
    // },
    "promoCodeLoading": function () {
      if (!this.promoCodeLoading && !this.campaign.amount && ((this.campaign.vid?.length * parseInt(this.settings.minimal_channel_budget)) <= this.promoCodeDetails.min_amount)) {
        this.campaign.amount = this.promoCodeDetails.min_amount;
        this.applyPromoCode()
      }

      if ((this.campaign.vid?.length * parseInt(this.settings.minimal_channel_budget)) > this.promoCodeDetails.min_amount) {
        this.campaign.amount = this.campaign.vid.length * this.settings.minimal_channel_budget
      }

      this.infiniteBudget()
    },
    "campaign.amount": function () {
      if (this.loading != true) {
        if (this.promoCodeDetails.min_amount > this.campaign.amount && this.views_proc) {
          this.removePromoCode();
        }
        this.calculateViews();
        this.calculateChannelViews();
        this.infiniteBudget();
        this.getAvailablePromocode();
        // this.setPostData();
      }
    },
    "campaign.options.countries": function () {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    "campaign.options.agegroup": function () {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    "campaign.options.gender": function () {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    topic: function () {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    "campaign.options.user_tags": function () {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    selected: function () {
      if (this.selected) {
        this.modalVisible = false;
        this.selectmanullay = false;
        // this.$refs['modal-preview1'].hide()
      } else {
        // this.$refs['modal-preview1'].show()
        this.modalVisible = true;
        // this.selectmanullay = true;
        // this.selected = 'automatic'; // Set the selected value to 'automatic'
      }
    },
    "screenWidth": function () {
      this.infiniteBudget();
    },
    "modalVisible": function () {
            if (this.modalVisible) {
                if (this.screenWidth <= 450) {
                    this.$refs['bottom-sheet-preview1'].open()
                } else {
                    this.$refs['modal-preview1'].show()
                }
            } else {
                if (this.screenWidth <= 450) {
                    this.$refs['bottom-sheet-preview1'].close()
                } else {
                    this.$refs['modal-preview1'].hide()
                }
            }
       },
       
    promoCodeDetails() {
      // this.setPostData();
      this.calculateViews();
      this.calculateChannelViews();
    },
    promoCode() {
      if (this.promoCode) {
        this.applyPromoCode();
      } else if (!this.campaign.amount) {
        this.campaign.amount = this.campaign.vid.length * this.settings.minimal_channel_budget
      }
    },
    // availPromocode(promocode) {
    //   console.log(promocode);
    //   this.promoCode = promocode;
    // },
    // "campaign.options.user_tags": function() {
    //   // Set the dirty flag on first change to the tags array
    //   console.log('watch dirty true');
    //   this.dirty = true
    // },
  },
  beforeMount() {
    this.videoId = this.$route.params.id;
    this.channel = this.$route.params.channel ?? null;
    this.statistics = this.$route.params.statistics ?? null;
    // console.log(this.videoId);
    // console.log(this.channel);
    this.campaign.vid = this.videoId;
    this.getSettings();
    this.calculateViews();
    this.calculateChannelViews();
  },
  mounted() {
    this.getVideo();
    // if (this.videoData) {
    //   this.campaign.amount = this.campaignOptions.length * this.settings.minimal_channel_budget;
    // }
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.onWindowResize);
    this.getAvailablePromocode();

    this.queryParams = localStorage.getItem("queryParams")
      ? JSON.parse(localStorage.getItem("queryParams"))
      : {};
    
    if (!this.promoCode && this.queryParams && this.queryParams.c && this.queryParams.c != btoa('FIRST50')) {
      this.promoCode = atob(this.queryParams.c)
    }
    else {
      this.campaign.amount = this.campaign.vid.length * this.settings.minimal_channel_budget
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    },

  methods: {
    
    kFormatter(num) {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else {
      return num.toString();
    }
    },

    toggleHeight() {
      this.cardHeight = this.cardHeight === '144px' ? 'auto' : '144px';
      this.cardBlur = this.cardBlur === 'blur(20px)' ? 'blur(0)' : 'blur(20px)';
      this.cardWebkitMask = this.cardWebkitMask === 'linear-gradient(0deg, transparent, black 114%)' ? 'none' : 'linear-gradient(0deg, transparent, black 114%)';
      this.cardButtonAll = this.cardButtonAll === true ? false : true;
    },


    withPopper(dropdownList, component, {
            width
        }) {
            dropdownList.style.width = width
            const popper = createPopper(component.$refs.toggle, dropdownList, {
                placement: this.placement,
                modifiers: [{
                        name: 'offset',
                        options: {
                            offset: [0, -1],
                        },
                    },
                    {
                        name: 'toggleClass',
                        enabled: true,
                        phase: 'write',
                        fn({
                            state
                        }) {
                            component.$el.classList.toggle(
                                'drop-up',
                                state.placement === 'top'
                            )
                        },
                    },
                ],
            })
        },
    
    onWindowResize() {
      this.screenWidth = window.innerWidth;
    },

    handleScroll() {
      const navHeight = this.$refs.videoEle.clientHeight;
      this.isSticky = window.scrollY > navHeight;
    },

    selectAutomatic() {
      /*  this.selected = 'automatic'; */
      this.modalVisible = false;
      this.selected = true;
    },
    selectManually() {
      /*  this.selected = 'automatic'; */
      this.modalVisible = false;
      this.selectmanullay = true;
    },
    selectAll() {
      this.topic = [];
    },
    selectInterest() {
      // console.log(this.topic)
      // this.campaign.options.affinityAudienceIds.push(this.topic[0].affinityAudienceIds)
      // console.log(this.campaign.options.affinityAudienceIds)
      this.allinterest = [];
      if (this.topic.length > 3) {
        this.topic.shift();
      }
      if (this.topic.length < 1) {
        this.allinterest = ["0"];
      }
    },
    selectAllAge() {
      this.campaign.options.agegroup = [];
    },
    selectAge() {
      this.allage = [];
      if (this.campaign.options.agegroup.length > 6) {
        this.campaign.options.agegroup.shift();
      }
      if (this.campaign.options.agegroup.length < 1) {
        this.allage = ["AGE_RANGE_UNDETERMINED"];
      }
    },
    previewCampaign() {
            if (this.screenWidth <= 450) {
                this.$refs.myBottomSheet.open();
            } else {
                this.$refs['modal-preview'].show()
            }
        },
    getAvailablePromocode() {
      const params = { params: { active: 'Active', for_channel: 1 } };

      axios
        .get(process.env.VUE_APP_ADMIN_API_URL + "/user_promocodes", params)
        .then((data) => {
          // var currentDate = new Date().toISOString();
          var promocodes = data.data.data;
          var amount = this.campaign.amount;
          var x = localStorage.getItem("user");
          var jsonc = JSON.parse(x);
          var user_campaign = jsonc.completed_campaign;

          var results = promocodes.filter(function (item) {
            return user_campaign > 0
              ? item.name != "FIRST50" &&
                  item.status != 4 &&
                  item.min_amount <= amount &&
                  item.max_amount >= amount
              : item.status != 4 &&
                  item.min_amount <= amount &&
                  item.max_amount >= amount;
          });

          results.sort((a, b) => {
            return b.views_proc - a.views_proc;
          });

          var falsepc = promocodes.filter(function (item) {
            return user_campaign > 0
              ? item.name != "FIRST50" &&
                  item.status != 4 &&
                  item.min_amount > amount
              : item.status != 4 &&
                  item.min_amount > amount;
          });

          falsepc.sort((a, b) => {
            return a.min_amount - b.min_amount;
          });

          this.allPromocodes = results;
          this.falsePromocodes = falsepc;

          // if (!this.promoCode && this.queryParams && this.queryParams.c) {
          //   this.promoCode = atob(this.queryParams.c);

            // setTimeout(() => {
            //   if (!this.promoCodeLoading) {
            //     // console.log(this.promoCodeDetails)
            //     if (!this.campaign.amount && ((this.campaign.vid?.length * parseInt(this.settings.minimal_channel_budget)) <= this.promoCodeDetails.min_amount)) {
            //       this.campaign.amount = this.promoCodeDetails.min_amount;
            //       console.log(this.promoCodeDetails)
            //     }
            //   }
            // }, 3000);
          // }
        });
    },
    filterKey(e) {
      const key = e.key;

      // If is '.' key, stop it
      if (key === ".") return e.preventDefault();

      // OPTIONAL
      // If is 'e' key, stop it
      if (key === "e") return e.preventDefault();
    },

    // This can also prevent copy + paste invalid character
    // filterInput(e) {
    //   e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    // },
    getCountries() {
      axios.get("/countries").then((data) => {
        this.countryOptions = data.data.data;
      });
    },
    getSettings() {
      this.settings = crypt.decrypt(JSON.parse(localStorage.getItem("settings")));
      // console.log(this.settings.minimal_budget);
      // this.settings.step2 = "200";
    },
    removeVideo(index) {
      // console.log(this.videoData);
      // console.log(this.campaignOptions);
      this.campaignOptions.splice(index, 1);
      this.campaign.vid.splice(index, 1)
      // this.getVideo();
      this.calculateViews();
      this.calculateChannelViews();
      this.infiniteBudget();
    },
    getVideo() {
      this.showLoader = true;
      this.skeletonLoading = true;
      axios
        .post("/video/getVideo", {
          id: !Array.isArray(this.videoId) ? [this.videoId] : this.videoId,
        })
        .then((data) => {
          this.showLoader = false;
          this.videoData = data.data.data;
          if (!this.promoCode || ((this.campaign.vid?.length * parseInt(this.settings.minimal_channel_budget)) > this.promoCodeDetails.min_amount)) {
            this.campaign.amount = this.campaign.vid.length * this.settings.minimal_channel_budget;
          }
          this.channel_ids = this.videoData[0].snippet.channelId;
          // if (this.channel) {
          let campaignOptions = {};
          this.calculateChannelViews();
          this.calculateViews();
          for (let v = 0; v < this.videoData.length; v++) {
            this.campaign.options.title = this.videoData[v].snippet.title;
            this.campaign.options.channelTitle =
              this.videoData[v].snippet.channelTitle;
            this.campaign.options.channelId =
              this.videoData[v].snippet.channelId;
            this.campaign.options.tags = this.videoData[v].snippet.tags
              ? this.videoData[v].snippet.tags
              : [];
            this.campaign.options.src = this.videoData[v].snippet.thumbnails
              .maxres
              ? this.videoData[v].snippet.thumbnails.maxres.url
              : this.videoData[v].snippet.thumbnails.high.url;
            this.campaign.options.view_count =
              this.videoData[v].statistics.viewCount;
            this.campaign.options.likes =
              this.videoData[v].statistics.likeCount;
            this.campaign.options.dislikes =
              this.videoData[v].statistics.dislikeCount;
              this.campaign.options.url = `https://www.youtube.com/watch?v=${this.videoData[v].id}`;
            this.campaign.options.subs_count_creating_campaign =
              this.videoData[v].statistics.subs_count_creating_campaign;
            this.campaign.options.subs_count_hidden =
              this.videoData[v].statistics.subs_count_hidden;
            this.campaign.options.comments =
              this.videoData[v].statistics.commentCount;
            this.campaign.options.description2 = this.settings.description2;
            this.campaign.options.description1 =
              parseInt(this.settings.use_channel_title) > 0
                ? this.videoData[v].snippet.channelTitle
                : this.settings.description1;

            campaignOptions = {
              title: this.videoData[v].snippet.title,
              channelTitle: this.videoData[v].snippet.channelTitle,
              channelId: this.videoData[v].snippet.channelId,
              tags: this.videoData[v].snippet.tags,
              src: this.campaign.options.src,
              view_count: this.videoData[v].statistics.viewCount,
              likes: this.videoData[v].statistics.likeCount,
              dislikes: this.videoData[v].statistics.dislikeCount,
              subs_count_creating_campaign:
                this.videoData[v].statistics.subs_count_creating_campaign,
              subs_count_hidden: this.videoData[v].statistics.subs_count_hidden,
              comments: this.videoData[v].statistics.commentCount,
              description2: this.settings.description2,
              description1:
                parseInt(this.settings.use_channel_title) > 0
                  ? this.videoData[v].snippet.channelTitle
                  : this.settings.description1,
              ...this.campaign.options,
            };
            this.campaignOptions.push(campaignOptions);
            /*  this.campaignids.channel_campaigns.push(this.campaign) */
          }
          /* this.campaign.options = {} */
          // } else {
          //   this.campaign.options.title = this.videoData[0].snippet.title;
          //   this.campaign.options.channelTitle =
          //     this.videoData[0].snippet.channelTitle;
          //   this.campaign.options.channelId = this.videoData[0].snippet.channelId;
          //   this.campaign.options.tags = this.videoData[0].snippet.tags;
          //   this.campaign.options.src =
          //     this.videoData[0].snippet.thumbnails.maxres.url;
          //   this.campaign.options.view_count =
          //     this.videoData[0].statistics.viewCount;
          //   this.campaign.options.likes = this.videoData[0].statistics.likeCount;
          //   this.campaign.options.dislikes =
          //     this.videoData[0].statistics.dislikeCount;
          //   this.campaign.options.subs_count_creating_campaign =
          //     this.videoData[0].statistics.subs_count_creating_campaign;
          //   this.campaign.options.subs_count_hidden =
          //     this.videoData[0].statistics.subs_count_hidden;

          //   this.campaign.options.comments =
          //     this.videoData[0].statistics.commentCount;
          //   this.campaign.options.description2 = this.settings.description2;
          //   this.campaign.options.description1 =
          //     parseInt(this.settings.use_channel_title) > 0
          //       ? this.videoData[0].snippet.channelTitle
          //       : this.settings.description1;
          // }

          if (this.videoData) {
            this.getCountries();
            this.skeletonLoading = false;
          }
        })
        .catch((err) => {
          let source = this.$route.query.source ?? null
          if (source) {
            this.$router.push({
              name: "channel-videos",
              params: { errors: "Error on fetching video details" },
              query: { source },
            })
            return
          }

          this.$router.push({
            name: "channel-link",
            params: { errors: "Error on fetching video details" },
          });
        });
    },
    addTags() {
      if (!this.videoData.snippet.tags) {
        return false;
      }
      this.campaign.options.user_tags = this.campaign.options.user_tags.concat(
        this.videoData.snippet.tags
      );
    },
    tagValidator(tag) {
      return tag.length < 60;
    },
    calculateViews() {
      if (this.views_proc) {
        const budget = parseInt(
          this.campaign.amount / this.campaignOptions?.length
        );
        let k1 = this.settings.k1 ? parseFloat(this.settings.k1) : 6.85;
        let k2 = this.settings.k2 ? parseFloat(this.settings.k2) : 5.35;
        // console.log("console.log"+this.settings.keywords);
        const keywords = this.settings.keywords ? this.settings.keywords : 1.75;
        const age = this.settings.age ? this.settings.age : 1.75;
        const gender = this.settings.gender ? this.settings.gender : 1.75;
        const topic = this.settings.topic ? this.settings.topic : 1.75;
        this.calculateCountries();
        // console.log(this.targeting);
        if (this.targeting > 0) {
          // console.log("into countries targeting logiv", this.targeting);
          k1 += parseInt(this.targeting * 1);
          k2 += parseInt(this.targeting * 1);
        }
        if (this.campaign.options.user_tags?.length > 0) {
          // console.log("into user tags logiv");
          k1 += parseInt(keywords);
          k2 += parseInt(keywords);
        }
        if (this.campaign.options.agegroup?.length > 0) {
          // console.log("into age logiv");
          k1 += parseInt(age);
          k2 += parseInt(age);
        }
        if (this.campaign.options.gender != "GENDER_UNDETERMINED") {
          // console.log("into gender logiv");
          k1 += parseInt(gender);
          k2 += parseInt(gender);
        }
        if (!this.topic.includes("0") && this.topic.length > 0) {
          // console.log("into topic logiv");
          k1 += parseInt(topic);
          k2 += parseInt(topic);
        }
        this.campaign.options.viewsMinBase = Math.round((1000 * budget) / k1);
        this.campaign.options.viewsMaxBase = Math.round((1000 * budget) / k2);

  /*       const pro =
          budget >= this.settings.step2
            ? this.settings.percents_step2
            : budget >= this.settings.step1
            ? this.settings.percents_step1
            : 0;

        this.viewsMinDif = Math.round(
          (this.campaign.options.viewsMinBase * pro) / 100
        );

        this.viewsMaxDif = Math.round(
          (this.campaign.options.viewsMaxBase * pro) / 100
        ); */

        let viewsMinPromo = 0;
        let viewsMaxPromo = 0;
        if (this.promoCodeDetails) {
          if (this.promoCodeDetails.amount > 0) {
            viewsMinPromo = Math.round(
              (1000 * this.promoCodeDetails.amount) / k1
            );
            viewsMaxPromo = Math.round(
              (1000 * this.promoCodeDetails.amount) / k2
            );
          }
          if (this.promoCodeDetails.views_proc > 0) {
            viewsMinPromo =
              ((this.campaign.options.viewsMinBase + this.viewsMinDif) *
                this.promoCodeDetails.views_proc) /
              100;
            viewsMaxPromo =
              ((this.campaign.options.viewsMaxBase + this.viewsMaxDif) *
                this.promoCodeDetails.views_proc) /
              100;
          }
          // console.log(this.promoCodeDetails);
        }
        this.campaign.options.viewsMinPromo = viewsMinPromo;
        this.campaign.options.viewsMaxPromo = viewsMaxPromo;
        this.campaign.options.viewsMin = Math.round(
          this.campaign.options.viewsMinBase + this.viewsMinDif + viewsMinPromo
        );
        this.campaign.options.viewsMax = Math.round(
          this.campaign.options.viewsMaxBase + this.viewsMaxDif + viewsMaxPromo
        );
        this.campaign.options.viewsStop = Math.round(
          (this.campaign.options.viewsMin + this.campaign.options.viewsMax) / 2
        );
        this.campaign.options.pricePerView =
          budget / this.campaign.options.viewsStop;
      }
    },
    calculateChannelViews() {
      if (this.views_proc) {
        const budget = parseInt(this.campaign.amount);
        let k1 = this.settings.k1 ? parseFloat(this.settings.k1) : 6.85;
        let k2 = this.settings.k2 ? parseFloat(this.settings.k2) : 5.35;
        // console.log("console.log"+this.settings.keywords);
        const keywords = this.settings.keywords ? this.settings.keywords : 1.75;
        const age = this.settings.age ? this.settings.age : 1.75;
        const gender = this.settings.gender ? this.settings.gender : 1.75;
        const topic = this.settings.topic ? this.settings.topic : 1.75;
        this.calculateCountries();
        // console.log(this.targeting);
        if (this.targeting > 0) {
          // console.log("into countries targeting logiv", this.targeting);
          k1 += parseInt(this.targeting * 1);
          k2 += parseInt(this.targeting * 1);
        }
        if (this.campaign.options.user_tags?.length > 0) {
          // console.log("into user tags logiv");
          k1 += parseInt(keywords);
          k2 += parseInt(keywords);
        }
        if (this.campaign.options.agegroup?.length > 0) {
          // console.log("into age logiv");
          k1 += parseInt(age);
          k2 += parseInt(age);
        }
        if (this.campaign.options.gender != "GENDER_UNDETERMINED") {
          // console.log("into gender logiv");
          k1 += parseInt(gender);
          k2 += parseInt(gender);
        }
        if (!this.topic.includes("0") && this.topic.length > 0) {
          // console.log("into topic logiv");
          k1 += parseInt(topic);
          k2 += parseInt(topic);
        }
        this.viewsMinBase = Math.round((1000 * budget) / k1);
        this.viewsMaxBase = Math.round((1000 * budget) / k2);

  /*       const pro =
          budget >= this.settings.step2
            ? this.settings.percents_step2
            : budget >= this.settings.step1
            ? this.settings.percents_step1
            : 0;

        this.viewsMinDif = Math.round((this.viewsMinBase * pro) / 100);

        this.viewsMaxDif = Math.round((this.viewsMaxBase * pro) / 100); */

        let viewsMinPromo = 0;
        let viewsMaxPromo = 0;
        if (this.promoCodeDetails) {
          if (this.promoCodeDetails.amount > 0) {
            viewsMinPromo = Math.round(
              (1000 * this.promoCodeDetails.amount) / k1
            );
            viewsMaxPromo = Math.round(
              (1000 * this.promoCodeDetails.amount) / k2
            );
          }
          if (this.promoCodeDetails.views_proc > 0) {
            viewsMinPromo =
              ((this.viewsMinBase + this.viewsMinDif) *
                this.promoCodeDetails.views_proc) /
              100;
            viewsMaxPromo =
              ((this.viewsMaxBase + this.viewsMaxDif) *
                this.promoCodeDetails.views_proc) /
              100;
          }
          // console.log(this.promoCodeDetails);
        }
        this.viewsMinPromo = viewsMinPromo;
        this.viewsMaxPromo = viewsMaxPromo;
        this.viewsMin = Math.round(
          this.viewsMinBase + this.viewsMinDif + viewsMinPromo
        );
        this.viewsMax = Math.round(
          this.viewsMaxBase + this.viewsMaxDif + viewsMaxPromo
        );
        this.viewsMinPromo = Math.round(this.viewsMinPromo);
        this.viewsMaxPromo = Math.round(this.viewsMaxPromo);
      }
    },
    infiniteBudget() {
      if (this.campaign.amount < 950) {
        this.maxBudget = 1000;
        if (this.screenWidth <= 290){
          this.budgetMarkers = [this.campaign.vid.length * this.settings.minimal_channel_budget, 100, 300, 500, 800, 1000];
        } else {
          this.budgetMarkers = [this.campaign.vid.length * this.settings.minimal_channel_budget, 100, 200, 300, 500, 800, 1000];
        }
      } else {
        if (this.maxBudget - 5 < this.campaign.amount) {
          this.maxBudget =
            Math.ceil((parseInt(this.campaign.amount) + 6) / 250) * 250;
          this.budgetMarkers = [
            10,
            // Math.ceil((this.maxBudget * 0.05) / 25) * 25,
            Math.ceil((this.maxBudget * 0.14) / 25) * 25,
            Math.ceil((this.maxBudget * 0.3) / 25) * 25,
            Math.ceil((this.maxBudget * 0.5) / 25) * 25,
            Math.ceil((this.maxBudget * 0.8) / 25) * 25,
            Math.ceil((this.maxBudget * 1) / 25) * 25,
          ];
          // console.log(this.budgetMarkers)
          // for (let i = 1000; i <= this.maxBudget; i += 250) {
          //   if (this.budgetMarkers.includes(i) == false) {
          //     this.budgetMarkers.push(i);
          //   }
          // }
        }
        if (
          this.maxBudget > 1000 &&
          this.campaign.amount < this.maxBudget * 0.05 - 1
        ) {
          this.maxBudget =
            Math.ceil(parseInt(this.campaign.amount) / 250) * 250;
          this.budgetMarkers = [
            10,
            Math.ceil((this.maxBudget * 0.05) / 25) * 25,
            Math.ceil((this.maxBudget * 0.1) / 25) * 25,
            Math.ceil((this.maxBudget * 0.3) / 25) * 25,
            Math.ceil((this.maxBudget * 0.5) / 25) * 25,
            Math.ceil((this.maxBudget * 0.8) / 25) * 25,
            Math.ceil((this.maxBudget * 1) / 25) * 25,
          ];
        }
        this.budgetMarkersLength = (this.maxBudget - 1000) / 250;
        this.budgetMarkers.length = 7 + this.budgetMarkersLength;
      }
    },
    applyPromoCode: _.debounce(function () {
      if (this.$refs.applyPromoCodeForm == undefined) {
        this.applyPromoCodeFunc()
      }
      else {
        this.$refs.applyPromoCodeForm.validate().then((success) => {
          if (success) {
            this.applyPromoCodeFunc()
          }
        });
      }
    }, 1500),
    applyPromoCodeFunc() {
      this.showPromocodeStatusBox = false
      this.promoCodeLoading = true;

      let x = localStorage.getItem("user");
      let jsonc = JSON.parse(x);
      let user_id = jsonc.id;

      axios
        .post(
          process.env.VUE_APP_ADMIN_API_URL + "/user_promocode/verify",
          {
            min_amount: this.campaign.amount,
            name: this.promoCode,
            channel_id: this.campaign.options.channelId,
            u: user_id,
          }
        )
        .then((data) => {
          this.campaign.options.Promocode = data.data.data;
          this.promoCodeDetails = this.campaign.options.Promocode;
          if (this.promoCodeDetails.country_disabled) {
            this.campaign.options.countries = [];
          }
          if (this.promoCodeDetails.advance_disabled) {
            this.selectAutomatic();
            this.campaign.options.gender = "GENDER_UNDETERMINED";
            this.allage = ["AGE_RANGE_UNDETERMINED"],
            this.campaign.options.agegroup = [];
            this.allinterest = ["0"];
            this.topic = [];
            this.campaign.options.affinityAudienceIds = [];
            this.campaign.options.inMarketAudienceIds = [];
          }
          this.$toast.clear();

          if (this.campaign.amount) {
            this.showPromocodeStatusBox = true

            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Promocode Applied",
                icon: "CheckIcon",
                variant: "success",
              },
            });
          }
          else {
            this.applyPromoCode()
          }
          this.queryParams = null;
          this.promoCodeLoading = false;
          // this.$refs["modal-promocode"].hide();
          // console.log(this.promoCodeDetails, this.promoCodeDetails.status);
        })
        .catch((error) => {
          delete this.campaign.options.Promocode;
          this.promoCodeDetails = {};
          this.$toast.clear();
          var message = error.response.data.message;

          this.$toast({
            component: ToastificationContent,
            props: {
              title: message,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
          this.promoCodeLoading = false;
        });
    },
    removePromoCode() {
      this.promoCode = null;
      delete this.campaign.options.Promocode;
      this.promoCodeDetails = {};
    },
    calculateCountries() {
      let cs = 0;
      this.targeting = 0;
      if (!this.campaign.options.countries?.length) return;
      this.campaign.options.countries.forEach((c) => {
        this.targeting = parseFloat(this.targeting) + parseFloat(c.tier.amount);
        cs++;
      });
      this.targeting /= cs;
      // console.log("tageting", this.targeting);
    },
    // setPostData(){
    //   this.calculateViews();
    //   const minimumBudget = this.campaignOptions.length * parseInt(this.settings.minimal_channel_budget);
    //   if (this.campaign.amount < minimumBudget) {
    //     return; // Do not proceed with campaign creation
    //   }
    //   if (Array.isArray(this.campaign.vid)) {
    //     this.campaignids.channel_campaigns = [];
    //     for (let v=0; v<this.campaignOptions.length; v++) {
    //       let vid = { amount: this.campaign.amount / this.campaignOptions.length, options: this.campaignOptions[v], vid: this.campaign.vid[v]}
    //       this.campaignids.channel_campaigns.push(vid);
    //     }
    //     for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.viewsMin = this.campaign.options.viewsMin;
    //         this.campaignids.channel_campaigns[i].options.viewsMax = this.campaign.options.viewsMax;
    //         this.campaignids.channel_campaigns[i].options.viewsMinPromo = this.campaign.options.viewsMinPromo;
    //         this.campaignids.channel_campaigns[i].options.viewsMaxPromo = this.campaign.options.viewsMaxPromo;
    //         this.campaignids.channel_campaigns[i].options.viewsMinBase = this.campaign.options.viewsMinBase;
    //         this.campaignids.channel_campaigns[i].options.viewsMaxBase = this.campaign.options.viewsMaxBase;
    //         this.campaignids.channel_campaigns[i].options.viewsStop = this.campaign.options.viewsStop;
    //         this.campaignids.channel_campaigns[i].options.pricePerView = this.campaign.options.pricePerView;
    //       }
    //       if (this.promoCodeDetails?.calc_amount) {
    //         this.campaign.amount = this.promoCodeDetails?.calc_amount;
    //       }
    //       if (this.campaign.options.agegroup == 0) {
    //         this.campaignids.channel_campaigns.options.agegroup = this.campaign.options.agegroup = this.allage;
    //       }
    //       else
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //           this.campaignids.channel_campaigns[i].options.agegroup = this.campaign.options.agegroup;
    //         }
    //       }
    //       // if (this.campaign.options.topic?.length == 0) {
    //       //   this.campaignids.channel_campaigns.options.topic = this.campaign.options.topic =  this.allinterest;
    //       // }
    //       // else
    //       // {
    //       //   for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //       //   this.campaignids.channel_campaigns[i].options.topic = this.campaign.options.topic;
    //       // }
    //       // }

    //       if(this.campaign.options.countries.length > 0)
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.countries = this.campaign.options.countries;
    //       }
    //       }
    //       if(this.campaign.options.gender)
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.gender = this.campaign.options.gender;
    //       }
    //       }
    //       if (this.topic.length == 0) {
    //         this.topic = this.allinterest;
    //       } else if(this.topic.length > 0) {
    //         this.campaign.options.affinityAudienceIds = [];
    //         this.campaign.options.inMarketAudienceIds = [];
    //         for (let i = 0; i < this.topic.length; i++) {
    //           if (this.topic[i].affinityAudienceIds) {
    //             this.campaign.options.affinityAudienceIds.push(this.topic[i].affinityAudienceIds);
    //             for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //             this.campaignids.channel_campaigns[i].options.affinityAudienceIds = this.campaign.options.affinityAudienceIds;
    //           }
    //           }
    //           if (this.topic[i].inMarketAudienceIds) {
    //             this.campaign.options.inMarketAudienceIds.push(this.topic[i].inMarketAudienceIds);
    //             for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //             this.campaignids.channel_campaigns[i].options.inMarketAudienceIds = this.campaign.options.inMarketAudienceIds;
    //           }
    //           }
    //         }
    //       }
    //     this.campaignids.channel_id = this.channel_ids;
    //     this.campaignids.amount=this.campaign.amount;
    //     this.channelamount = this.campaignOptions.length / this.campaignids.amount;
    //     /* this.channel.snippet.thumbnails = this.channel.snippet.thumbnails.medium.url; */
    //     this.campaignids.channel_options.channelId = this.channel.snippet.channelId;
    //     this.campaignids.channel_options.channelTitle = this.channel.snippet.channelTitle;
    //     this.campaignids.channel_options.src = this.channel.snippet.thumbnails.medium.url;
    //     this.campaignids.channel_options.url = 'https://www.youtube.com/channel/'+ this.campaignids.channel_options.channelId;
    //     this.campaignids.options.viewsmaxcount = this.viewsMax;
    //     this.campaignids.options.viewsmincount = this.viewsMin;
    //   }
    // },
    // createCampaign() {
    //   this.calculateViews();
    //   const minimumBudget = this.campaignOptions.length * parseInt(this.settings.minimal_channel_budget);
    //   if (this.campaign.amount < minimumBudget) {
    //     this.$toast({
    //       component: ToastificationContent,
    //       props: {
    //         title: "Budget is less than the minimum required.",
    //         icon: "AlertTriangleIcon",
    //         variant: "danger",
    //       },
    //     });
    //     return; // Do not proceed with campaign creation
    //   }
    //   this.loading = true;
    //    if (Array.isArray(this.campaign.vid)) {
    //     this.campaignids.channel_campaigns = [];
    //     for (let v=0; v<this.campaignOptions.length; v++) {
    //       let vid = { amount: this.campaign.amount / this.campaignOptions.length, options: this.campaignOptions[v], vid: this.campaign.vid[v]}
    //       this.campaignids.channel_campaigns.push(vid);
    //     }
    //     for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.viewsMin = this.campaign.options.viewsMin;
    //         this.campaignids.channel_campaigns[i].options.viewsMax = this.campaign.options.viewsMax;
    //         this.campaignids.channel_campaigns[i].options.viewsMinPromo = this.campaign.options.viewsMinPromo;
    //         this.campaignids.channel_campaigns[i].options.viewsMaxPromo = this.campaign.options.viewsMaxPromo;
    //         this.campaignids.channel_campaigns[i].options.viewsMinBase = this.campaign.options.viewsMinBase;
    //         this.campaignids.channel_campaigns[i].options.viewsMaxBase = this.campaign.options.viewsMaxBase;
    //         this.campaignids.channel_campaigns[i].options.viewsStop = this.campaign.options.viewsStop;
    //         this.campaignids.channel_campaigns[i].options.pricePerView = this.campaign.options.pricePerView;
    //       }
    //       if (this.promoCodeDetails?.calc_amount) {
    //         this.campaign.amount = this.promoCodeDetails?.calc_amount;
    //       }
    //       if (this.campaign.options.agegroup == 0) {
    //         this.campaignids.channel_campaigns.options.agegroup = this.campaign.options.agegroup = this.allage;
    //       }
    //       else
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //           this.campaignids.channel_campaigns[i].options.agegroup = this.campaign.options.agegroup;
    //         }
    //       }
    //       // if (this.campaign.options.topic?.length == 0) {
    //       //   this.campaignids.channel_campaigns.options.topic = this.campaign.options.topic =  this.allinterest;
    //       // }
    //       // else
    //       // {
    //       //   for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //       //   this.campaignids.channel_campaigns[i].options.topic = this.campaign.options.topic;
    //       // }
    //       // }

    //       if(this.campaign.options.countries.length > 0)
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.countries = this.campaign.options.countries;
    //       }
    //       }
    //       if(this.campaign.options.gender)
    //       {
    //         for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //         this.campaignids.channel_campaigns[i].options.gender = this.campaign.options.gender;
    //       }
    //       }
    //       if (this.topic.length == 0) {
    //         this.topic = this.allinterest;
    //       } else if(this.topic.length > 0) {
    //         this.campaign.options.affinityAudienceIds = [];
    //         this.campaign.options.inMarketAudienceIds = [];
    //         for (let i = 0; i < this.topic.length; i++) {
    //           if (this.topic[i].affinityAudienceIds) {
    //             this.campaign.options.affinityAudienceIds.push(this.topic[i].affinityAudienceIds);
    //             for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //             this.campaignids.channel_campaigns[i].options.affinityAudienceIds = this.campaign.options.affinityAudienceIds;
    //           }
    //           }
    //           if (this.topic[i].inMarketAudienceIds) {
    //             this.campaign.options.inMarketAudienceIds.push(this.topic[i].inMarketAudienceIds);
    //             for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
    //             this.campaignids.channel_campaigns[i].options.inMarketAudienceIds = this.campaign.options.inMarketAudienceIds;
    //           }
    //           }
    //         }
    //       }
    //     this.campaignids.channel_id = this.channel_ids;
    //     this.campaignids.amount=this.campaign.amount;
    //     this.channelamount = this.campaignOptions.length / this.campaignids.amount;
    //     /* this.channel.snippet.thumbnails = this.channel.snippet.thumbnails.medium.url; */
    //     this.campaignids.channel_options.channelId = this.channel.snippet.channelId;
    //     this.campaignids.channel_options.channelTitle = this.channel.snippet.channelTitle;
    //     this.campaignids.channel_options.src = this.channel.snippet.thumbnails.medium.url;
    //     this.campaignids.channel_options.url = 'https://www.youtube.com/channel/'+ this.campaignids.channel_options.channelId;
    //     this.campaignids.options.viewsmaxcount = this.viewsMax;
    //     this.campaignids.options.viewsmincount = this.viewsMin;
    //   }
    //   axios
    //   .post("/channels", this.campaignids)
    //   .then((data) => {

    //     localStorage.removeItem("queryParams");
    //     setTimeout(
    //       () => this.redirectchannel(data),
    //     );
    //     this.loading = false;
    //   })
    //   .catch((err) => {
    //     this.$toast({
    //       component: ToastificationContent,
    //       props: {
    //         title: "Error in creating campaign",
    //         icon: "AlertTriangleIcon",
    //         variant: "danger",
    //       },
    //     });
    //     this.loading = false;
    //   });
    // },

    createCampaign() {
      this.calculateViews();
      const minimumBudget =
        this.campaignOptions.length *
        parseInt(this.settings.minimal_channel_budget);
      if (this.campaign.amount < minimumBudget) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Budget is less than the minimum required.",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
        return; // Do not proceed with campaign creation
      }
      this.loading = true;
      /*    this.campaign = [this.campaign]
      console.log(this.campaign) */
      this.views_proc = false;
      if (this.promoCodeDetails.calc_amount) {
        this.campaign.amount = this.promoCodeDetails.calc_amount;
      }
      if (Array.isArray(this.campaign.vid)) {
        this.campaignids.channel_campaigns = [];
        for (let v = 0; v < this.campaignOptions.length; v++) {
          let vid = {
            amount: this.campaign.amount / this.campaignOptions.length,
            options: this.campaignOptions[v],
            vid: this.campaign.vid[v],
          };
          this.campaignids.channel_campaigns.push(vid);
        }
        for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
          this.campaignids.channel_campaigns[i].options.viewsMin =
            this.campaign.options.viewsMin;
          this.campaignids.channel_campaigns[i].options.viewsMax =
            this.campaign.options.viewsMax;
          this.campaignids.channel_campaigns[i].options.viewsMinPromo =
            this.campaign.options.viewsMinPromo;
          this.campaignids.channel_campaigns[i].options.viewsMaxPromo =
            this.campaign.options.viewsMaxPromo;
          this.campaignids.channel_campaigns[i].options.viewsMinBase =
            this.campaign.options.viewsMinBase;
          this.campaignids.channel_campaigns[i].options.viewsMaxBase =
            this.campaign.options.viewsMaxBase;
          this.campaignids.channel_campaigns[i].options.viewsStop =
            this.campaign.options.viewsStop;
          this.campaignids.channel_campaigns[i].options.pricePerView =
            this.campaign.options.pricePerView;
        }
        if(this.promoCodeDetails)
        {
          for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
            this.campaignids.channel_campaigns[i].options.Promocode =
              this.promoCodeDetails;
          }
        }
        if (this.promoCodeDetails?.calc_amount) {
          this.campaign.amount = this.promoCodeDetails?.calc_amount;
        }
        if (this.campaign.options.agegroup == 0) {
          this.campaign.options.agegroup = this.allage;
        } else {
          for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
            this.campaignids.channel_campaigns[i].options.agegroup =
              this.campaign.options.agegroup;
          }
        }
        // if (this.campaign.options.topic?.length == 0) {
        //   this.campaignids.channel_campaigns.options.topic = this.campaign.options.topic =  this.allinterest;
        // }
        // else
        // {
        //   for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
        //   this.campaignids.channel_campaigns[i].options.topic = this.campaign.options.topic;
        // }
        // }

        if (this.campaign.options.countries.length > 0) {
          for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
            this.campaignids.channel_campaigns[i].options.countries =
              this.campaign.options.countries;
          }
        }
        if (this.campaign.options.gender) {
          for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
            this.campaignids.channel_campaigns[i].options.gender =
              this.campaign.options.gender;
          }
        }
        if (this.campaign.options.goal) {
          for (let i = 0; i < this.campaignids.channel_campaigns.length; i++) {
            this.campaignids.channel_campaigns[i].options.goal =
              this.campaign.options.goal;
          }
        }
        if (this.topic.length == 0) {
          this.topic = this.allinterest;
        } else if (this.topic.length > 0) {
          this.campaign.options.affinityAudienceIds = [];
          this.campaign.options.inMarketAudienceIds = [];
          for (let i = 0; i < this.topic.length; i++) {
            if (this.topic[i].affinityAudienceIds) {
              this.campaign.options.affinityAudienceIds.push(
                this.topic[i].affinityAudienceIds
              );
              for (
                let i = 0;
                i < this.campaignids.channel_campaigns.length;
                i++
              ) {
                this.campaignids.channel_campaigns[
                  i
                ].options.affinityAudienceIds =
                  this.campaign.options.affinityAudienceIds;
              }
            }
            if (this.topic[i].inMarketAudienceIds) {
              this.campaign.options.inMarketAudienceIds.push(
                this.topic[i].inMarketAudienceIds
              );
              for (
                let i = 0;
                i < this.campaignids.channel_campaigns.length;
                i++
              ) {
                this.campaignids.channel_campaigns[
                  i
                ].options.inMarketAudienceIds =
                  this.campaign.options.inMarketAudienceIds;
              }
            }
          }
        }
        this.campaignids.channel_id = this.channel_ids;
        this.campaignids.amount = this.campaign.amount;
        this.channelamount =
          this.campaignOptions.length / this.campaignids.amount;
        /* this.channel.snippet.thumbnails = this.channel.snippet.thumbnails.medium.url; */
        this.campaignids.channel_options.channelId =
          this.channel.snippet.channelId;
        this.campaignids.channel_options.channelTitle =
          this.channel.snippet.channelTitle;
        this.campaignids.channel_options.subs =
          this.campaign.options.subs_count_creating_campaign;
        this.campaignids.channel_options.src =
          this.channel.snippet.thumbnails.medium.url;
        this.campaignids.channel_options.url =
          "https://www.youtube.com/channel/" +
          this.campaignids.channel_options.channelId;
        this.campaignids.options.viewsmaxcount = this.viewsMax;
        this.campaignids.options.viewsmincount = this.viewsMin;
      }
      axios
        .post("/channels", {
          payload: crypt.encrypt(this.campaignids)
        })
        .then((data) => {
          this.loading = false;
          localStorage.removeItem("queryParams");

          setTimeout(() => this.redirectchannel(data));
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error in creating campaign",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
          this.loading = false;
        });
    },
    /*     redirect(data) {
      this.$router.push({
        name: "payment",
        params: { id: data.data.data.id },
      });
      this.loading = false;
    }, */
    redirectchannel(data) {
      this.$router.push({
        name: "channel-payment",
        params: { id: data.data.data.id },
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-slider.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
<style scoped>



@media (max-width: 992px) { 
  .approx-views {
    position: absolute;
    height: 42px;
    left: calc(10% + 10px);
    width: 75%;
    justify-content: center;
  }
  .viewseye {
    width: 16px;
    height: 11px;
    margin-right: 9px;
  }

  .stuck {
    position: fixed !important;
    top: 4.5rem;
    left: calc(-2% + 10px);
    width: 100%;
    justify-content: center;
  }

  .mobcols {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  .createbtncolor {
   background: #9B51E0 !important;
  }

  .promotextdanger {
  font-size: 14px;
  }  

  .text-danger{
    font-size: 11px !important;
  }

  .btncolor[data-v-2f6ab573] {
    max-width: 170%;
    width: auto;
  }

  .enterbudget {
  color: black;
  font-size: 23px !important;
  }

  .VideoList-button {
    padding: inherit !important;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
}




}

@media (max-width: 370px){

  .enterbudget {
  color: black;
  font-size: 1 rem !important;
  }

  .budgetborder{
    margin-left: -18px;
  }
  
  [dir=ltr] .approx-views[data-v-2f6ab573] {
    left: calc(10% + 5px);
  }

}

@media (min-width: 769px) and (max-width: 1038px) {
[dir] .card-body {
  padding: 0.05rem;
}

.titlecard[data-v-2f6ab573] {
  font-size: 16px !important;
}
}
@media (min-width: 769px) and (max-width: 1199px) {
  .w-32 {
  width: 32% !important;
}
}

@media (min-width: 322px) and (max-width: 375px) {
.enterbudget{
font-size: 20px !important;
}
}

@media (min-width: 486px) and (max-width: 767px) {
[dir] .card {
 align-items: center;
}

}

.alert .alert-body {
 padding: 0.71rem 1rem;
 margin-top: 27px;
}

@media (max-width: 280px){
.approx-views{
 width: 88% !important;
 left: calc(4% + 5px) !important;
}

.enterbudget{
    color: black;
    font-size: 19px !important;
}

.previewad1 {
  font-size: 18px;
}

}

@media screen and (min-width: 768px) and (max-width: 768px) {
.titlecard[data-v-2f6ab573] {
 font-size: 14px !important;
}
}

/* @media only screen and (max-width: 767px){
  .channel-add-video-page{
    background: #41d67c;
  }
} */

@media only screen and (max-width: 767px){
  .vedioList-input-button{
  padding: 11px 31px 11px 30px !important;
}

.VideoList-submittwo{
  min-height: 48px !important;
}
} 

.alert .alert-body{
  margin-top: 63px;
}

.itable {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 0.6rem;
}
.itable > .custom-checkbox.custom-control {
  margin-bottom: 10px;
}
/* .breaker {
  border-bottom: 1px solid rgb(173, 169, 169);
  max-width: 110%;
} */
.buttons {
  display: flex;
  justify-content: space-around;
  padding-left: 5px;
  padding-right: 5px;
  color:#fff;
  font-size: 17px;
  font-weight: 700;
}
.promotext {
  color: rgba(155, 81, 224, 1);
  font-weight: bold;
  font-size: 17px;
}
.promotextdanger {
  color: rgb(158, 151, 244);
  font-size: 17px;
  font-weight: 700;
  color: #9B51E0;
}
.btncolor {
  /*   border-color: rgba(155, 81, 224, 1);
  background-color: rgba(155, 81, 224, 1); */
  /* max-width: 104%; */
  width: auto;
  border-radius: 16px;
  border-radius: 10px;
  background: #9B51E0 !important;
  color: #fff !important;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
}

.location {
  position: absolute;
  margin: 25px;
}

.promo-background {
  background-color: rgba(155, 81, 224, 0.15);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 23px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #9B51E0;
}


.promocodecard {
  /* -webkit-box-shadow: 0 4px 24px 0 rgba(155, 81, 224, 1) !important; */
  /* box-shadow: 0 4px 24px 0 rgba(155, 81, 224, 1)!important; */
  border-radius: 20px;
  margin-bottom: 0;
  border: solid 1px rgba(155, 81, 224, 1);
}

/* .scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgb(239, 237, 253);
  -webkit-box-shadow: inset 0 0 6px rgb(239, 237, 253);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scrollbar::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(192, 163, 219)),
    color-stop(0.72, rgb(192, 163, 219)),
    color-stop(0.86, rgb(192, 163, 219))
  );
}
.scrollheight {
  height: 340px;
  padding-right: 10px;
} */

.videocard {
  border-radius: 20px;
  height: 38vh;
  overflow: auto;
}
.mulvideocard {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-height: 360px;
  overflow-y: auto;
}

.videoCardApproxViews {
  border-radius: 20px;
  background: #9B51E0;
}

.channelcard {
  border-radius: 20px;
}

.videocardimg {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.channelvideocardimg {
  width: 65px;
  float: left;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.channelvideolisttitle {
  margin-top: 10px;
  color: black;
  font-size: 15px;
  font-weight: 600;
}

.besides {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.titlecard {
  color: white;
  font-size: 20px;
}
.channeltitlecard {
  color: black;
  font-size: 15px;
}

.enterbudget {
  color: black;
  font-size: 30px;
}

.inputbudget {
  background-color: #ffffff;
  border-radius: 20px;
  color: black;
  font-size: 19px;
  padding: 34px;
  padding-left: 60px;
  width: 100%;
}

.youtube {
  left: 49px;
  top: 24px;
  position: absolute;
}

.alteroffer {
  border-radius: 10px;
  padding: 5px;
}

.acceptofferbutton {
  border-radius: 9px;
  padding-top: 13px;
  padding-bottom: 11px;
}

.alertoffer {
  padding-top: 7px;
  padding-bottom: 7px;
}

.alertoffersection {
  border-radius: 17px;
}

.VideoList-button {
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  position: relative;
  z-index: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 58px;
  padding: 17px 30px;

  border: none;
  border-radius: 17px;
  color: #fff;
  cursor: pointer;
}

.VideoList-button:focus {
  outline: none;
}

.VideoList-button[data-v-6bd6a610] {
  font-weight: 500;
  font-size: 15px;
  line-height: 104%;
  position: relative;
  z-index: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 16px;
  min-height: 58px;
  /* background-color: #8e56e9; */
  /* background-image: linear-gradient(90deg,#a36bff 1%,#8732f4); */
  /* box-shadow: 0 4px 12px rgba(142,86,233,.4); */
  color: #fff;
  /* transition: box-shadow .2s ease-out,background-color .2s ease-out,color .2s ease-out; */
}
@media only screen and (min-width: 844px) {
  .VideoList-submit {
    flex-shrink: 0;
    margin-top: 0;
    right:8px;
    min-width: 190px;
    width: auto;
    height: auto;
  }
}
.vedioList-input-button-container {
  position: relative;
  width: 100%;
}
.vedioList-input-button {
  font-size: 16px;
  line-height: 100%;
  padding: 17px 40px 14px 30px;
  width: 90%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 19px;
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
@media only screen and (min-width: 768px) {
  .input-with-button {
    display: flex;
    padding-top: 4px;
    padding-right: 1px;
    padding-bottom: 4px;
    height: 66px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 3px 16px rgba(110, 125, 177, 0.28);
    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  }
}
.input-with-button{
   display: flex;
   align-items: flex-start;
  }
.input-with-button__cancel {
  margin: 0;
  padding: 0;
  outline: none !important;
  border: none;
  background: none;
  cursor: pointer;
  color: #dee1ff;
  transition: color 0.2s ease-out;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  align-items: center;
  width: 40px;
  height: 100%;
}


.promocodewarn {
  text-align: center;
  margin-top: 11px;
}

.promocodepadding {
  padding: 39px;
}

.vs__selected-options {
  padding: 0 5px !important;
}

:root {
  --bg: blue;
  --bg-border: black;
}

.steps {
  padding: 20px;
  border-radius: 39px !important;
  border: 0px;
}
.line {
  height: 4px;
  width: 150px;
  background-color: rgb(192, 184, 184);
  position: relative;
  left: 245px;
  top: -21px;
}
.line2 {
  height: 4px;
  width: 129px;
  background-color: rgb(192, 184, 184);
  position: relative;
  left: 290px;
  top: -21px;
}
.line3 {
  height: 4px;
  width: 150px;
  background-color: rgba(155, 81, 224, 1);
  position: relative;
  left: 245px;
  top: -21px;
}

.steptext {
  color: rgba(155, 81, 224, 1);
  font-size: 18px;
  position: relative;
  font-weight: bold;
  left: 13px;
  top: 3px;
}

.steptextgray {
  font-size: 18px;
  position: relative;
  font-weight: bold;
  left: 13px;
  top: 3px;
}

.startpromotion {
  position: relative;
  left: 120px;
}
.startpromotion1 {
  position: relative;
  left: 50px;
}
.headingcheck {
  font-weight: bold;
  position: relative;
  top: 25px;
  font-size: 18px;
  color: black;
}

.checkboxhead {
  font-size: 19px;
  color: #1d1b28;
  position: relative;
  top: -2px;
}

@media only screen and (min-width: 1700px) and (max-width: 1850px) {
  .line {
    height: 4px;
    width: 114px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 250px;
    top: -21px;
  }
  .line2 {
    height: 4px;
    width: 95px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 300px;
    top: -21px;
  }
  .line3 {
    height: 4px;
    width: 114px;
    background-color: rgba(155, 81, 224, 1);
    position: relative;
    left: 250px;
    top: -21px;
  }
}
@media only screen and (min-width: 1500px) and (max-width: 1699px) {
  .line {
    height: 4px;
    width: 86px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 204px;
    top: -17px;
  }
  .line2 {
    height: 4px;
    width: 73px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 246px;
    top: -17px;
  }

  .line3 {
    height: 4px;
    width: 86px;
    background-color: rgba(155, 81, 224, 1);
    position: relative;
    left: 204px;
    top: -17px;
  }

  .custom-size {
    display: none;
  }
  .steptext {
    color: rgba(155, 81, 224, 1);
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }
  .steptextgray {
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }

  .steps {
    padding: 14px;
    border-radius: 39px;
    border: 0px;
  }
  .stepsmain {
    margin-left: 26px;
  }
}
@media only screen and (min-width: 1300px) and (max-width: 1499px) {
  .line {
    height: 4px;
    width: 86px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 170px;
    top: -14px;
  }
  .line2 {
    height: 4px;
    width: 73px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 208px;
    top: -13px;
  }

  .line3 {
    height: 4px;
    width: 86px;
    background-color: rgba(155, 81, 224, 1);
    position: relative;
    left: 170px;
    top: -14px;
  }

  .custom-size {
    display: none;
  }
  .steptext {
    color: rgba(155, 81, 224, 1);
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }
  .steptextgray {
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }

  .steps {
    padding: 14px;
    border-radius: 39px;
    border: 0px;
  }

  .stepsmain {
    margin-left: 8px;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1399px) {
  .line {
    height: 4px;
    width: 61px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 154px;
    top: -14px;
  }
  .line2 {
    height: 4px;
    width: 54px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 201px;
    top: -13px;
  }

  .line3 {
    height: 4px;
    width: 61px;
    background-color: rgba(155, 81, 224, 1);
    position: relative;
    left: 154px;
    top: -14px;
  }

  .custom-size {
    display: none;
  }
  .steptext {
    color: rgba(155, 81, 224, 1);
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }
  .steptextgray {
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }

  .steps {
    padding: 14px;
    border-radius: 39px;
    border: 0px;
  }
  .stepsmain {
    margin-left: 1px;
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1299px) {
  .line {
    height: 4px;
    width: 61px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 154px;
    top: -14px;
  }
  .line2 {
    height: 4px;
    width: 54px;
    background-color: rgb(192, 184, 184);
    position: relative;
    left: 201px;
    top: -13px;
  }
  .line3 {
    height: 4px;
    width: 61px;
    background-color: rgba(155, 81, 224, 1);
    position: relative;
    left: 154px;
    top: -14px;
  }
  .custom-size {
    display: none;
  }
  .steptext {
    color: rgba(155, 81, 224, 1);
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }
  .steptextgray {
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
  }

  .steps {
    padding: 14px;
    border-radius: 39px;
    border: 0px;
  }
  .stepsmain {
    margin-left: 1px;
  }
}

@media only screen and (max-width: 500px) {
  .promotext[data-v-2f6ab573] {
    font-weight: bold;
    font-size: 13px;
}
.promotextdanger[data-v-2f6ab573] {
  font-size: 14px;
}
}

@media only screen and (min-width: 447px) and (max-width: 992px) {
.btncolor{
max-width: 130%;
width: auto;
}
}

@media only screen and (min-width: 360px) and (max-width: 580px) {
.btncolor[data-v-2f6ab573][data-v-2f6ab573] {
max-width: 130%;
width: auto;
}
}

@media only screen and (max-width: 500px) {
  .promotext[data-v-2f6ab573] {
    font-weight: bold;
    font-size: 13px;
}
.promotextdanger[data-v-2f6ab573] {
  font-size: 14px;
}
}

@media only screen and (min-width: 447px) and (max-width: 992px) {
.btncolor{
max-width: 130%;
width: auto;
}
}

@media only screen and (min-width: 360px) and (max-width: 580px) {
.btncolor[data-v-2f6ab573][data-v-2f6ab573] {
max-width: 130%;
width: auto;
}
}

@media only screen and (max-width: 999px) {
  /*   .line{
  height: 4px;
  width: 86px;
  background-color: rgb(192, 184, 184);
  position: relative;
    left: 243px;
    top: -21px;
}
.line2{
  height: 4px;
  width: 73px;
  background-color: rgb(192, 184, 184);
  position: relative;
    left: 290px;
    top: -21px;
}
.steps{
    padding: 12px;
    border-radius: 39px;
    border: 0px;
}

.steptext{
    color: rgba(155, 81, 224, 1);
    font-size: 13px;
    position: relative;
    font-weight: bold;
    top: 3px;
    left: 7px;
} */
  .mobilesteps {
    display: none;
  }

  .hrline {
    display: none;
  }
}

@media only screen and (max-width: 444px) {
  .buttons{
    font-size: 13px;
    font-weight: 700;
}
}

@media only screen and (max-width: 336px) {
  .buttons{
    font-size: 10px;
    font-weight: 700;
}
}

@media only screen and (max-width: 844px) {
  .mobilesteps {
    display: none;
  }
  /*  .mobileslider {
    margin-top: 144px;
  } */
  .mobileyoutube {
    position: relative;
    left: -116px;
    margin-top: -4px;
  }
  .mobilebudget {
    position: relative;
    left: -74px;
    /* top: 18px; */
  }
  @media only screen and (max-width: 415px){
    .mobilebudget{
      left: -60px;
      top: 5px
    }
    .enterbudget{
      font-size: 25px;
    }
    /* .centerdiv{
      padding-left: 5px;
    } */
  }
  .mobileinputbudget {
    /* padding-left: 100px; */
    /* padding: 25px; */
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: -19px;
    width: 138px;
  }

  .mobileoffer {
    position: relative;
    left: -45px;
    top: 13px;
  }
  .hrline {
    display: none;
  }
}

/* @media only screen and (min-width: 650px) and (max-width: 767px) {
  .mobileslider {
    margin-top: 225px;
  }
} */

.checkicon {
  position: relative;
  top: 1px;
  left: 35px;
  color: white;
}

.stepsmain {
  position: relative;
  left: -31px;
}

.custom-size {
  width: 30px; /* Define the desired width */
  height: 30px; /* Define the desired height */
}

.applypendingd {
  margin-top: 5px;
}

.main-container {
  /*  width: 100%;
  height: 100vh; */
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.check-container {
  width: 4.25rem;
  height: 5.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin-top: -13px;
  margin-bottom: -27px;
}

.check-container .check-background {
  width: 100%;
  height: calc(100% - 1.25rem);
  background: linear-gradient(to bottom right, #5de593, #41d67c);
  box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  transform: scale(0.5);
  border-radius: 50%;
  animation: animateContainer 0.75s ease-out forwards 0.75s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.check-container .check-background svg {
  width: 65%;
  transform: translateY(0.25rem);
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: animateCheck 0.35s forwards 1.25s ease-out;
}

/* .check-container .check-shadow {
  bottom: calc(-15% - 5px);
  left: 0;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
  animation: animateShadow 0.75s ease-out forwards 0.75s;
} */
@keyframes animateContainer {
  0% {
    opacity: 0;
    transform: scale(0);
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  25% {
    opacity: 1;
    transform: scale(0.9);
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  43.75% {
    transform: scale(1.15);
    box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  62.5% {
    transform: scale(1);
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
  }
  81.25% {
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
  }
  100% {
    opacity: 1;
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
  }
}

@keyframes animateCheck {
  from {
    stroke-dashoffset: 80;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes animateShadow {
  0% {
    opacity: 0;
    width: 100%;
    height: 15%;
  }
  25% {
    opacity: 0.25;
  }
  43.75% {
    width: 40%;
    height: 7%;
    opacity: 0.35;
  }
  100% {
    width: 85%;
    height: 15%;
    opacity: 0.25;
  }
}

.countryselect {
  /* -webkit-box-shadow: 0 4px 24px 0 rgba(155, 81, 224, 1) !important; */
  box-shadow: 0 4px 24px 0 rgba(45, 53, 59, 0.123) !important;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 0;
}

.budgetborder {
  box-shadow: 0 4px 24px 0 rgba(45, 53, 59, 0.123) !important;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 0;
  border: none;
  font-weight: 800;
}

.previewad {
  border-radius: 17px;
  border-color: rgb(241 226 255 / 52%) !important;
}

.previewad1 {
  border-radius: 17px;
  border: 0px solid;
  background-color: transparent;
  
}

.optionalsetp {
  border-radius: 13px;
}

.channelimg {
  width: 85px;
  float: left;
}

.videolisttitle {
  color: #263238;
  font-size: 17px;
  font-weight: 500;
  margin-left: 10px;
  float: left;
}

.videolisttitle1 {
  color: #263238;
  font-size: 17px;
  font-weight: 500;
  /* margin-left: 16px;
  float: left; */
  /* margin-top: 8px */
}

.videolisttitle2 {
  color: #263238;
  font-size: 17px;
  font-weight: 500;
  /* margin-left: 16px;
  float: left; */
  margin-top: 10px;
  text-align: center;
}
@media screen and (min-width: 768px) and (max-width: 1508px) {
  .channel-name-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

@media screen and (min-width: 768px) and (max-width: 1400px) {
  .channel-name-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .videolisttitle {
    margin-left: 0;
  }
}
.eachCard:not(:last-child) {
  margin-bottom: 5px;
}
.eachCard {

  margin: 6px 6px 6px 6px;
  border-radius: 17px;
  display: flex;
  align-items: center;
}
.title-and-cross-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

@media screen and (max-width: 1100px) {
  .title-and-cross-wrapper {
    /* display:flex;
justify-content:space-between; 
align-items:center; */
    /* padding: 6px; */
    margin: -15px;
  }
}
@media screen and (max-width: 800px) {
  .title-and-cross-wrapper {
    margin: -17px;
  }
}
/* @media screen and (max-width: 1700px) {
.eachCard{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.channelvideocardimg {
  width: 90%;
}

.title-and-cross-wrapper{
flex-direction: column;
padding: 0 10px;
font-size: 10px;
}
.cross-icon{
  margin:10px;  
  transform: scale(1.5);
}
.channelvideolisttitle{
font-size: 13px;
}

} */

.loader-demo-box {
  border-radius: 0.25rem !important;
}

.loader-demo-box {
  width: 100%;
  height: 200px;
}
.stepsmain1 {
  position: sticky;
  top: 63px;
  z-index: 6;
  background-color: #f8f8f8;
  padding-top: 10px;
  padding-bottom: 10px;
  /* border: 1px solid; */
  border-top: 1px solid #80808021;
  border-bottom: 1px solid #80808021;
}
/* .leftsection {
  top: 158px;
}
 */
.jumping-dots-loader {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}
.steps1 {
  border-radius: 25px;
  padding: 20px;
  background-color: transparent !important;
  margin-right: 5px;
}

.jumping-dots-loader span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: rgba(155, 81, 224, 1);
  margin: 35px 5px;
}

.jumping-dots-loader span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}

.jumping-dots-loader span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}

.jumping-dots-loader span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}

@keyframes bounce {
  0%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25% {
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}

.checkicon1 {
  position: relative;
  color: rgb(0, 0, 0);
  left: 27px;
}

.custom-size1 {
  width: 15px;
  height: 15px;
}

.steptext1 {
  font-size: 18px;
  font-weight: 500;
}

.steptextgray1 {
  font-size: 18px;
  font-weight: 500;
}

.line-s {
  position: relative;
  left: 252px;
  top: -21px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 35%;
}

.line2-s {
  position: relative;
  left: 227px;
  top: -21px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 42%;
}

.line3-s {
  position: relative;
  left: 300px;
  top: -21px;
  border: none;
  border-top: 2px dotted #82868b;
  height: 2px;
  width: 55%;
}

.startpromotion-s {
  position: relative;
  left: 120px;
}
@media only screen and (min-width: 1540px) and (max-width: 1718px) {
  .line-s {
    position: relative;
    left: 250px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }

  .line2-s {
    position: relative;
    left: 227px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }

  .line3-s {
    position: relative;
    left: 300px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 45%;
  }
}

@media only screen and (min-width: 1429px) and (max-width: 1539px) {
  .line-s {
    position: relative;
    left: 235px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }

  .line2-s {
    position: relative;
    left: 207px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }

  .line3-s {
    position: relative;
    left: 274px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 40%;
  }
  .startpromotion-s {
    position: relative;
    left: 100px;
  }
  .steptext1 {
    font-size: 16px;
  }
  .steptextgray1 {
    font-size: 16px;
  }
}

@media only screen and (min-width: 1335px) and (max-width: 1428px) {
  .line-s {
    position: relative;
    left: 220px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 15%;
  }

  .line2-s {
    position: relative;
    left: 193px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }

  .line3-s {
    position: relative;
    left: 240px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 35%;
  }
  .startpromotion-s {
    position: relative;
    left: 50px;
  }
  .steptext1 {
    font-size: 14px;
  }
  .steptextgray1 {
    font-size: 14px;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1334px) {
  .line-s {
    position: relative;
    left: 210px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 15%;
  }

  .line2-s {
    position: relative;
    left: 193px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }

  .line3-s {
    position: relative;
    left: 198px;
    top: -45px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 35%;
  }
  .startpromotion-s {
    position: relative;
    left: 40px;
  }
  .steptext1 {
    font-size: 14px;
  }
  .steptextgray1 {
    font-size: 14px;
  }
}

@media only screen and (min-width: 1168px) and (max-width: 1199px) {
  .line-s {
    position: relative;
    left: 230px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }

  .line2-s {
    position: relative;
    left: 200px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 30%;
  }

  .line3-s {
    position: relative;
    left: 270px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }
  .startpromotion-s {
    position: relative;
    left: 40px;
  }
  .steptext1 {
    font-size: 14px;
  }
  .steptextgray1 {
    font-size: 14px;
  }
}

@media only screen and (min-width: 300px) and (max-width: 320px) {
.enterbudget{
  margin-top:8px !important;
}
}

@media only screen and (min-width: 322px) and (max-width: 342px) {
.enterbudget{
  font-size: 23px !important;
  margin-top: 8px !important;
}
}

@media only screen and (min-width: 342px) and (max-width: 366px) {
.enterbudget{
  font-size: 18px !important;
  margin-top: 10px !important;
}
}

@media only screen and (min-width: 981px) and (max-width: 1167px) {
  .line-s {
    position: relative;
    left: 200px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }

  .line2-s {
    position: relative;
    left: 185px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 23%;
  }

  .line3-s {
    position: relative;
    left: 220px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .startpromotion-s {
    position: relative;
    left: 40px;
  }
  .steptext1 {
    font-size: 12px;
  }
  .steptextgray1 {
    font-size: 12px;
  }
}

@media only screen and (min-width: 845px) and (max-width: 980px) {
  .line-s {
    position: relative;
    left: 175px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 20%;
  }

  .line2-s {
    position: relative;
    left: 170px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 23%;
  }

  .line3-s {
    position: relative;
    left: 200px;
    top: -21px;
    border: none;
    border-top: 2px dotted #82868b;
    height: 2px;
    width: 25%;
  }
  .startpromotion-s {
    position: relative;
    left: 40px;
  }
  .steptext1 {
    font-size: 10px;
  }
  .steptextgray1 {
    font-size: 10px;
  }
}
.selectmanually {
  border-radius: 17px;
  border: 3px solid; /* Replace #FF0000 with your desired border color */
  background-color: rgba(155, 81, 224, 0.315) !important;
  border-color: rgba(241, 226, 255, 0.315) !important;
}
/* .modaltargetting {
  border-radius: 3.358rem !important;
} */
.modaltargetinner {
  padding: 17px;
}
@media only screen and (max-width: 844px) {
  .stepsmain1 {
    display: none;
  }
}

/* .besides .btn-outline-primary {
  border-top-right-radius: 20px !important; 
  border-top-left-radius: 20px !important;
      border-top-left-radius: 13px;
    border-bottom-left-radius: 13px;
} */
/* .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .btn-outline-primary:not(:disabled):not(.disabled):focus {border-bottom-left-radius: 13px;} */
/* [dir] .btn {border-radius: 13px !important;} */
</style>

<style lang="scss">
    .countryselect .vs__selected-options {
        padding: 0px 50px !important;
    }

    .collapse-margin {
        .card {
            margin-top: 0.71rem;
            margin-bottom: 0.71rem;
            border-radius: 15px;
            border-bottom: 0 solid transparent !important;
        }

        .card-header {
            border-radius: 0.358rem;
        }
    }

    [dir=ltr] .btn-group>.btn:not(:first-child),
    [dir=ltr] .btn-group>.btn-group:not(:first-child) {
        margin-left: 5px;
        border-top-left-radius: 12px !important;
        border-bottom-left-radius: 12px !important;
        border-top-right-radius: 12px !important;
        border-bottom-right-radius: 12px !important;
        margin-top: 10px !important;
    }

    [dir=ltr] .btn-group>.btn:not(:last-child):not(.dropdown-toggle),
    [dir=ltr] .btn-group>.btn-group:not(:last-child)>.btn {
        border-top-right-radius: 12px !important;
        border-bottom-right-radius: 12px !important;
        margin-top: 10px !important;
    }

    [dir=ltr] .btn-group-toggle [class*=btn-outline-]:not(:last-child) {
        border-right-width: 1px !important;
    }

    [dir] .vue-slider-dot-handle {
        fill: #ffff;
        stroke-width: 2.5px;
        stroke: #E0E0E0;
        filter: drop-shadow(0px 0px 20px #9B51E0);
    }

    .v-select:not(.vs--single) .vs__selected {
        color: var(--neutrals-gray-1, #333);
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.36px;
    }

    [dir] .v-select:not(.vs--single) .vs__selected {
        border-radius: 7px;
    }

    [dir] .b-form-tags .b-form-tags-list .b-from-tags-field,
    [dir] .b-form-tags .b-form-tags-list .b-form-tag {
        margin-top: 0.25rem;
        color: var(--neutrals-gray-1, #333);
        font-weight: 600;

    }

    [dir] .b-form-tag {
        background: rgba(155, 81, 224, 0.10);
    }

    [dir] .vs__open-indicator {
        margin-right: 12px;
    }

    [dir=ltr] .vs__clear {
        margin-right: 8px;
        display: none;
    }

    [dir] .btn-block+.btn-block {
        margin-top: inherit;
    }
    .countryselect {
      .vs__dropdown-toggle {
        min-height: 70px;
      }
      .vs__selected {
        border: 1px solid var(--standard-purple-1, #9B51E0) !important;
        background: rgba(155, 81, 224, 0.10) !important;
      }
    }
</style>