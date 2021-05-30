export default [
  {
    title: 'Home',
    link: '/home',
    icon: 'eva-grid-outline',
    permissions: []
  },
  {
    title: 'Report',
    link: '/reports/facilities',
    icon: 'eva-alert-triangle-outline',
    permissions: ['reportRead', 'reportWrite']
  },
  {
    title: 'Tickets',
    icon: 'eva-alert-circle-outline',
    link: '/tickets/overview',
    permissions: ['ticketRead']
  },
  {
    title: 'Contacts',
    icon: 'eva-phone-outline',
    link: '/contacts',
    permissions: []
  }
]
