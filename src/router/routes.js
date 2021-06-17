const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/feedback?facility=6093d438ea10a9000401cf40'
      },
      {
        name: 'feedback',
        path: 'feedback',
        component: () => import('pages/Index.vue')
      },
      {
        name: 'userfeedback',
        path: 'userfeedback',
        component: () => import('pages/UserFeedback.vue')
      },
      {
        name: 'sadfeedback',
        path: 'sadfeedback',
        component: () => import('src/pages/SadFeedback.vue')
      },
      {
        name: 'happyfeedback',
        path: 'happyfeedback',
        component: () => import('src/pages/HappyFeedback.vue')
      },
      {
        name: 'qrcodeerror',
        path: 'qrcodeerror',
        component: () => import('src/pages/QRCodeError.vue')
      },
      {
        name: 'thankyou',
        path: 'thankyou',
        component: () => import('src/pages/UserThankYou.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
