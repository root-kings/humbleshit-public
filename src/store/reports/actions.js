import { api } from 'boot/axios'

export function fetchShiftState({ commit, rootGetters }) {
  let userActiveShift = rootGetters['auth/userActiveShift']

  if (!!userActiveShift)
    api
      .get('/shifts/' + userActiveShift.shift)
      .then(response => {
        commit('fetchShiftState_success', response.data)
      })
      .catch(err => {
        console.error(err)
      })
}

export function startCheckup({ commit, getters }, facilityId) {
  commit('setSelectedFacility', facilityId)

  let facility = getters.selectedFacility

  if (facility.checkStatus == 'todo') {
  }
}

export function saveReport({ commit }, report) {
  commit('setReport', report)
}
