export default [
  {
    title: 'Parameters',
    icon: 'eva-checkmark-circle-outline',
    link: '/parameters',
    permissions: ['parameterRead', 'parameterWrite']
  },
  {
    title: 'Staff',
    icon: 'eva-people-outline',
    link: '/staff',
    permissions: ['staffRead', 'staffWrite']
  },
  {
    title: 'Statistics',
    icon: 'eva-activity-outline',
    link: '/statistics',
    permissions: ['statisticsRead']
  },
  {
    title: 'Facilities',
    link: '/facilities',
    icon: 'eva-home-outline',
    permissions: ['facilityRead', 'facilityWrite']
  },
  {
    title: 'Work Order',
    link: '/workorder',
    permissions: ['workorderRead', 'workorderWrite']
  },
  {
    title: 'Shifts',
    icon: 'eva-clock-outline',
    link: '/shifts',
    permissions: ['shiftRead', 'shiftWrite']
  },
  {
    title: 'About',
    icon: 'eva-info-outline',
    link: '/about',
    permissions: []
  }
]
