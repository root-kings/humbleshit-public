import { api } from 'boot/axios'

export function fetchCategories({ commit }) {
  api
    .get('/parameters/categories')
    .then(response => {
      commit('fetchCategories_success', response.data)
    })
    .catch(err => {
      console.error(err)
    })
}

export function fetchParameters({ commit }) {
  api
    .get('/parameters')
    .then(response => {
      commit('fetchParameters_success', response.data)
    })
    .catch(err => {
      console.error(err)
    })
}

export function fetchParametersGrouped({ commit }) {
  api
    .get('/parameters/grouped')
    .then(response => {
      commit('fetchParametersGrouped_success', response.data)
    })
    .catch(err => {
      console.error(err)
    })
}
