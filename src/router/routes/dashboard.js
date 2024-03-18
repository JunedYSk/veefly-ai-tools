export default [

  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/dashboard/profile/Profile.vue'),
  },
  {
    path: '/ai-generator',
    name: 'ai-generator',
    component: () => import('@/views/dashboard/ai-generator/AiGenerator.vue'),
  },
  {
    path: '/ai-daily-ideas',
    name: 'ai-daily-ideas',
    component: () => import('@/views/dashboard/ai-daily-ideas/AiDailyIdeas.vue'),
  },

  // {
  //   path: '/subscriptions',
  //   name: 'subcriptions',
  //   component: () => import('@/views/dashboard/subscriptions/Subscription.vue'),
  // },






  
 

  // {
  //   path: '/channel-campaigns',
  //   name: 'channel-campaigns',
  //   component: () => import('@/views/dashboard/channel-campaigns/ChannelCampaigns.vue'),
  // },
  // {
  //   path: '/packages',
  //   name: 'packages',
  //   component: () => import('@/views/dashboard/packages/Packages.vue'),
  // },
  // {
  //   path: '/monetisation-package',
  //   name: 'monetisation-package',
  //   component: () => import('@/views/dashboard/packages/MonetisationPackage.vue'),
  // },
  // {
  //   path: '/buy-monetisation-package',
  //   name: 'buy-monetisation-package',
  //   component: () => import('@/views/dashboard/packages/BuyMonetisationPackage.vue'),
  // },
  // {
  //   path: '/one-mill-package',
  //   name: 'one-million-package',
  //   component: () => import('@/views/dashboard/packages/OneMillionPackage.vue'),
  // },
 

  // {
  //   path: '/buy-silver-package',
  //   name: 'buy-silver-package',
  //   component: () => import('@/views/dashboard/packages/BuySilverPackage.vue'), 
  // },
  // {
  //   path: '/bulk-views-packages',
  //   name: 'bulk-views-packages',
  //   component: () => import('@/views/dashboard/packages/BulkViewPackages.vue'),
  // },
  // {
  //   path: '/custom-package-details/:id',
  //   name: 'custom-package-details',
  //   component: () => import('@/views/dashboard/packages/PackageDetails.vue'),
  //   meta: { bodyClass: 'package-details-page' }
  // },
  // {
  //   path: '/custom-package-details/:id/create-package',
  //   name: 'create-package',
  //   component: () => import('@/views/dashboard/packages/CreateCustomPackage.vue'),
  // },

  // {
  //   path: '/channel-details/:id',
  //   name: 'channel-details',
  //   component: () => import('@/views/dashboard/channel-campaigns/ChannelDetails.vue'),
  // },
 
 
]
