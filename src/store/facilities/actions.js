import { api } from 'boot/axios'

export function fetchFacilities({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get('/facilities')
      .then(response => {
        commit('fetchFacilities_success', response.data)
        resolve(response.data)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}
