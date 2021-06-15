export default function() {
  return {
    title: 'humbleShit',
    facilityName: '',
    lastFeedback: {
      feedbackId: null,
      timestamp: null
    },

    navigationLinks: [
      {
        label: 'Home',
        icon: 'eva-grid-outline',
        to: '/home'
      },
      {
        label: 'Report',
        icon: 'eva-alert-triangle-outline',
        to: '/reports/facilities'
      },
      {
        label: 'Contacts',
        icon: 'eva-phone-outline',
        to: '/contacts'
      },
      {
        label: 'Menu',
        icon: 'eva-menu-outline',
        to: '/menu'
      }
    ],

    menuLinks: [
      {
        label: 'Tickets',
        icon: 'eva-alert-circle-outline',
        to: '/tickets/overview'
      },
      {
        label: 'Statistics',
        icon: 'eva-activity-outline',
        to: '/statistics'
      },
      {
        label: 'Staff',
        icon: 'eva-people-outline',
        to: '/staff'
      },
      {
        label: 'Facilities',
        icon: 'eva-home-outline',
        to: '/facilities'
      },
      {
        label: 'Parameters',
        icon: 'eva-checkmark-circle-outline',
        to: '/parameters'
      },
      {
        label: 'Shifts',
        icon: 'eva-clock-outline',
        to: '/shifts'
      },
      {
        label: 'Work Orders',
        icon: 'eva-clipboard-outline',
        to: '/work-orders'
      }
    ]
  }
}
