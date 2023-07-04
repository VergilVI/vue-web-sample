import Vue from 'vue'
import VueRouter from 'vue-router'
// import SpecialList from '../views/special/SpecialList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/40years-meeting',
    redirect: '/blank',
  },
  // {
  //   path: '/special/:colId/:sId',
  //   name: 'Special',
  //   meta: {
  //     title: '深圳Plus - 专题详情'
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "specail" */ '../views/special/Special.vue')
  // },
  {
    path: '/40years-meeting',
    name: 'Meeting',
    meta: {
      title: '深圳特区报创刊40周年座谈会暨采风活动'
    },
    component: () => import(/* webpackChunkName: "service" */ '../views/meeting/Meeting.vue')
  },
  {
    path: '/40years-party',
    name: 'Party',
    meta: {
      title: '深圳特区报创刊40周年答谢暨公益慈善晚会'
    },
    component: () => import(/* webpackChunkName: "service" */ '../views/meeting/Meeting.vue')
  },
  {
    path: '/blank',
    name: 'Blank',
    meta: {
      title: 'Blank'
    },
    component: () => import(/* webpackChunkName: "service" */ '../views/blank/Blank.vue')
  },
  {
    path: '*',
    // redirect: '/40years-meeting',
    redirect: '/blank',
  },

]


const router = new VueRouter({
  // history:'history',
  // mode: 'history',
  routes
})

export default router
