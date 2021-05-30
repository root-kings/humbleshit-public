import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import general from './general'
import parameters from './parameters'
import tickets from './tickets'
import reports from './reports'
import users from './users'
import facilities from './facilities'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      auth,
      general,
      parameters,
      tickets,
      reports,
      users,
      facilities
    },

    plugins: [createPersistedState()],


    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
