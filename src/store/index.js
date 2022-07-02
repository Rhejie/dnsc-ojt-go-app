import { createStore } from 'vuex'
import {login} from '@/composables/auth_service'

export default createStore({
  state: {
    isLoggedIn: false,
    apiURL: 'http://127.0.0.1:8000/api',
    serverPath: 'http://127.0.0.1:8000',
    userProfile: {}
  },
  getters: {
  },
  mutations: {
    setUserPorfile(state, payload) {
      state.userProfile = payload
    }
  },
  actions: {
    async loginUser(context, payload) {
      await login(payload).then( res => {
          context.commit('setUserPorfile', res.data)
      })
    }
  },
  modules: {
  }
})
