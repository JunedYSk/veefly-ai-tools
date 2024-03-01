export default [
  {
    path: '/payment/:id',
    name: 'payment',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/Payment.vue'),
  },
  {
    path: '/payment-status/',
    name: 'payment-status',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/PaymentStatus.vue'),
  },
  {
    path: '/package-payment/:id',
    name: 'package-payment',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/PackagePayment.vue'),
  },
  {
    path: '/channel-payment/:id',
    name: 'channel-payment',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/ChannelPayment.vue'),
  },
  {
    path: '/subscription-payment/:id',
    name: 'subscription-payment',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/SubscribePayment.vue'),
  },
  {
    path: '/subscription-status/',
    name: 'subscription-status',
    meta: {
      layout: 'full',
    },
    component: () => import('@/views/payment/SubscribeStatus.vue'),
  },
]
