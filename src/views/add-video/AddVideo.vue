<template>
  <div>
    <b-col class="d-none d-md-block position-fixed w-25">
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

        <b-card v-if="videoData" class="videocard shadow-lg bg-white" no-body>
          <b-img
            class="mw-100 videocardimg"
            :src="videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url"
            alt="Video thumbnail"
          />
          <b-card-body v-if="videoData">
            <div
              v-b-popover.hover.top="videoData.snippet.title"
              class="titlecard desktop-video-title font-weight-bold"
            >
              {{ videoData.snippet.title.substr(0, 40)
              }}<span v-if="videoData.snippet.title.length > 40">...</span>
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
        </b-card>
        <b-card class="p-1 videocard text-center shadow-lg bg-primary">
          <div class="titlecard">Estimated View Count</div>
          <div class="mt-1">
            <h2
              v-if="campaign.options.viewsMin && campaign.options.viewsMax"
              style="font-size: 30px"
              class="d-inline mr-25 titlecard"
            >
              <!-- <feather-icon icon="EyeIcon" size="21" /> -->
              {{ campaign.options.viewsMin }} -
              {{ campaign.options.viewsMax }}
            </h2>

            <h2 v-else style="font-size: 30px" class="d-inline mr-25 titlecard">
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
                      campaign.options.viewsMin - campaign.options.viewsMinBase
                    }}
                    -
                    {{
                      campaign.options.viewsMax - campaign.options.viewsMaxBase
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

    <div class="w-100 d-md-none">
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
          <b-row class="mb-1">
            <b-col cols="6">
              <div class="bg-light-primary text-center mt-1">
                <b-img
                  class="mw-100"
                  :src="videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url"
                  alt="Video Thumbnail"
                />
              </div>
            </b-col>
            <b-col cols="6" class="p-0">
              <b-card-title class="mb-0">
                {{ videoData.snippet.title.substr(0, 60)
                }}<span v-if="videoData.snippet.title.length > 60">...</span>
              </b-card-title>
            </b-col>
          </b-row>
          <div :class="{ 'stuck': isSticky }">
          <div class="bg-gradient-primary  rounded d-flex approx-views">
            <img src="@/assets/images/icons/viewseye.png" class="viewseye my-auto " />
            <p class="my-auto" style="color: #fff; font-size: 12px; font-weight: 400;">Approx Views</p>
            <h2
                v-if="campaign.options.viewsMin && campaign.options.viewsMax"
                style="color: #fff; font-size: 12px"
                class="d-inline mr-25 my-auto"
              >
                {{ campaign.options.viewsMin }} -
                {{ campaign.options.viewsMax }}
              </h2>
              <h2
                v-else
                style="color: #fff; font-size: 20px;font-weight: 700; margin-left: 10px;"
                class="d-inline mr-25 my-auto"
              >
                0
              </h2>
            <!-- <b-badge
              style="color: #fff; font-size: 10px"
              variant="dark-primary"
              pill
            >
              Approx Views
            </b-badge> -->
            <!-- <div>
              <h2
                v-if="campaign.options.viewsMin && campaign.options.viewsMax"
                style="color: #fff; font-size: 15px"
                class="d-inline mr-25"
              >
                {{ campaign.options.viewsMin }} -
                {{ campaign.options.viewsMax }}
              </h2>
              <h2
                v-else
                style="color: #fff; font-size: 30px"
                class="d-inline mr-25"
              >
                0
              </h2>
            </div> -->
            </div>  
          </div>
        </b-card>
      </b-skeleton-wrapper>
    </div>

    <b-col offset-md="4" md="8">
      <hr class="hrline" />
      <div class="row mobilesteps stepsmain w-100">
        <b-col>
          <feather-icon class="checkicon custom-size" icon="CheckIcon" />
          <b-button
            variant="primary"
            class="btn-primary steps shadow-lg bg-white"
            style="cursor: default"
          ></b-button>
          <span class="steptext">Paste URL link</span>

          <div v-if="gender" class="line3"></div>
          <div v-else class="line"></div>
        </b-col>

        <b-col class="startpromotion1">
          <div v-if="gender">
            <feather-icon class="checkicon custom-size" icon="CheckIcon" />
            <b-button
              variant="primary"
              class="btn-primary steps shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptext">Set target Audience</span>
            <div class="line2"></div>
          </div>
          <div v-else>
            <feather-icon class="checkicon custom-size" icon="CheckIcon" />
            <b-button
              class="btn-primary steps shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptextgray">Set target Audience</span>
            <div class="line2"></div>
          </div>
        </b-col>
        <b-col class="startpromotion">
          <!-- <div>
            <b-button variant="primary" class="btn-primary steps shadow-lg bg-white"></b-button>
          <span class="steptext">Start promotion</span>
          </div> -->
          <div>
            <feather-icon class="checkicon custom-size" icon="CheckIcon" />
            <b-button
              class="btn-primary steps shadow-lg bg-white"
              style="cursor: default"
            ></b-button>
            <span class="steptextgray">Start promotion</span>
          </div>
        </b-col>
      </div>
      <!-- slider section start -->
      <div class="mb-2">
        <hr />
        <validation-provider
          :rules="
            'required|min_value: ' +
            parseInt(settings.minimal_budget) +
            ' |integer'
          "
          v-slot="{ errors }"
          name="budget"
        >
        <div class="row mb-3">
          <b-col cols="9" class="Gfold">
            <h6 class="mt-1 enterbudget">Enter your Budget</h6>
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
              <small v-if="errors.length > 0" class="text-danger d-none d-lg-block d-md-block">{{
                errors[0]
              }}</small>
          </b-col>
        </div>
        <div style="text-align: center;" class="d-lg-none d-md-none">
          <small v-if="errors.length > 0" class="text-danger">{{errors[0]}}</small>
        </div>
      </validation-provider>
        <vue-slider
          class="mt-2 px-1"
          v-model="campaign.amount"
          :direction="direction"
          :min="parseInt(settings.minimal_budget)"
          :max="maxBudget"
          :dot-size="30"
          :marks="budgetMarkers"
          :height="12"
          tooltip="always"
          :class="
            campaign.amount < settings.minimal_budget
              ? 'vue-slider-danger'
              : null
          "
        />
        <b-alert
          class="mt-3 alertoffersection"
          variant="danger"
          v-if="showOfferBox && !promoCodeDetails.id && offer && !promoCode"
          show
        >
          <div class="alert-body alertoffer d-flex align-items-center justify-content-between">
            <span
              class="alertoffertext col-lg-10 col-md-10">Spend
              <strong>${{ parseInt(offer.min_amount) - campaign.amount }}</strong>
              more and get
              <strong v-if="parseInt(offer.discount)">{{ parseInt(offer.discount) }}% discount!</strong>
              <strong v-else-if="!offer.calc_amount">{{ parseInt(offer.views_proc) }}% more views for FREE!</strong>
              
              </span>
              <div>
              <b-button
                class="btn-sm acceptofferbutton shadow-lg get_10 d-none d-lg-block d-md-block"
                href="#"
                variant="light"
                @click="acceptOffer"
                >Accept Offer</b-button  
              >
              </div>
              <!-- for mobile -->
              <b-button
                class="btn-sm acceptofferbutton shadow-lg get_10 d-md-none d-lg-none"
                href="#"
                variant="light"
                @click="acceptOffer"
                >Accept Offer</b-button  
              >
          </div>
        </b-alert>

        <b-alert
          class="mt-3 alertoffersection"
          variant="warning"
          v-else-if="showOfferBox && promoCodeDetails.id && offer"
          show
        >
          <div class="alert-body alertoffer">
            <div class="row d-flex get_20 justify-content-between">
              <b-col>
                <div class="col-10">
                <span>
                  You're getting
                  <strong v-if="parseInt(promoCodeDetails.discount)">{{ parseInt(promoCodeDetails.discount) }}% discount</strong>
                  <strong v-else-if="!promoCodeDetails.calc_amount">between {{ parseInt(campaign.options.viewsMinPromo) }} and {{ parseInt(campaign.options.viewsMaxPromo) }} extra views</strong>
                  towards your campaign, but spend
                  <strong>${{ parseInt(offer.min_amount) - campaign.amount }}</strong>
                  more and get
                  <strong v-if="parseInt(offer.discount)">
                    {{ parseInt(offer.discount) }}% discount!
                  </strong>
                  <strong v-else-if="!offer.calc_amount">
                    {{ parseInt(offer.views_proc) }}% more views for FREE!
                  </strong>
                </span>
                </div>
              </b-col>
              <b-col class="mobileoffer d-none d-lg-block d-md-block col-2 offerbtn my-auto text-right">
                <b-button
                  class="ml-50 btn-sm acceptofferbutton shadow-lg "
                  variant="light"
                  href="#"
                  @click="acceptOffer"
                  >Accept Offer</b-button
                >
              </b-col>
              <!-- for mobile -->
              <b-col class="mobileoffer d-md-none d-lg-none">
                <b-button
                  class="ml-50 btn-sm acceptofferbutton shadow-lg"
                  variant="light"
                  href="#"
                  @click="acceptOffer"
                  >Accept Offer</b-button
                >
              </b-col>
            </div>
          </div>
        </b-alert>

        <!-- <b-alert class="mt-3 alertoffersection" variant="success" v-else-if="showOfferBox && !offer && (promoCodeDetails.calc_amount || !promoCodeDetails.views_proc)" show>
          <div class="alert-body">
            <span>
              You will be charged
              <span style="font-size: 14px"><b>${{ promoCodeDetails.calc_amount }}</b></span>
              for this Campaign.
            </span>
          </div>
        </b-alert> -->

        <b-alert class="mt-3 alertoffersection" variant="success" v-else-if="showOfferBox && !offer && !promoCodeDetails.calc_amount && campaign.options.viewsMinPromo" show>
          <div class="alert-body">
            <span>
              Congratulations, you're getting between
              <strong>{{ parseInt(campaign.options.viewsMinPromo) }} and {{ parseInt(campaign.options.viewsMaxPromo) }} extra views</strong>
              towards your campaign!
            </span>
          </div>
        </b-alert>
      </div>
      <hr />
      <!-- slider -->

      <!-- promocode start -->

      <div class="mt-4">
        <p class="mcoupon">Use Coupon Code</p>
        <validation-observer ref="applyPromoCodeForm" #default="{ invalid }">
          <b-form class="mt-2" @submit.prevent="applyPromoCode">
            <!-- email -->
            <div class="input-with-buttonz">
              <validation-provider
                #default="{ errors }"
                name="Promocode"
                rules="min:4"
                class="w-100"
              >
                <div class="d-flex">
                  <b-form-input
                    class="vedioList-input-button col-11"
                    v-model="promoCode"
                    :state="errors.length > 0 ? false : null"
                    placeholder=" %  Apply Promocode"
                  />
                </div>
                <div class="promocodewarn">
                  <small class="text-danger">{{ errors[0] }}</small>
                </div>
              </validation-provider>
              <b-button
                type="submit"
                :disabled="invalid || promoCodeLoading || !promoCode"
                class="VideoList-button VideoList-submit d-none d-lg-block"
              >
                <b-spinner v-if="promoCodeLoading" small />
                <span v-else style="font-size: 18px;font-weight: 700;">Apply Code</span>
              </b-button>

               <!-- for mobile -->
              <b-button
                type="submit"
                variant="primary"
                :disabled="invalid || promoCodeLoading || !promoCode"
                class="VideoList-button VideoList-submit d-lg-none d-md-none mb-2"
              >
                <b-spinner v-if="promoCodeLoading" small />
                <span v-else style="font-size: 18px;font-weight: 700;">Apply</span>
              </b-button>
                 <!-- for tablet -->
                 <b-button
                type="submit"
                variant="primary"
                :disabled="invalid || !promoCode"
                class="VideoList-button VideoList-submit d-none d-md-block d-lg-none mb-2"
                style="margin-right: 5px;"
              >
                <span style="font-size: 18px;font-weight: 700;">Apply</span>
              </b-button>
            </div>
            <b-form-group  v-if="campaign.amount > 0">
              <div class="overflow-auto scrollbar">
                <div class="scrollheight mt-1">
                  <span v-if="allPromocodes.length > 0">Top Promocodes:</span>
                  <b-row
                    v-for="item in allPromocodes"
                    :key="item.id"
                    class="mt-1 mb-1 mobcols promo-background"
                  >
                    <b-col 
                      class="d-md-flex align-items-center centerdiv col-9"
                    >
                      <span class="promotext"> {{ item.description }} </span>
                    </b-col>

                    <b-col class="col-3">
                      <b-button
                        variant="light"
                        class="btncolor border-0 shadow-lg bg-primary float-right"
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
                    class="mt-1 mobcols promo-backgroundv justify-content-between align-items-center"
                  >
                    <b-col
                      class="align-items-center centerdiv col-9"
                    >
                      <span class="promotextdanger">
                        {{ item.description }}<br /><small class="text-danger ">
                          Add ${{ item.min_amount - campaign.amount }} more to
                          avail this promocode.
                        </small></span
                      >
                    </b-col>
                    <b-col class="col-3">
                      <b-button
                        variant="light"
                        class="invalid-promo btncolor border-0 shadow-lg bg-primary float-right applypending"
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
      <hr class="mb-2" />
      <b-alert variant="primary" class="optionalsetp" show>
        <div class="alert-body">
          <span
            >This step is OPTIONAL. <strong>Targeting reduces views</strong> of
            your campaign since it targets a certain group of audience who will
            watch your video.</span
          >
        </div>
      </b-alert>
      <label class="Targetbyc" style="color: black;"
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
          item-value="id"
          item-text="name"
          :close-on-select="false"
        />
        <div class="location">
          <feather-icon
          size="20"
          icon="MapPinIcon"
        />
        </div>
      </div>
        <!-- <div class="selected-countries">
           <span v-for="country in campaign.options.countries" :key="country.id">{{ country.name }}, </span>
        </div> -->
      <div v-if="promoCodeDetails.country_disabled == 1" class="mt-1 text-danger">
        <feather-icon
          size="14"
          icon="AlertCircleIcon"
        />
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
          <!--    <b-form-checkbox
            v-model="selected"
            name="option1"
            value="auto"
            :checked="true"
            class="custom-control-primary mt-2"
          >
            <span class="checkboxhead">Let Veefly decide</span>
          </b-form-checkbox> -->
          <div class="mt-n1 d-md-none">
            <b-form-checkbox
              v-model="selected"
              name="option1"
              class="custom-control-primary mt-2"
              :disabled="promoCodeDetails.advance_disabled == 1"
            >
              <span class="checkboxheadmd"
                >Automatic Targeting</span
              >
            </b-form-checkbox>
            <p style="color: #787878;
              font-size: 14px;font-weight: 500; margin-top: 12px">Automatically add the most relevant targeting for your
                channel</p>
          </div>
          <div class="mt-n1 automatic_target">
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
          <div v-if="promoCodeDetails.advance_disabled == 1" class="mt-1 text-danger">
            <feather-icon
              size="14"
              icon="AlertCircleIcon"
            />
            <span style="font-size: 13px; margin-left: 4px;"
              >Advanced targeting is not available on {{ promoCodeDetails.name }} promocode!</span
            >
          </div>
          <div class="mt-1 deselectbox">
            <span style="font-size: 13px"
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
            no-close-on-esc
          >
            <div class="modaltargetinner">
              <h3 style="color: black" class="font-weight-bolder">
                VeeFly strongly advises to set advertising campaign to automatic
                targeting.
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
                    to display your videos in the recommended list, specifically
                    to viewers from your chosen countries who have shown
                    interest in similar content.
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
                    terms of interactions and subscribers, while also attracting
                    more views than manual targeting.
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

          <vue-bottom-sheet-vue2
            ref="bottom-sheet-preview1"
            modal-class="modal-primary"
            centered
            hide-footer
            hide-header
            size="md"
            v-model="modalVisible"
            class="modaltargetting"
            no-close-on-backdrop
            :can-swipe="false"
            :overlay-click-close="false"
          >
            <div class="modaltargetinner">
              <h3 style="color: black" class="font-weight-bolder">
                VeeFly strongly advises to set advertising campaign to automatic
                targeting.
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
                    to display your videos in the recommended list, specifically
                    to viewers from your chosen countries who have shown
                    interest in similar content.
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
                    terms of interactions and subscribers, while also attracting
                    more views than manual targeting.
                  </p>
                </div>
              </div>
              <div class="mt-1 ">
                <b-col  class="justify-content-center">
                  <b-button
                    block
                    class="align-items-center selectmanually"
                    @click="selectManually()"
                    ><span style="color: rgb(155, 81, 224); font-weight: bold"
                      >Select Manually</span
                    ></b-button
                  >
                </b-col>
                <b-col  class="justify-content-center mt-2">
                  <b-button
                    block
                    size="lg"
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

          <div v-if="selectmanullay">
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
              class="mb-2 tags_placeholder"
            />
          </div>

          <hr class="mt-2 mb-4" />
          <label class="beside2" style="color: black">What do you want besides views?</label>
          <b-button-toolbar class="d-none d-md-none d-lg-block w-100">
            <b-form-radio-group
              v-model="campaign.options.goal"
              buttons
              button-variant="outline-primary"
              class="w-100 besides"
              label="text"
              :options="goalOptions"
              value-field="goal"
              true-value="top"
              false-value="bottom"
              menu-props="{ maxWidth: '50%' }"
            />
          </b-button-toolbar>

          <v-select
            v-model="campaign.options.goal"
            class="d-md-block d-lg-none border-4"
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

          <div class="row mt-1">
            <b-col class="col-sm-12 col-xl-6 col-12 previewM">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                block
                size="lg"
                variant="outline-primary"
                class="mt-1 previewad1 border-0 mb-3"
                @click="previewCampaign"
              >
                <span class="align-middle">Preview Campaign</span>
              </b-button>

              <b-modal
                ref="modal-preview"
                class="preview-ad-modal"
                modal-class="modal-primary"
                centered
                hide-footer
                hide-header
                title="How will your Ad look like?"
              >
                <h4 class="mx-1 mb-0 preview-title text-center">How will your Ad look like?</h4>
                <AdPreview class="ad_body"
                  :title="campaign.options.title"
                  :views="campaign.options.view_count"
                  :img="campaign.options.src"
                  :channelTitle="campaign.options.channelTitle"
                />
              </b-modal>
              <vue-bottom-sheet-vue2 ref="myBottomSheet"
                id="modal-preview"
                class="preview-ad-modal"
                modal-class="modal-primary"
                centered
                hide-footer
                hide-header
                title="How will your Ad look like?"
              >
                <div class="d-flex justify-content-center">
                <h4 class="mx-1 mb-0 preview-title">How will your Ad look like?</h4> 
                </div>
                <AdPreview class="ad_body"
                  :title="campaign.options.title"
                  :views="campaign.options.view_count"
                  :img="campaign.options.src"
                  :channelTitle="campaign.options.channelTitle"
                />
    
                <b-col 
                  ><b-button
                  id="DashVideoCreateCampaignBtn"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="lg"
                  block
                  :disabled="loading || invalid || !campaign.amount || Object.keys(settings).length === 0"
                  class="mt-1 bg-gradient-primary previewad "
                  type="submit"
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
                  </b-button>
                  </b-col>

              </vue-bottom-sheet-vue2>
            </b-col>
            <div class="createbtn" style="position: fixed; left:0; bottom: 0px; width: 100%; background-color: # #fff; z-index: 999;">
            <b-col class="col-sm-12 col-xl-6 col-12"
              ><b-button
                id="DashVideoCreateCampaignBtn"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                size="lg"
                block
                :disabled="loading || invalid || !campaign.amount || Object.keys(settings).length === 0"
                class="mt-1 bg-gradient-primary previewad createbtncolor d-lg-none d-md-none"
                type="submit"
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
              </b-button>
            </b-col>
            </div>

            <b-col class="col-sm-12 col-xl-6 col-12 mdhide"
              ><b-button
                id="DashVideoCreateCampaignBtn"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                size="lg"
                block
                :disabled="loading || invalid || !campaign.amount || Object.keys(settings).length === 0"
                class="mt-1 bg-gradient-primary previewad "
                type="submit"
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
                    <b-col >
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
                    class="mt-1 mobcols promo-backgroundv"
                  >
                    <b-col >
                      <b-button variant="primary" class="btncolor" disabled
                        ><span class="buttons">
                          {{ item.name }}
                        </span></b-button
                      >
                    </b-col>
                    <b-col
                      
                      class="pl-md-0 d-md-flex align-items-center centerdiv"
                    >
                      <span class="promotextdanger">
                        {{ item.description }}<br /><small class="text-danger">
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
              <!-- <span>No Promocodes available!</span> -->
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
import { VueCrypton, Encrypter } from 'laravel-crypton'
import { createPopper } from '@popperjs/core'
// import { all } from "q";
import  VueBottomSheetVue2 from "@webzlodimir/vue-bottom-sheet-vue2";

const key = process.env.VUE_APP_API_KEY
Vue.use(VueCrypton(key), {
  // Any Axios Options
  baseURL: process.env.VUE_APP_API_URL
});

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
      goalOptions:'goalOptions',
      modalVisible: false,
      promocodebg: require("@/assets/images/icons/promocodebg.svg"),
      screenWidth: window.innerWidth,
      selectmanullay: false,
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
        { id: 0, text: "Traveling", value: "67", affinityAudienceIds: "92945", inMarketAudienceIds: "80287" },
        { id: 1, text: "Business and career", value: "12", affinityAudienceIds: null, inMarketAudienceIds: "80883" },
        { id: 2, text: "Children and education", value: "958" , affinityAudienceIds: null, inMarketAudienceIds: "80226" },
        { id: 3, text: "Banking and Finance", value: "16", affinityAudienceIds: "93017", inMarketAudienceIds: "80130" },
        { id: 4, text: "Hobbies and interests", value: "65", affinityAudienceIds: "92947", inMarketAudienceIds: null},
        { id: 5, text: "Cookery", value: "71" , affinityAudienceIds: "93002", inMarketAudienceIds: "80891"},
        { id: 6, text: "Construction and repair", value: "48",affinityAudienceIds: null,  inMarketAudienceIds: "80469"},
        { id: 7, text: "Sports and fitness", value: "20", affinityAudienceIds: "92950",  inMarketAudienceIds: "80545"},
        { id: 8, text: "Music and music videos", value: "35", affinityAudienceIds: "91900", inMarketAudienceIds: "80875" },
        { id: 9, text: "Beauty and health", value: "44" ,  affinityAudienceIds: "93040", inMarketAudienceIds: "80546"},
        { id: 10, text: "Science and technology", value: "231" ,affinityAudienceIds: "93040", inMarketAudienceIds: null},
        { id: 11, text: "Cars and transportation", value: "205", affinityAudienceIds: "93028", inMarketAudienceIds: null},
        { id: 12, text: "Video games", value: "8", affinityAudienceIds: null, inMarketAudienceIds: "80928" },
      ],
      allint: [{ id: 0, text: "All interest", value: "0" }],
      selected: true,
      modalVisible: false,
      ////////////////////////////////////////////////////////
      allPromocodes: [],
      falsePromocodes: [],
      dir: "ltr",
      budgetMarkers: [10, 50, 100, 300, 500, 800, 1000],
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
      videoData: null,
      topic: [],
      campaign: {
        amount: null,
        vid: null,
        options: {
          gender: "GENDER_UNDETERMINED",
          agegroup: [],
          affinityAudienceIds:[],
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
          viewMax: 0,
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
      showPromocodeStatusBox: false,
      isSticky: false,
      showOfferBox: false,
      offer: {},
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
  },
  watch: {
    screenWidth(value) {
      this.adjustBudgetMarks();
    },
    videoId() {
      if (!this.videoId) {
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
          name: "video-list",
          params: { errors: "Error on fetching video details" },
        });
      }
      this.campaign.options.url = `https://www.youtube.com/watch?v=${this.videoId}`;
    },
    "campaign.options.url": function () {
      this.getVideo();
    },
    "campaign.amount": function () {
      this.showOfferBox = false
      // console.log(this.campaign.amount < this.settings.minimal_budget, this.settings.minimal_budget, this.campaign.amount);
      if (this.loading != true) {
        if (this.campaign.amount < 0) {
          this.campaign.amount = 0;
        }
        if (this.promoCodeDetails.min_amount > this.campaign.amount && this.views_proc) {
          this.removePromoCode();
        }
        this.calculateViews();
        this.infiniteBudget();
        this.getAvailablePromocode();
      }
    },
    "campaign.options.countries": function () {
      this.calculateViews();
    },
    "campaign.options.agegroup": function () {
      this.calculateViews();
    },
    "campaign.options.gender": function () {
      this.calculateViews();
    },
    "topic": function () {
      this.calculateViews();
    },
    "campaign.options.user_tags": function () {
      this.calculateViews();
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
    "modalVisible": function () {
      if (this.modalVisible) {
        if (this.screenWidth <= 450) {
          this.$refs['bottom-sheet-preview1'].open()
        }
        else {
          this.$refs['modal-preview1'].show()
        }
      }
      else {
        if (this.screenWidth <= 450) {
          this.$refs['bottom-sheet-preview1'].close()
        }
        else {
          this.$refs['modal-preview1'].hide()
        }
      }
    },
    promoCodeDetails() {
      this.calculateViews();
    },
    promoCode() {
      if (this.promoCode) {
        this.applyPromoCode();
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
    '$store.state.app.user': function () {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : this.$store.state.app.user
      if (this.$store.state.app.user && this.$store.state.app.settings && localStorage.getItem('videoId')) {
        this.checkUrlSaveChannel()
      }
    },
    '$store.state.app.settings': function () {
      this.settings = localStorage.getItem("settings") ? crypt.decrypt(JSON.parse(localStorage.getItem("settings"))) : this.$store.state.app.settings
      if (this.$store.state.app.user && this.$store.state.app.settings && localStorage.getItem('videoId')) {
        this.checkUrlSaveChannel()
      }
    },
  },
  beforeMount() {
    if (localStorage.getItem('videoId')) {
      this.$route.params.id = localStorage.getItem('videoId')
    }

    this.videoId = this.$route.params.id;
    this.campaign.vid = this.videoId;
    this.getSettings();
    this.calculateViews();
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.handleScroll);
    this.adjustBudgetMarks();
    this.getAvailablePromocode();

    this.queryParams = localStorage.getItem("queryParams")
      ? JSON.parse(localStorage.getItem("queryParams"))
      : {};

    if (this.$store.state.app.user && this.$store.state.app.settings && localStorage.getItem('videoId')) {
      this.checkUrlSaveChannel()
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    acceptOffer() {
      this.showOfferBox = false
      this.removePromoCode()
      this.campaign.amount = parseInt(this.offer.min_amount)
      this.promoCode = this.offer.name
    },
    previewCampaign() {
      if (this.screenWidth <= 450) {
        this.$refs.myBottomSheet.open();
      } else {
        this.$refs['modal-preview'].show()
      }
    },

    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
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
    adjustBudgetMarks() {
      if (this.screenWidth <= 768) { 
        this.budgetMarkers = [10, 100, 300, 500, 800, 1000];
      } else {
        this.budgetMarkers = [10, 50, 100, 300, 500, 800, 1000];
      }
    },
    handleScroll() {
      // $(document).ready(function(){
      // $(window).bind('scroll', function() {
      // var navHeight = $( window ).height() - 70;
      //   if ($(window).scrollTop() > navHeight) {
      //     $('stickyElement').addClass('fixed');
      //   }
      //   else {
      //     $('stickyElement').removeClass('fixed');
      //   }
      // });
      // });
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAvailablePromocode() {
      const params = { params: { active: 'Active', for_video: 1 } };

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

          if (!this.promoCode && this.queryParams && this.queryParams.c && this.queryParams.c != btoa('FIRST50')) {
            this.promoCode = atob(this.queryParams.c);

            setTimeout(() => {
              if (!this.promoCodeLoading) {
                // console.log(this.promoCodeDetails)
                if (!this.campaign.amount) {
                  this.campaign.amount = this.promoCodeDetails.min_amount;
                  this.applyPromoCode()
                }
              }
            }, 3000);
          }

          this.offer = [...this.allPromocodes, ...this.falsePromocodes]
          this.offer = this.offer.filter(o => o.upsell == 1 && this.campaign.amount < o.min_amount)
          if (this.offer.length) {
            this.offer = this.offer[0]
            this.showOfferBox = true
            // if (!this.promoCode) { this.showOfferBox = true }
          } else {
            this.offer = null
          }
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
    getVideo() {
      this.skeletonLoading = true;
      axios
        .post("/video/getVideo", { id: this.videoId })
        .then((data) => {
          this.videoData = data.data.data;
          this.campaign.options.title = this.videoData.snippet.title;
          this.campaign.options.channelTitle =
            this.videoData.snippet.channelTitle;
          this.campaign.options.channelId = this.videoData.snippet.channelId;
          this.campaign.options.tags = this.videoData.snippet.tags;
          this.campaign.options.src =
          this.videoData.snippet.thumbnails.maxres?this.videoData.snippet.thumbnails.maxres.url:this.videoData.snippet.thumbnails.high.url;
          this.campaign.options.view_count =
            this.videoData.statistics.viewCount;
          this.campaign.options.likes = this.videoData.statistics.likeCount;
          this.campaign.options.dislikes =
            this.videoData.statistics.dislikeCount;
          this.campaign.options.subs_count_creating_campaign =
            this.videoData.statistics.subs_count_creating_campaign;
          this.campaign.options.subs_count_hidden =
            this.videoData.statistics.subs_count_hidden;

          this.campaign.options.comments =
            this.videoData.statistics.commentCount;
          this.campaign.options.description2 = this.settings.description2;
          this.campaign.options.description1 =
            parseInt(this.settings.use_channel_title) > 0
              ? this.videoData.snippet.channelTitle
              : this.settings.description1;

          if (this.videoData) {
            this.getCountries();
            this.skeletonLoading = false;
          }
          // console.log(this.videoData);
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
            name: "video-list",
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
        if (this.campaign.options.user_tags.length > 0) {
          // console.log("into user tags logiv");
          k1 += parseInt(keywords);
          k2 += parseInt(keywords);
        }
        if (
          !this.campaign.options.agegroup.includes("AGE_RANGE_UNDETERMINED") &&
          this.campaign.options.agegroup.length > 0
        ) {
          // console.log("into age logiv");
          k1 += parseInt(age);
          k2 += parseInt(age);
        }
        if (this.campaign.options.gender != "GENDER_UNDETERMINED") {
          // console.log("into gender logiv");
          k1 += parseInt(gender);
          k2 += parseInt(gender);
        }
        if (
          !this.topic.includes("0") &&
          this.topic.length > 0
        ) {
          // console.log("into topic logiv");
          k1 += parseInt(topic);
          k2 += parseInt(topic);
        }
        this.campaign.options.viewsMinBase = Math.round((1000 * budget) / k1);
        this.campaign.options.viewsMaxBase = Math.round((1000 * budget) / k2);

        // Old
        // const pro =
        //   budget >= this.settings.step2
        //     ? this.settings.percents_step2
        //     : budget >= this.settings.step1
        //     ? this.settings.percents_step1
        //     : 0;

        // this.viewsMinDif = Math.round(
        //   (this.campaign.options.viewsMinBase * pro) / 100
        // );

        // this.viewsMaxDif = Math.round(
        //   (this.campaign.options.viewsMaxBase * pro) / 100
        // );

        // New
        this.viewsMinDif = Math.round(
          (this.campaign.options.viewsMinBase) / 100
        );

        this.viewsMaxDif = Math.round(
          (this.campaign.options.viewsMaxBase) / 100
        );

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
              ((this.campaign.options.viewsMinBase) *
                this.promoCodeDetails.views_proc) /
              100;
            viewsMaxPromo =
              ((this.campaign.options.viewsMaxBase) *
                this.promoCodeDetails.views_proc) /
              100;
          }
          // console.log(this.promoCodeDetails);
        }
        this.campaign.options.viewsMinPromo = viewsMinPromo;
        this.campaign.options.viewsMaxPromo = viewsMaxPromo;
        this.campaign.options.viewsMin = Math.round(
          this.campaign.options.viewsMinBase + viewsMinPromo
        );
        this.campaign.options.viewsMax = Math.round(
          this.campaign.options.viewsMaxBase + viewsMaxPromo
        );
        this.campaign.options.viewsStop = Math.round(
          (this.campaign.options.viewsMin + this.campaign.options.viewsMax) / 2
        );
        this.campaign.options.pricePerView =
          budget / this.campaign.options.viewsStop;
      }
    },
    infiniteBudget() {
      if (this.campaign.amount < 950) {
        this.maxBudget = 1000;
        if (this.screenWidth <= 450){
          this.budgetMarkers = [10, 100, 300, 500, 800, 1000];
        } else {
          this.budgetMarkers = [10, 50, 100, 300, 500, 800, 1000];
        }
        
      } else {
        if (this.maxBudget - 5 < this.campaign.amount) {
          this.maxBudget =
            Math.ceil((parseInt(this.campaign.amount) + 6) / 250) * 250;
            if (this.screenWidth <= 450) {
              this.budgetMarkers = [
                10,
                Math.ceil((this.maxBudget * 0.1) / 25) * 25,
                Math.ceil((this.maxBudget * 0.3) / 25) * 25,
                Math.ceil((this.maxBudget * 0.5) / 25) * 25,
                Math.ceil((this.maxBudget * 0.8) / 25) * 25,
                Math.ceil((this.maxBudget * 1) / 25) * 25,
              ];
            } else {
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
      this.showPromocodeStatusBox = false
      this.$refs.applyPromoCodeForm.validate().then((success) => {
        if (success) {
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
              this.showOfferBox = true
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
              this.queryParams = null;
              this.promoCodeLoading = false;
              this.$refs["modal-promocode"].hide();
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
        }
      });
    }, 1500),
    removePromoCode() {
      this.promoCode = null;
      delete this.campaign.options.Promocode;
      this.promoCodeDetails = {};
    },
    calculateCountries() {
      let cs = 0;
      this.targeting = 0;
      if (!this.campaign.options.countries.length) return;
      this.campaign.options.countries.forEach((c) => {
        this.targeting = parseFloat(this.targeting) + parseFloat(c.tier.amount);
        cs++;
      });
      this.targeting /= cs;
      // console.log("tageting", this.targeting);
    },
    createCampaign() {
      this.loading = true;
      this.views_proc = false;
      if (this.promoCodeDetails.calc_amount) {
        this.campaign.amount = this.promoCodeDetails.calc_amount;
      }
      if (this.campaign.options.agegroup == 0) {
        this.campaign.options.agegroup = this.allage;
      }
      if (this.topic.length == 0) {
        this.topic = this.allinterest;
      } else if(this.topic.length > 0) {
        this.campaign.options.affinityAudienceIds = [];
        this.campaign.options.inMarketAudienceIds = [];
        for (let i = 0; i < this.topic.length; i++) {
          if (this.topic[i].affinityAudienceIds) {
            this.campaign.options.affinityAudienceIds.push(this.topic[i].affinityAudienceIds);
          }
          
          if (this.topic[i].inMarketAudienceIds) {
            this.campaign.options.inMarketAudienceIds.push(this.topic[i].inMarketAudienceIds);
          }
        }
      }
      this.$https
        .post(process.env.VUE_APP_API_URL +"/campaigns", this.campaign, {
          headers: {
            'Authorization': `Bearer ${ localStorage.getItem('accessToken') }`
          }
        })
        .then((data) => {
          localStorage.removeItem("queryParams");

          this.$gtm.trackEvent({
            event: "gtm4wp.campaignCreated",
            ecommerce: {
              purchase: {
                actionField: {
                  campaign_id: data.data.data.id,
                  user_id: data.data.data.user_id,
                  amount: data.data.data.amount,
                  promocode: data.data.data.options.Promocode?.name ?? null,
                },
              },
            },
            noninteraction: false, // Optional
          });

          setTimeout(
            () => this.redirect(data),

            1200
          );
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
          this.views_proc = true;
        });
    },
    redirect(data) {
      this.$router.push({
        name: "payment",
        params: { id: data.data.data.id },
      });
      this.loading = false;
    },
    checkUrlSaveChannel() {
      let channelId = localStorage.getItem('channelId') ?? null
      let videoId = localStorage.getItem('videoId') ?? null
      let params = {}
      let user = this.user

      if (!user.email_verified_at) { return }

      if (!channelId && !videoId) { return }

      if (channelId) {
        params = { channelId, user_id: user.id }
      }
      else if (videoId) {
        params = { videoId, user_id: user.id }
      }

      store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', true)

      let channelExists = this.$store.state.user.channels.find(c => c.channel_id == channelId)
      if (channelId && channelExists) {
        this.$root.$emit('changeUserChannels', channelExists)
        this.$router.push(this.$route.name)
      } else {
        axios.get("/addChannel", { params }).then(res => {
          channelId = channelId ?? res.data.data.snippet.channelId
          this.$root.$emit('loadUserChannels', channelId)
          this.$router.push(this.$route.name)
        })
      }
      localStorage.removeItem('videoId');
      localStorage.removeItem('channelId');
      store.commit('user/UPDATE_LOADING_SELECTED_CHANNEL', false)
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-slider.scss";
@import "@core/scss/vue/libs/vue-select.scss";
// @media only screen and (max-width: 767px){
  // .vs--single .vs__dropdown-toggle {
  //   margin-bottom: 16px !important;
  // }
  
// }
</style>
<style scoped>
@media only screen and (max-width: 450px){
 .centerdiv{
  width: 230px;
  padding-left: 10px !important;
 }
 .promocode{
  position: absolute;
  right: 80px;
  bottom: -41px;
 }

}

.ad_body{
  align-items: center;
  padding: 0px 20px 20px 15px;
}

.preview-ad-modal .modal-preview___BV_modal_content_ {
  border-radius: 5px !important;
}

.preview-title {
    color: #a765e4;
    padding-top: 15px;
}
.itable {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 0.6rem;
}
.itable > .custom-checkbox.custom-control {
  margin-bottom: 10px;
}
.buttons {
  display: flex;
  justify-content: space-around;
  padding-left: 5px;
  padding-right: 5px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
}
.promotext {
  color: rgba(155, 81, 224, 1);
  font-weight: bold;
  font-size: 17px;
}
.promotextdanger {
  color: #9B51E0;
  font-size: 17px;
  font-weight: 700;
}
.btncolor {
  /*   border-color: rgba(155, 81, 224, 1);
  background-color: rgba(155, 81, 224, 1); */
  /* max-width: 104%; */
  width: auto;
  border-radius: 10px;
}
.promo-background {
  background-color: rgba(155, 81, 224, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 23px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #9B51E0;
}
.promo-backgroundv {
  background-color:rgba(155, 81, 224, 0.15);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 23px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #D8AFFF;
}
@media only screen and (max-width: 764px) {
  .mobcols {
    display: flex;
    justify-content: space-between;
    align-items: center;
   
  }
  .centerdiv {
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 0px;
  }
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
}
.videocardimg {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.besides {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

[dir=ltr] .stepsmain[data-v-5fa3c8d4] {
  left: -50px;
}

.titlecard {
  color: #fff;
  font-size: 16px;
}
.channeltitlecard {
  color: black;
  font-size: 15px;
  /* text-align: -webkit-center; */
}

.desktop-video-title{
  color: black;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.48px;
}

.enterbudget {
  color: black;
  font-size: 30px;
}

.inputbudget {
  background-color: #ffffff;
  border-radius: 20px;
  color: black;
  font-size: 18px;
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
  font-weight: 600;
  background-color: #DE7800;
  color: #fff;
  border: none;
}

.alertoffer {
  padding-top: 7px;
  padding-bottom: 7px;
  border: 1px solid #DE7800;
  border-radius: 14px;
  color: #DE7800;
  background: rgba(222, 120, 0, 0.17);
}

[dir=ltr] .bg-gradient-primary, [dir=ltr] .btn-gradient-primary {
    background-image: linear-gradient(47deg, #9B51E0, #b47ce8);
    border: none;
}
.mcoupon{
font-size: 20px;
font-style: normal;
font-weight: 600
}

.Targetbyc{
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
}

.beside2{
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
}

.selected-countries{
  color:black;
  font-weight: 600;
  margin-left: 15px;
}


.alertoffersection {
  border-radius: 17px;
}

.VideoList-button {
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
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
  color: #fff;
}
@media only screen and (min-width: 844px) {
  .VideoList-submit {
    flex-shrink: 0;
    margin-top: 0;
    left: 4px;
    min-width: 190px;
    width: auto;
    height: auto;
    transform: scale(0.8);
    border: 3px solid;
    background-color: rgb(60, 58, 61) !important;
    border-color: rgb(241 226 255 / 52%) !important;
  }
}
.vedioList-input-button-container {
  position: relative;
  width: 100%;
}
.vedioList-input-button {
  font-size: 16px;
  line-height: 100%;
  padding: 17px 40px 17px 30px;
  width: 100%;
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
  .input-with-buttonz {
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
.input-with-buttonz__cancel {
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

.input-with-buttonz:focus-within {
  box-shadow: 0 0 0 5px #dee1ff;
}

.promocodewarn {
  text-align: center;
  margin-top: 11px;
}

.promocodepadding {
  padding: 39px;
}

.vs__selected-options {
  padding: 0 40px !important;
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
  font-size: 16px;
  color: #1d1b28;
  position: relative;
  top: -2px;
}

.tags_placeholder{
    font-size: 11px;
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
@media only screen and (max-width: 999px) {
  .mobilesteps {
    display: none;
  }

  .hrline {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
.btncolor{
  max-width: 160%;
  width: auto;
}
.buttons{
  font-size: 12px !important;
  font-weight: 600;
}
}

@media only screen and (min-width: 270px) and (max-width: 300px) {
.btncolor{
  max-width: 190%;
  width: auto;
}
}

@media only screen and (min-width: 378px) and (max-width: 400px) {
.promotext{
  font-size: 12px !important;
}
}

@media only screen and (min-width: 290px) and (max-width: 350px) {
  .enterbudget{
  font-size: 22px !important;
  margin-top:2px !important;
  }
}
@media only screen and (min-width: 331px) and (max-width: 343px) {
  .enterbudget{
  font-size: 23px !important;
  }
}

@media only screen and (min-width: 343px) and (max-width: 362px) {
  .enterbudget{
  font-size: 18px !important;
  }
}
   
@media only screen and (max-width: 280px){
  .vedioList-input-button[data-v-5fa3c8d4]{
    width: 162px !important;}
    
    [dir] .mobileinputbudget[data-v-5fa3c8d4] {
    margin-left: -13px;
   }

   [dir=ltr] .approx-views[data-v-5fa3c8d4] {
    margin-left: -37px;
  }
  .approx-views[data-v-5fa3c8d4]
  {width: 97%;}

  .promotextdanger[data-v-5fa3c8d4] {
   
    font-size: 10px;
    
   }

   .promotext[data-v-5fa3c8d4][data-v-5fa3c8d4][data-v-5fa3c8d4] {
    font-weight: 500;
    font-size: 11px;
    font-weight: 500 !important;
   }


  .promotextdanger[data-v-5fa3c8d4] {
    
    font-size: 11px !important;
    font-weight: 500 !important;
  }

  .text-danger{
    font-size: 78%;
  }

  .Gfold{
    margin-top: -10px !important;
  }

  .enterbudget{
    font-size: 19px !important;
}
  
}
@media screen and (min-width: 767px) and (max-width: 944px) {
  .offerbtn{
  margin-top: 5px !important;
  margin-right: 30px !important;
  }

  [dir] .card-body {
  padding: 0.5rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 844px) {
  .VideoList-button{
    padding: 10px !important;
  }
}

@media only screen and (max-width: 767px){ 
  .enterbudget{
    font-size: 20px;
  }
  .card .card-title {
    font-weight: 500;
    font-size: 16px;
    color: #333;
    margin-top: 20px;
  }
  .img {
    width: 180px;
    height: 80px;
  }  

  .promo-background {
  background-color: rgba(155, 81, 224, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 23px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #9B51E0;
  }

  .btncolor {
  border-radius: 8px;
  padding:9px;
  }




  .custom-checkbox .custom-control-label::before, .custom-checkbox .custom-control-label::after, .custom-radio .custom-control-label::before, .custom-radio .custom-control-label::after {
    width: 18px;
    height: 18px;
    margin-top: 3px !important;
  }

  [dir=ltr] .vedioList-input-button[data-v-5fa3c8d4] {
    padding: 5px;
    padding-left: 22px;
 }

 .budgetborder {
  padding-top: 30px !important;
  color: black;
  font-weight: 600 !important;
  padding-bottom: 27px !important;
  font-size: 18px !important;
  font-weight: 800;
}

  .approx-views{
    position: absolute;
    height: 42px;
    left: calc(10% + 10px);
    width: 75%;
    justify-content:center;
  }
  /* Additional style for the element when it reaches the top */
  .stuck {
  position: fixed !important;
  top: 4.5rem;
  left: calc(-2% + 10px);
  width: 100%;
  justify-content:center;
  /* Add other styles for the stuck element */
  }

  .mr-25{
    margin-left: 10px;
    margin-top: 10px ;
    font-size: 15px;
  }
  .viewseye{
    width: 16px;
    height: 11px;
    margin-right:9px;
  }
  .mcoupon{
    color:  #333;
    font-variant-numeric: lining-nums proportional-nums;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.4px;
  }
  .acceptofferbutton{
    justify-content: center;
  }
  .alertoffer{
    flex-direction: column;
    padding-top: 15px;
    padding-bottom: 2px;
    color: #DE7800;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 16px;
    border: 1px solid #DE7800;
    background: rgba(222, 120, 0, 0.17);
  }
  .alertoffertext{
    padding-bottom: 10px;
  }
  .get_20{
    flex-direction: column;
    align-items: center;
    align-self: center;
    text-align: -webkit-center;
  }
 

  .btn-sm.acceptofferbutton{
    background-color: #DE7800 !important;
    font-weight: 700;
    font-size: 14px;
    color: #FFF;
    margin-bottom: 24px;
    justify-content: center;
    border: 1px solid #DE7800;
    width: max-content;
    margin-left: 0px !important;
  }

  .get_10{
    /* background: #DE7800 !important; */
    border: none;
    width: fit-content;
    align-self: center;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
  .invalid-promo{
    /* position: absolute;
    bottom: calc(100% - 42px) !important;
    right: 20px; */
    background-color: #9B51E0 !important;
  }
  .promotextdanger{
   color:#9B51E0;
   font-size: 13px !important;
   font-weight: 500 !important;
  }
  .promotext[data-v-5fa3c8d4] {
    font-weight: 500;
    font-size: 15px;
  }
  .promotext[data-v-5fa3c8d4][data-v-5fa3c8d4] {
    font-weight: 500;
    font-size: 14px;
  }

  .buttons {
   color: #FFF;
   font-size: 15px;
   font-weight: 600;
  }
  .input-with-buttonz{
   display: flex;
   align-items: flex-start;
  }
  .vedioList-input-button{
   height: 45px !important;
   border-radius: 16px;
   border: 1px solid #DCDCDC; 
   background: #FFF;
   color: #ADADAD;
   font-size: 18px;
   font-style: normal;
   font-weight: 600;
   box-shadow: 0px 0px 16px 0px rgba(137, 137, 137, 0.01);
  }
  .VideoList-button{
   width:  140px;
   min-height: 45px !important;
   border-radius: 16px;
   background: #D5B9EF ;
   color: #FFF;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   font-weight: 400;
   margin-bottom: 10px;
   padding: 0px !important;
   margin-left: 10px;
  }

  /* .promo-background{
   padding-bottom: 13px !important;
  } */
   
  .vs__selected{
    font-weight: 600 !important;
  }

  .countryselect {
    font-weight: 600!important;
  }
  

  label{
    color: black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .checkboxheadmd{
    color: #333;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.4px;
  }
  .automatic_target{
    display: none !important;
  }

  .deselectbox{
    font-size: 14px;
    font-weight: 500;
    color: #9B51E0;
  }

  .centerdiv[data-v-5fa3c8d4] {
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 18px !important;
    padding-right: 0px !important;
  }


  .previewad1{
    background: transparent !important;
    border: 1.5px solid #9B51E0 !important;
  }

  /* .v-select.vs--single .vs__selected {
    margin-top: 5px;
    margin-left: -90px !important;
  } */

  

  [dir] .bg-white {
    background-color: #9B51E0!important;
  }

  .vs__selected-options .vs__selected{
    margin-top: 5px;
    font-weight: 600;
    margin-left: -33px !important;
  }

  #wallet-icon{
    color: #00BD4C !important;
  }



  .createbtn{
    background: #fff;
    height: 72px;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
  .createbtncolor{
    background: #9B51E0 !important;
  }
  .col-sm-12.col-xl-6.col-12.mdhide {
    display: none;
  }


  .mcoupon[data-v-5fa3c8d4] {
    margin-top: -30px;
  }

  .beside2{
    margin-top: -40px;
  }
  
  [dir=ltr] .promocode[data-v-5fa3c8d4] {
    right: 20px;
 }

 
}


@media only screen and (max-width: 844px) {
  .mobilesteps {
    display: none;
  }
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
  .mobileinputbudget {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: -19px;
    width: 138px;
  }

  .mobileoffer {
    display: flex;
    justify-content: center; 
    align-items: center;
    top:13px
  }
  .hrline {
    display: none;
  }
}

@media only screen and (max-width: 650px) {
  .tags_placeholder{
    font-size: 11px;
  }
}

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
  font-size: 20px;
  padding-top: 32px;
  color: black;
  font-weight: 900;
  padding-bottom: 32px;
}


.selectmanually {
  border-radius: 13px;
  border: 3px solid; /* Replace #FF0000 with your desired border color */
  background-color: rgba(155, 81, 224, 0.315) !important;
  border-color: rgba(241, 226, 255, 0.315) !important;
}

.previewad1 {
  border-radius: 17px;
  border: 2.5px solid #9B51E0;
  background: rgba(155, 81, 224, 0.10);
  border-color: rgb(255 255 255 / 52%);
}

.optionalsetp {
  border-radius: 13px;
}

/* .modaltargetting {
  border-radius: 3.358rem !important;
} */

.modaltargetinner {
  padding: 17px;
}

.youtube{
  left: 36px;
    top: 20px;
    position: absolute;
}
.location{
  position: absolute;
  margin: 25px;
}

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


[dir=ltr] .btn-group > .btn:not(:first-child), [dir=ltr] .btn-group > .btn-group:not(:first-child) {
    margin-left: 5px;
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
    border-top-right-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
    margin-top: 10px !important;
}

[dir=ltr] .btn-group > .btn:not(:last-child):not(.dropdown-toggle), [dir=ltr] .btn-group > .btn-group:not(:last-child) > .btn {
  border-top-right-radius: 12px !important;
  border-bottom-right-radius: 12px !important;
  margin-top: 10px !important;
}

// .btn-group, .btn-group-vertical {
//     flex-wrap: wrap;
// }

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

[dir] .b-form-tags .b-form-tags-list .b-from-tags-field, [dir] .b-form-tags .b-form-tags-list .b-form-tag {
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
@media only screen and (max-width: 280px){
  [dir] #campaign_ad_preview .mobile-discovery-search-ad[data-v-4bb86fa5] {
    margin-left: -8px !important;
  }
}
[dir] .btn-block + .btn-block {
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
