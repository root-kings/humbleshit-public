export function login(state, payload) {
  state.token = payload.token
  state.user = payload.user
}

export function logout(state) {
  state.token = ''
  state.user = { permissions: {} }
}

export function setShift(state, payload) {
  state.user.shift = payload.shift
  state.user.shiftActive = payload.shiftActive
  state.user.shiftAvailable = payload.shiftAvailable
}

export function fetchUser_success(state, payload) {
  state.user = payload
}

export function fetchUserShifts_success(state, payload) {
  state.userShifts = payload
}

export function startShift_success(state) {}
export function endShift_success(state) {}
