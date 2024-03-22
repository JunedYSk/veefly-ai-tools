<template>
  <div>
    <div class="d-none d-md-block">
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-center position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-2 text-center ai-text">Welcome to Daily Ideas</h1>
          <p class="mt-2 loading-text" v-if="loading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            Loading...
          </p>
          <p class="mt-2 loading-text" v-if="setupLoading">
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
      <div class="pb-3" v-if="showSecondaryUI">
        <img class="bg-image" src="@/assets/images/preview/ai-bg.png" alt="">
        <div class="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
          <div class="mb-2"><img src="@/assets/images/preview/daily-ideas-img.png" alt=""></div>
          <h1 class="display-4 mb-5 text-center ai-text">Daily video Ideas<br> just for you</h1>
        </div>
        <div class="back-main-div" v-if="credits<=0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                :src="selectedChannel.channel_thumbnail"
                :alt="selectedChannel.channel_title"
                class="rounded-circle mr-1 thumbnail-img"
                fluid
              />
              <p class="m-0 main-top-heading">Top Ideas</p>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <img src="@/assets/images/preview/daily-ideas-small-image.png" alt="">
              <p class="my-0 mr-0 credit-text">{{credits}} Credits Remaining</p>
            </div>
          </div>
          <hr class="hr-line">
          <div class="d-flex flex-column align-items-center py-3">
            <div><img src="@/assets/images/preview/daily-ideas-design-image.png" alt=""></div>
            <p class="text-center premium-heading-text mt-2">You‘ve reached your limit of <br> free AI content plan</p>
            <p class="text-center premium-heading-para">Generate Unlimited AI content with Premium</p>
            <div class="mt-1">
              <b-button
                variant="primary"
                class="veefly-premium-btn"
                @click="saveIdea(idea)"
              >
                Get Veefly Premium
              </b-button>
            </div>
          </div>
        </div>
        <div class="p-2 main-div" v-if="credits>0">
          <div class="d-flex justify-content-between align-items-center">
            <p class="m-0 main-heading">Customised Ideas</p>
            <div class="d-flex justify-content-center align-items-center">
              <img src="@/assets/images/preview/daily-ideas-small-image.png" alt="">
              <p class="my-0 mr-0 credit-text">{{credits}} Credits Remaining</p>
            </div>
          </div>
          <div class="my-3 search-bar">
            <validation-observer ref="campaignForm" #default="{ invalid }">
              <b-form @submit.prevent="submitIdea">
                <div class="input-with-button position-relative">
                  <validation-provider
                    #default="{ errors }"
                    name="url"
                    vid="videoIdea"
                    rules="required"
                    style="width: calc(100% - 78px);"
                  >
                    <div class="d-flex">
                      <b-form-input
                        class="vedioList-input-button"
                        ref="videoIdea"
                        
                        :state="errors.length > 0 ? false : null"
                        placeholder="Create a video about..."
                      />
                    </div>
                    <div class="mt-1">
                      <small v-if="errors.length > 0" class="text-danger">
                        Please enter your YouTube Video Idea
                      </small>
                    </div>
                  </validation-provider>
                  <b-button
                    class="arrow-btn"
                    type="submit"
                    :disabled="invalid || loading" 
                  >
                    <b-spinner variant="dark" v-if="false"/>
                    <span v-else>
                      <feather-icon class="text-dark" size="30" icon="ArrowRightIcon" />
                    </span>
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
          </div>
          <div class="d-flex">
            <b-tabs content-class="mt-2 w-100" class="w-100 font-weight-bolder h4">
              <b-tab title="Disabled" disabled>
                <template #title>
                  <img
                    :src="selectedChannel.channel_thumbnail"
                    :alt="selectedChannel.channel_title"
                    class="rounded-circle thumbnail-image"
                    fluid
                  />
                </template>
              </b-tab>
              <b-tab class="overflow-div pt-2 top-idea-tab" title="Top Ideas" active>
                <div class="row w-100">
                  <b-col class="text-center pt-3" md="12" v-if="loadingPersonalizedIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="12"
                    v-else
                    v-for="(idea,index) in personalizedIdeas"
                    :key="idea.id"
                  >
                    <div class="row">
                      <div class="col-md-8">
                        <b-card
                          class="p-1 pb-2 card-css"
                          role="button"
                          @click="copyToClipboard(idea)"
                          no-body
                        >
                          <div class="d-flex align-items-start">
                            <h5 class="content-title">{{ index+1 }}.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h5><h5 class="content-title"> {{ idea }}</h5>
                          </div>
                        </b-card>
                      </div>
                      <div class="col-md-2">
                        <div class="mt-1 d-flex justify-content-center">
                          <b-button
                            class="mr-1 like-button"
                            @click="likeIdea(idea)"
                          >
                            <div v-if="!idea.isLike"><img src="@/assets/images/preview/like-image.png" alt=""></div>
                            <div v-else-if="idea.isLike"><img src="@/assets/images/preview/like-image-active.png" alt=""></div>

                          </b-button>
                          <b-button
                            class="like-button"
                            @click="dislikeIdea(idea)"
                          >
                            <div v-if="!idea.isDislike"><img src="@/assets/images/preview/dislike-image.png" alt=""></div>
                            <div v-else-if="idea.isDislike"><img src="@/assets/images/preview/dislike-image-active.png" alt=""></div>
                          </b-button>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="mt-1">
                          <b-button
                            variant="primary"
                            class="btn-block text-center generate-btn"
                            @click="saveIdea(idea)"
                            :to="{ name: 'ai-generator', query: { idea: idea } }"
                          >
                            Generate
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <div class="position-relative w-100">
                    <div class="middle-blur-div d-flex flex-column align-items-center">
                      <div><img src="@/assets/images/preview/daily-ideas-design-image.png" alt=""></div>
                      <p class="text-center premium-heading-text mt-2">Unlock all Daily Ideas with <br> Veefly Premium</p>
                      <p class="text-center premium-heading-para">Take your content generation journey to next level</p>
                      <div class="mt-1">
                        <b-button
                          variant="primary"
                          class="mb-1 veefly-premium-btn"
                          @click="saveIdea(idea)"
                        >
                          Get Veefly Premium
                        </b-button>
                      </div>
                    </div>
                    <div class="w-100 mt-5"><img class="w-100 blur-image-ai" src="@/assets/images/preview/blur-image-ai-daily-new.png" alt=""></div>
                  </div>
                </div>

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From your top videos</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingTopIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in topIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what's trending in your niche</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingTrendingNicheIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in trendingNicheIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what's working for your competitors</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingCompetitorWorkingIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in competitorWorkingIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what your audience is asking for</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingAudienceIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in audienceIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->
                
              </b-tab>
              <b-tab title="Liked Ideas" class="p-2 tab-border-top">
                <div v-if="likeIdeas.length>0">
                  <div class="content-title mb-1" v-for="(idea,index) in likeIdeas"
                    :key="idea">
                    {{ index+1 }}. {{ idea }}
                  </div>
                </div>
                <div class="text-center" v-else> There are No Liked Ideas Present</div>
              </b-tab>
              <b-tab title="Disiked Ideas" class="p-2 tab-border-top">
                <div v-if="dislikeIdeas.length>0">
                  <div class="content-title mb-1" v-for="(idea,index) in dislikeIdeas"
                    :key="idea">
                    {{ index+1 }}. {{ idea }}
                  </div>
                </div>
                <div class="text-center" v-else> There are No Disliked Ideas Present</div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
    <div class="d-md-none mob-ai-bg">
      <!-- Primary UI -->
      <div
        class="d-flex flex-column align-items-center justify-content-center position-relative"
        style="height: 85vh;"
        v-if="!showSecondaryUI"
      >
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 class="display-4 mb-2 text-center ai-text">Welcome to Daily Ideas</h1>
          <p class="mt-2 loading-text" v-if="loading">
            <b-spinner
              label="Loading..."
              variant="primary"
              class="mr-1"
            />
            Loading...
          </p>
          <p class="mt-2 loading-text" v-if="setupLoading">
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
      <div v-if="showSecondaryUI">
        <div class="d-flex flex-column align-items-center justify-content-center w-100 py-2">
          <div class="my-2"><img src="@/assets/images/preview/small-idea-image.png" alt="" width="70px"></div>
          <h1 class="display-4 mb-2 text-center ai-text text-white">Daily video Ideas<br> just for you</h1>
        </div>
        <div class="back-main-div" v-if="credits<=0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                :src="selectedChannel.channel_thumbnail"
                :alt="selectedChannel.channel_title"
                class="rounded-circle thumbnail-img"
                fluid
              />
              <p class="my-0 mr-0 main-top-heading">Top Ideas</p>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <img src="@/assets/images/preview/daily-ideas-small-image.png" alt="" class="small-image">
              <p class="m-0 credit-text">{{credits}} Credits</p>
            </div>
          </div>
          <hr class="hr-line">
          <div class="d-flex flex-column align-items-center py-3">
            <div><img src="@/assets/images/preview/daily-ideas-design-image.png" alt=""></div>
            <p class="text-center premium-heading-text mt-2">You‘ve reached your limit of <br class="breaking-point"> free AI content plan</p>
            <p class="text-center premium-heading-para">Generate Unlimited AI content with Premium</p>
            <div class="mt-1">
              <b-button
                variant="primary"
                class="veefly-premium-btn"
                @click="saveIdea(idea)"
              >
                Get Veefly Premium
              </b-button>
            </div>
          </div>
        </div>
        <div class="p-0 main-div"  v-if="credits>0">
          <div class="d-flex justify-content-between align-items-center mx-2">
            <p class="m-0 main-heading mt-2">Customised Ideas</p>
            <div class="d-flex justify-content-center align-items-center mt-2">
              <img class="small-image" src="@/assets/images/preview/daily-ideas-small-image.png" alt="">
              <p class="my-0 mr-0 credit-text">{{credits}} Credits</p>
            </div>
          </div>
          <div class="my-3 mx-2 search-bar">
            <validation-observer ref="campaignForm" #default="{ invalid }">
              <b-form @submit.prevent="submitIdea">
                <div class="input-with-button position-relative">
                  <validation-provider
                    #default="{ errors }"
                    name="url"
                    vid="videoIdea"
                    rules="required"
                    style="width: calc(100% - 78px);"
                  >
                    <div class="d-flex">
                      <b-form-input
                        class="vedioList-input-button"
                        ref="videoIdea"
                       
                        :state="errors.length > 0 ? false : null"
                        placeholder="Create a video about..."
                      />
                    </div>
                    <div class="mt-1">
                      <small v-if="errors.length > 0" class="text-danger">
                        Please enter your YouTube Video Idea
                      </small>
                    </div>
                  </validation-provider>
                  <b-button
                    class="arrow-btn"
                    type="submit"
                    :disabled="invalid || loading" 
                  >
                    <b-spinner variant="dark" v-if="false"/>
                    <span v-else>
                      <feather-icon class="text-dark" size="30" icon="ArrowRightIcon" />
                    </span>
                  </b-button>
                </div>
              </b-form>
            </validation-observer>
          </div>
          <div>
            <img
              :src="selectedChannel.channel_thumbnail"
              :alt="selectedChannel.channel_title"
              class="rounded-circle ml-2 mr-1 thumbnail-img"
              style="margin-top: -6px;"
              fluid
            />
            <b-dropdown :text="tabs[currentTab].title" variant="primary">
              <b-dropdown-item  @click="currentTab = 0">
                Top Ideas
              </b-dropdown-item>
              <b-dropdown-item  @click="currentTab = 1">
                Liked Ideas
              </b-dropdown-item>
              <b-dropdown-item  @click="currentTab = 2">
                Disliked Ideas
              </b-dropdown-item>
            </b-dropdown>
            <b-tabs class="position-relative" content-class="mt-2"  v-model="currentTab" nav-class="d-none">
              <b-tab title="Top Ideas" active class="overflow-div pt-2 tab-border-top">
                <div class="row">
                  <b-col class="text-center pt-3" md="12" v-if="loadingPersonalizedIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="12"
                    v-else
                    v-for="(idea,index) in personalizedIdeas"
                    :key="idea.id"
                    class="mb-2"
                  >
                    <div class="row">
                      <div class="col-12">
                        <b-card
                          class="card-css"
                          role="button"
                          @click="copyToClipboard(idea)"
                          no-body
                        >
                          <div class="d-flex align-items-start justify-content-between">
                            <h5 class="content-title">{{ index+1 }}. {{ idea }}</h5>
                          </div>
                        </b-card>
                      </div>
                      <div class="col-4"></div>
                      <div class="col-3">
                        <div class="mb-1 d-flex justify-content-center">
                          <b-button
                            class="mr-1 like-button"
                            @click="likeIdea(idea)"
                          >
                            <div v-if="!idea.isLike"><img src="@/assets/images/preview/like-image.png" alt=""></div>
                            <div v-else-if="idea.isLike"><img src="@/assets/images/preview/like-image-active.png" alt=""></div>

                          </b-button>
                          <b-button
                            class="like-button"
                            @click="dislikeIdea(idea)"
                          >
                            <div v-if="!idea.isDislike"><img src="@/assets/images/preview/dislike-image.png" alt=""></div>
                            <div v-else-if="idea.isDislike"><img src="@/assets/images/preview/dislike-image-active.png" alt=""></div>
                          </b-button>
                        </div>
                      </div>
                      <div class="col-5">
                        <div class="mb-1">
                          <b-button
                            variant="primary"
                            class="btn-block text-center generate-btn"
                            @click="saveIdea(idea)"
                            :to="{ name: 'ai-generator', query: { idea: idea } }"
                          >
                            Generate
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <div class="w-100 position-relative">
                    <div class="middle-blur-div d-flex flex-column align-items-center mx-auto w-100 px-1">
                      <p class="text-center premium-heading-text mt-2">Unlock all Daily Ideas with <br class="breaking-point"> Veefly Premium</p>
                      <p class="text-center premium-heading-para">Take your content generation journey to next level</p>
                      <div class="mt-1">
                        <b-button
                          variant="primary"
                          class="mb-1 veefly-premium-btn"
                          @click="saveIdea(idea)"
                        >
                          Get Veefly Premium
                        </b-button>
                      </div>
                    </div>
                    <div class="w-100"><img class="w-100 mob-blur-image-ai" src="@/assets/images/preview/blur-img-mobile.png" alt=""></div>
                  </div>
                </div>

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From your top videos</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingTopIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in topIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what's trending in your niche</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingTrendingNicheIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in trendingNicheIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what's working for your competitors</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingCompetitorWorkingIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in competitorWorkingIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->

                <!-- <div class="row">
                  <b-col md="12">
                    <h3 class="pb-1">From what your audience is asking for</h3>
                  </b-col>

                  <b-col md="12" v-if="loadingAudienceIdeas">
                    <b-spinner label="Loading..." variant="primary" />
                  </b-col>
                  <b-col md="4"
                    v-else
                    v-for="idea in audienceIdeas"
                    :key="idea"
                  >
                    <b-card
                      class="p-1 pb-2 card-css"
                      role="button"
                      @click="copyToClipboard(idea)"
                      no-body
                    >
                      <div class="d-flex align-items-start justify-content-between">
                        <h5 class="content-title">{{ idea }}</h5>
                      </div>

                      <div class="mt-1">
                        <b-button
                          variant="outline-primary"
                          class="border rounded-circle"
                          style="padding: 9px;"
                          @click="saveIdea(idea)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            size="21"
                          />
                        </b-button>
                      </div>
                    </b-card>
                  </b-col>
                </div> -->
              </b-tab>
              <b-tab title="Liked Ideas" class="p-2 tab-border-top">
                <div v-if="likeIdeas.length>0">
                  <div class="content-title mb-1" v-for="(idea,index) in likeIdeas"
                    :key="idea">
                    {{ index+1 }}. {{ idea }}
                  </div>
                </div>
                <div class="text-center font-weight-bolder" v-else> There are No Liked Ideas Present</div>
              </b-tab>
              <b-tab title="Disiked Ideas" class="p-2 tab-border-top">
                <div v-if="dislikeIdeas.length>0">
                  <div class="content-title mb-1" v-for="(idea,index) in dislikeIdeas"
                    :key="idea">
                    {{ index+1 }}. {{ idea }}
                  </div>
                </div>
                <div class="text-center font-weight-bolder" v-else> There are No Disliked Ideas Present</div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BImg,
  BForm,
  BFormInput,
  BButton,
  BSpinner,
  BTabs,
  BTab,
  BDropdown,
  BDropdownItem
} from "bootstrap-vue"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import Ripple from "vue-ripple-directive"
import axios from "@axios"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import { required, numeric, length } from "@validations"
import store from "@/store";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BForm,
    BFormInput,
    BButton,
    BSpinner,
    BTabs,
    BTab,
    BDropdown,
    BDropdownItem,

    ValidationProvider,
    ValidationObserver,
    required,
  },
  data() {
    return {
      user: null,
      loading: true,
      setupLoading: false,
      setupText: null,

      channelId: null,
      hasSetup: false,

      showSecondaryUI: false,
      keyword: null,

      loadingPersonalizedIdeas: false,
      personalizedIdeas: [ 
       
      ],
      requestedPersonalizedIdeas: false,
      requestedPersonalizedIdeasInterval: null,
      pi_thread_id: null,
      pi_message_id: null,
      pi_run_id: null,
      pi_status: null,

      loadingCustomIdeas: false,

      abortController: null,
      requestCanceller: null,

      likeIdeas: [],
      dislikeIdeas: [],
      credits:2,
      currentTab: 0,
      tabs: [
        {
          title: 'Top Ideas '
        },
        {
          title: 'Liked Ideas',
        },
        {
          title: 'Disiked Ideas',
        }
      ],
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
      }
    },
    'hasSetup': function () {
      if (this.hasSetup) {
        // this.requestPersonalizedIdeas()
        this.getPersonalizedIdeas()
      }
    },
    'requestedPersonalizedIdeas': function () {
      if (this.requestedPersonalizedIdeas) {
        this.requestedPersonalizedIdeasInterval = setInterval(() => {
          this.getPersonalizedIdeasStatus()
        }, 5000);
      }
    },
  },
  beforeMount() {
    setTimeout(() => this.getUser(), 2000)
  },
  mounted() {
    this.showSecondaryUI = false
    // this.keyword = 'Valorant'

    this.channelId = this.selectedChannel?.channel_id ?? null

    if (this.channelId) {
      this.checkAssistantExists()
    }
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
    requestPersonalizedIdeas() {
      this.loadingPersonalizedIdeas = true

      axios
        .post("ideation/request_personalized_ideas", { channelId: this.channelId })
        .then(res => {
          this.pi_thread_id = res.data.tid
          this.pi_run_id = res.data.rid

          this.requestedPersonalizedIdeas = true
        })
        .catch(error => {
          this.loadingPersonalizedIdeas = false
        })
    },
    getPersonalizedIdeasStatus() {
      let requestData = {
        tid: this.pi_thread_id,
        rid: this.pi_run_id
      }

      axios
        .post("ideation/personalized_ideas_status", requestData)
        .then(res => {
          this.pi_status = res.data.status

          if (this.pi_status == 'completed') {
            clearInterval(this.requestedPersonalizedIdeasInterval)

            setTimeout(() => {
              this.getPersonalizedIdeas()
            }, 7500);
          }
        })
    },
    getPersonalizedIdeas() {
      this.loadingPersonalizedIdeas = true
      axios
        .post("ideation/personalized_ideas", { channelId: this.channelId })
        .then(res => {
          if (res.data.refresh) {
            this.requestPersonalizedIdeas()
          }
          else {
            this.personalizedIdeas = res.data.ideas
            this.loadingPersonalizedIdeas = false
          }
        })
        .catch(error => {
          this.loadingPersonalizedIdeas = false
        })
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"))
    },
    saveIdea(idea) {
      // axios
      //   .post("ideation/save", { idea })
      //   .then(res => {
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: "Idea saved",
      //         icon: "SaveIcon",
      //         variant: "success",
      //       }, 
      //     })
      //   })
    },
    likeIdea(idea){
      // axios
      //   .post("ideation/save", { idea })
      //   .then(res => {
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: "Idea saved",
      //         icon: "SaveIcon",
      //         variant: "success",
      //       }, 
      //     })
      //   })
      idea.isLike=!idea.isLike
      idea.isDislike=false
      if(idea.isLike){
        if(this.likeIdeas.indexOf(idea.idea)< 0){ this.likeIdeas.push(idea.idea) }
        const index = this.dislikeIdeas.indexOf(idea.idea)
        if (index > -1) { this.dislikeIdeas.splice(index, 1) }
      }
      else if(!idea.isLike){
        const index = this.likeIdeas.indexOf(idea.idea)
        if (index > -1) { this.likeIdeas.splice(index, 1) }
      }
    },
    dislikeIdea(idea){
      // axios
      //   .post("ideation/save", { idea })
      //   .then(res => {
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: "Idea saved",
      //         icon: "SaveIcon",
      //         variant: "success",
      //       }, 
      //     })
      //   })
      idea.isDislike=!idea.isDislike
      idea.isLike=false
      if(idea.isDislike){
        if(this.dislikeIdeas.indexOf(idea.idea)< 0){ this.dislikeIdeas.push(idea.idea) }
        const index = this.likeIdeas.indexOf(idea.idea)
        if (index > -1) { this.likeIdeas.splice(index, 1) }
      }
      else if(!idea.isDislike){
        const index = this.dislikeIdeas.indexOf(idea.idea)
        if (index > -1) { this.dislikeIdeas.splice(index, 1) }
      }
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
.thumbnail-image{
  width: 38px;
  height: 38px;
  margin-top: -8px;
}
.blur-image-ai{
  filter: blur(3rem);
  max-height: 400px;
}
.mob-ai-bg{
  background: linear-gradient(196.5deg, #50148B 0%, #9B51E0 100%);
}
.mob-blur-image-ai{
  filter: blur(3rem);
  max-height: 242px;
}
.loading-text{
  font-size: 1.5rem;
  color: rgba(155, 81, 224, 1);
  font-weight:500;
}
.top-idea-tab{
  border-top: 1px solid rgba(217, 217, 217, 1);
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
}
.tab-border-top{
  border-top: 1px solid rgba(217, 217, 217, 1);
}
.hr-line{
  border: none;
  height: 2px;
  background: rgba(217, 217, 217, 0.7);
  margin-top: 2rem;
}
.generate-btn{
  padding: 9px;
}
.veefly-premium-btn{
  padding: 9px 35px;
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
  /* min-height: 1000px; */
  position: relative;
}
.back-main-div{
  padding: 2.2rem;
  box-shadow: 0px 0px 40px 0px rgba(155, 81, 224, 0.21);
  border-radius: 30px;
  background-color: white;
  position: relative;  
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
   padding: 9px;
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
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0.02em;
  text-align: right;
  margin-left: 8px;
}
.middle-blur-div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
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
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.02em;
  text-align: left;
  color: rgba(130, 130, 130, 1);
  margin-left: 8px;
}
.overflow-div{
  position:relative; 
  max-height:709px; 
  overflow-y:scroll;
}
::-webkit-scrollbar {
    width: 0;  
    background: transparent; 
} 
.thumbnail-img{
  width: 45px;
  height: 45px;
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
  .main-div,.back-main-div{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    min-height: calc(100vh - 348px);
  }
  .main-heading{
    font-size: 1.25rem;
  }
  .main-top-heading{
    font-size: 1.25rem;
  }
  .credit-text{
    font-size: 1.5rem;
  }
  .middle-blur-div{
    top: 120px;
  }
  .tab-border-top{
    min-height: calc(100vh - 610px);
  }
}

@media only screen and (max-width: 370px) {
  .ai-text{
    font-size:23px;
  }  
  .generate-btn{
    margin-left: 10px;
    font-size: 12px;
  }
  .breaking-point{
    display: none;
  }
  .overflow-div{
    max-height:738px; 
  }
  .credit-text{
    font-size: 1rem;
  }
  .small-image{
    width: 14px;
  }
  .main-heading{
     font-size: 1rem;
  }
  .thumbnail-img{
    width: 40px;
    height: 40px;
  }
  .back-main-div .thumbnail-img{
    width: 30px;
    height: 30px;
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

</style>
