const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/feedback?facility=6093d438ea10a9000401cf'
      },
      {
        path: 'about',
        component: () => import('pages/About.vue')
      },
      {
        name: 'feedback',
        path: 'feedback',
        component: () => import('pages/Index.vue')
      },
      {
        name: 'menu',
        path: 'menu',
        component: () => import('pages/Menu.vue')
      },
      {
        name: 'parameters',
        path: 'parameters',
        component: () => import('pages/Parameters.vue')
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
        name: 'thankyou',
        path: 'thankyou',
        component: () => import('src/pages/UserThankYou.vue')
      },
      {
        path: 'staff',
        component: () => import('pages/Staff.vue')
      },
      {
        path: 'staff/:id',
        component: () => import('pages/StaffProfile.vue'),
        props: true
      },
      {
        path: 'facilities',
        component: () => import('pages/Facilities.vue')
      },
      {
        path: 'facilities/:id',
        component: () => import('pages/Facility.vue'),
        props: true
      },
      {
        path: 'shifts',
        component: () => import('pages/Shifts.vue')
      },
      {
        path: 'shifts/:id',
        component: () => import('pages/ShiftDetails.vue'),
        props: true
      },
      {
        path: 'tickets/overview',
        component: () => import('pages/TicketsOverview.vue'),
        props: true
      },
      {
        path: 'tickets/by-parameter/:id',
        component: () => import('pages/TicketsByParameter.vue'),
        props: true
      },
      {
        path: 'reports/facilities',
        component: () => import('pages/ReportFacilities.vue'),
        props: true
      },
      {
        path: 'reports/checklist',
        component: () => import('pages/ReportChecklist.vue'),
        props: true
      },
      {
        path: 'reports/details',
        component: () => import('pages/ReportIssueDetails.vue'),
        props: true
      },
      {
        path: 'reports/submit',
        component: () => import('pages/ReportSubmit.vue'),
        props: true
      },
      {
        path: 'contacts',
        component: () => import('pages/Contacts.vue'),
        props: true
      }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      }
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
