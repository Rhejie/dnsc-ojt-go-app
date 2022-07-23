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
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/UsersView.vue'),
      },
      {
        path: '/users/create/:formType',
        name: 'Create User',
        component: () => import('../views/user/CreateUserView.vue'),
        props: true
      },
      {
        path: '/users/update/:id',
        name: 'Update User',
        component: () => import('../views/user/CreateUserView.vue'),
        props: true
      }, 
      {
        path: '/institutes',
        name: 'Institutes',
        component: () => import('../views/InstituteView.vue')
      },
      {
        path: '/institutes/create',
        name: 'Create Institute',
        component: () => import('../views/institute/CreateInstitute.vue')
      },
      {
        path: '/institutes/update/:id',
        name: 'Update Institute',
        component: () => import('../views/institute/CreateInstitute.vue'),
        props: true
      },
      {
        path: '/courses',
        name: 'Courses',
        component: () => import('../views/CoursesView.vue')
      },
      {
        path: '/courses/create',
        name: 'Create Course',
        component: () => import('../views/course/CreateCourse.vue')
      },
      {
        path: '/courses/update/:id',
        name: 'Update Course',
        component: () => import('../views/course/CreateCourse.vue'),
        props: true
      },
      {
        path: '/agencies',
        name: 'Agencies',
        component: () => import('../views/agency/AgencyView.vue'),
        props: true
      },
      {
        path: '/agencies/create',
        name: 'Create Agency',
        component: () => import('../views/agency/AgencyForm.vue'),
      },

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
