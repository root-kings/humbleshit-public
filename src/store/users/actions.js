import { api } from 'boot/axios'

export function fetchAllStaff({ commit }) {
  api
    .get('/users/staff')
    .then(response => {
      commit('fetchAllStaff_success', response.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export function fetchReporteeStaff({ commit }) {
  api
    .get('/users/reportees')
    .then(response => {
      commit('fetchReporteeStaff_success', response.data)
    })
    .catch(error => {
      console.error(error)
    })
}
