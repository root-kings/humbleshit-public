import drawerLinksData from '../../utils/drawerLinks'
import homeLinksData from '../../utils/homeLinks'

export function token(state) {
  return state.token
}

export function user(state) {
  return state.user
}

export function userShifts({ userShifts }) {
  return userShifts
}

export function userActiveShift({ userShifts }) {
  let shifts = userShifts.filter(s =>
    ['started', 'late', 'upcoming'].includes(s.status)
  )

  if (shifts.length) return shifts[0]
  return null
}

export function organization({ user }) {
  return user.organization
}

export function nextShiftTime(state) {
  return state.user.nextShiftTime
}

export function userPermissions({ user }) {
  return user.permissions
}

export function drawerLinks({ user }) {
  const { permissions } = user
  let activePermissions = Object.keys(permissions).filter(k => permissions[k])

  return drawerLinksData.filter(link =>
    link.permissions.every(permission => activePermissions.includes(permission))
  )
}

export function homeLinks({ user }) {
  const { permissions } = user
  let activePermissions = Object.keys(permissions).filter(k => permissions[k])

  return homeLinksData.filter(link =>
    link.permissions.every(permission => activePermissions.includes(permission))
  )
}
