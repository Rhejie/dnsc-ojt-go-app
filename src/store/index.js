import { createStore } from 'vuex'
import { login, getProfile } from '@/composables/auth_service'
import {
  ChartBarIcon,
  AcademicCapIcon,
  HomeIcon,
  OfficeBuildingIcon,
  LibraryIcon,
  UsersIcon,
  CalendarIcon,
  ArchiveIcon
} from '@heroicons/vue/outline'

export default createStore({
  state: {
    isLoggedIn: false,
    apiURL: 'http://127.0.0.1:8000/api',
    serverPath: 'http://127.0.0.1:8000',
    userProfile: {},
    sideBarNavigation: [
      { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
      { name: 'Users', href: '/users', icon: UsersIcon, current: false },
      { name: 'Institutes', href: '/institutes', icon: OfficeBuildingIcon, current: false },
      { name: 'Courses', href: '/courses', icon: AcademicCapIcon, current: false },
      { name: 'Agencies', href: '/agencies', icon: OfficeBuildingIcon, current: false },
      { name: 'Departments', href: '/agency-departments', icon: LibraryIcon, current: false },
      { name: 'Requirements', href: '/requirements', icon: ArchiveIcon, current: false },
      { name: 'School Year', href: '/school-year', icon: CalendarIcon, current: false },
      { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
      { name: 'File Requirements', href: '/file-requirements', icon: ArchiveIcon, current: false },
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
    },
    setSideBarByRole(state) {
      if(state.userProfile.role_id == 2) {
        state.sideBarNavigation = state.sideBarNavigation.filter((nav) => nav.name != 'Institutes')
      }
      else if(state.userProfile.role_id == 3) {
        state.sideBarNavigation = state.sideBarNavigation.filter((nav) => nav.name != 'Institutes' && nav.name != 'Courses' && nav.name != 'School Year')
      }
      else if(state.userProfile.role_id == 5) {
        state.sideBarNavigation = state.sideBarNavigation.filter((nav) => 
          nav.name != 'Institutes' && 
          nav.name != 'Courses' && 
          nav.name != 'School Year' &&
          nav.name != 'Requirements' &&
          nav.name != 'Departments' &&
          nav.name != 'Users' &&
          nav.name != 'Agencies')
      }
    }
  },
  actions: {
    async loginUser(context, payload) {
      await login(payload).then(res => {
        context.commit('setUserPorfile', res.data.user)
        context.commit('setSideBarByRole')
      })
    },
    async getUserProfile(context) {
      await getProfile().then(res => {
        context.commit('setUserPorfile', res.data)
        context.commit('setSideBarByRole')
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
