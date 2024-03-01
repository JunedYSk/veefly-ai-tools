export default [
  {
    path: '/start',
    name: 'start',
    component: () => import('@/views/start/Start.vue'),
  },
  // {
  //   path: '/add-video',
  //   name: 'add-video',
  //   component: () => import('@/views/add-video/AddVideo.vue'),
  // },
  // {
  //   path: '/channel-add-video',
  //   name: 'channel-add-video',
  //   component: () => import('@/views/add-video/ChannelAddVideo.vue'),
  // },
  // {
  //   path: '/video-list',
  //   name: 'video-list',
  //   component: () => import('@/views/add-video/VideosList.vue'),
  //   meta: { bodyClass: 'package-details-page' }
  // },
  // {
  //   path: '/channel-link',
  //   name: 'channel-link',
  //   component: () => import('@/views/add-video/ChannelVideosList.vue'),
  //   meta: { bodyClass: 'package-details-page' }
  // },
  {
    path: '/channel-videos',
    name: 'channel-videos',
    component: () => import('@/views/add-video/ChannelVideos.vue'),
    meta: { bodyClass: 'package-details-page' }
  },
]
