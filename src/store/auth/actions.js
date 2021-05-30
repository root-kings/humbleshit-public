import { api } from 'boot/axios'

// import { Loading } from 'quasar'

export function login({ commit }, { phone, password }) {
  return new Promise((resolve, reject) => {
    api
      .post('/auth/login', {
        phone: phone,
        password: password,
        userType: 'regular'
      })
      .then(response => {
        if (response.data.status) {
          setAxiosHeaders(response.data.token)
          commit('login', response.data)
        }
        resolve(response.data)
      })
      .catch(err => {
        reject()
      })
  })
}

export function fetchUser({ commit }) {
  api
    .get('/users/profile')
    .then(response => {
      commit('fetchUser_success', response.data)
    })
    .catch(err => {
      console.error(err)
    })
}

export function fetchUserShifts({ commit }) {
  api
    .get('/users/shifts')
    .then(response => {
      let userShifts = response.data
      userShifts.forEach(shift => {
        shift.status = shiftStatusMapper(shift)
      })
      commit('fetchUserShifts_success', userShifts)
    })
    .catch(err => {
      console.error(err)
    })
}

export function logout(context) {
  context.commit('logout')
  setAxiosHeaders('')
}

export function setShift(context, payload) {
  context.commit('setShift', payload)
}

function setAxiosHeaders(token) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

function shiftStatusMapper(shift) {
  if (shift.finished) {
    return 'finished'
  } else if (shift.started) {
    return 'started'
  } else if (shift.missed) {
    return 'missed'
  } else if (shift.late) {
    return 'late'
  } else {
    return 'upcoming'
  }
}

export function startShift({ commit, dispatch }, shift) {
  api
    .put('/users/shifts/' + shift._id + '/start')
    .then(response => {
      dispatch('fetchUserShifts')
      commit('startShift_success')
    })
    .catch(err => {
      console.error(err)
    })
}

export function endShift({ commit, dispatch }, shift) {
  api
    .put('/users/shifts/' + shift._id + '/end')
    .then(response => {
      dispatch('fetchUserShifts')
      commit('endShift_success')
    })
    .catch(err => {
      console.error(err)
    })
}
