import { createStore } from 'vuex'
import { login, getProfile } from '@/composables/auth_service'
import {
  ChartBarIcon,
  AcademicCapIcon,
  HomeIcon,
  InboxIcon,
  OfficeBuildingIcon,
  UsersIcon,
} from '@heroicons/vue/outline'

export default createStore({
  state: {
    isLoggedIn: false,
    apiURL: 'http://dnsc-ojt-go.test/api',
    serverPath: 'http://dnsc-ojt-go.test',
    userProfile: {},
    sideBarNavigation: [
      { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
      { name: 'Users', href: '/users', icon: UsersIcon, current: false },
      { name: 'Institutes', href: '/institutes', icon: OfficeBuildingIcon, current: false },
      { name: 'Courses', href: '/courses', icon: AcademicCapIcon, current: false },
      { name: 'Documents', href: '#', icon: InboxIcon, current: false },
      { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
    ]
  },
  getters: {
  },
  mutations: {
    setUserPorfile(state, payload) {
      state.userProfile = payload
    },
    setActiveSideBarNavigation(state, {page, value}) {
      state.sideBarNavigation = state.sideBarNavigation.map((nav) => {
        if(nav.name === page) {
          nav.current = value
        }
        else {
          nav.current = false
        }
        return nav
      })
    }
  },
  actions: {
    async loginUser(context, payload) {
      await login(payload).then(res => {
        context.commit('setUserPorfile', res.data.user)
      })
    },
    async getUserProfile(context) {
      await getProfile().then(res => {
        context.commit('setUserPorfile', res.data)
      }).catch(error => {
        if (error) {
          localStorage.removeItem('dnsc')
        }
      })
    },
    setActiveNavigation(context, {page, value}) {
      context.commit('setActiveSideBarNavigation', {page, value})
    }
  },
  modules: {
  }
})
