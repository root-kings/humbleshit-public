import { api } from 'boot/axios'

export function fetchOpenTickets({ commit }) {
  api
    .get('/tickets/unresolved')
    .then(response => {
      commit('fetchOpenTickets_success', response.data)
    })
    .catch(err => {
      console.error(err)
    })
}
