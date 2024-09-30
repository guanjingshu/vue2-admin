import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#require-context
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  // modules: {
  //   app,
  //   settings,
  //   user
  // },
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths:['app','permission', 'user', 'settings']
  })]
})

export default store
