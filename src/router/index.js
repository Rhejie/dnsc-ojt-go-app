import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/WelcomeView.vue'
import {isloggedIn} from '@/composables/auth_service'
 
const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        props: true,
      }
    ],
    beforeEnter(to, from, next) {
       if(!isloggedIn()) {
          next('/login')
       }
       else {
          next();
       }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    beforeEnter(to, from, next) {
      if(isloggedIn) {
        next();
      }
      else {
        next('/login');
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
