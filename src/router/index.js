import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/WelcomeView.vue'
import {isloggedIn} from '@/composables/auth_service'
import store from '@/store/index'
 
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
        component: () => import('../views/InstituteView.vue'),
        beforeEnter(to, from, next) {
          if(store.state.userProfile.role_id == 1) {
            next();
          }
          else {
            next('/dashboard');
          }
       }
      },
      {
        path: '/institutes/create',
        name: 'Create Institute',
        component: () => import('../views/institute/CreateInstitute.vue'),
        beforeEnter(to, from, next) {
          if(store.state.userProfile.role_id == 1) {
            next();
          }
          else {
            next('/dashboard');
          }
       }
      },
      {
        path: '/institutes/update/:id',
        name: 'Update Institute',
        component: () => import('../views/institute/CreateInstitute.vue'),
        props: true,
        beforeEnter(to, from, next) {
          if(store.state.userProfile.role_id == 1) {
            next();
          }
          else {
            next('/dashboard');
          }
       }
      },
      {
        path: '/courses',
        name: 'Courses',
        component: () => import('../views/CoursesView.vue'),
      //   beforeEnter(to, from, next) {
      //     if(store.state.userProfile.role_id == 1 || store.state.userProfile.role_id == 2) {
      //       next();
      //     }
      //     else {
      //       next('/dashboard');
      //     }
      //  }
      },
      {
        path: '/courses/create',
        name: 'Create Course',
        component: () => import('../views/course/CreateCourse.vue'),
        beforeEnter(to, from, next) {
          if(store.state.userProfile.role_id == 1 || store.state.userProfile.role_id == 2) {
            next();
          }
          else {
            next('/dashboard');
          }
       }
      },
      {
        path: '/courses/update/:id',
        name: 'Update Course',
        component: () => import('../views/course/CreateCourse.vue'),
        props: true,
        beforeEnter(to, from, next) {
          if(store.state.userProfile.role_id == 1 || store.state.userProfile.role_id == 2) {
            next();
          }
          else {
            next('/dashboard');
          }
       }
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
      {
        path: '/agencies/update/:id',
        name: 'Update Agency',
        component: () => import('../views/agency/AgencyForm.vue'),
        props: true
      },
      {
        path: '/agency-departments',
        name: 'Agency Departments',
        component: () => import('../views/agency/AgencyDepartmentView.vue'),
        props: true
      },
      {
        path: '/agency-departments/create',
        name: 'Create Department',
        component: ()  => import('../views/agency/AgencyDepartmentForm.vue'),
      },
      {
        path: '/agency-departments/update/:id',
        name: 'Update Department',
        component: ()  => import('../views/agency/AgencyDepartmentForm.vue'),
        props: true
      },
      {
        path: '/requirements',
        name: 'Requiremnets',
        component: () => import('../views/requirements/RequirementView.vue'),
      },
      {
        path: '/requiremnets/create',
        name: 'Create Requirement Form',
        component: () => import('../views/requirements/RequirementForm.vue')
      },
      {
        path: '/requiremnets/update/:id',
        name: 'Update Requirement Form',
        component: () => import('../views/requirements/RequirementForm.vue'),
        props: true,
      },
      {
        path: '/school-year',
        name: 'School Year',
        component: () => import('../views/school_year/SchoolYearView.vue'),
      },
      {
        path: '/file-requirements',
        name: 'File Requirements',
        component: () => import('../views/requirements/FileRequirementsView.vue')
      }, 
      {
        path: '/file-requirements/:id',
        name: 'View File Requirements',
        props: true,
        component: () => import('../views/requirements/FileRequirementsList.vue')
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
