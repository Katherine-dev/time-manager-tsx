import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../components/HomePage/Home'
import WorkPage from '../components/WorkPage/WorkPage'
import StudyPage from '../components/StudyPage/StudyPage'
import PlacesToVisit from '@/components/PlacesToVisit/PlacesToVisit'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/work',
    name: 'WorkPage',
    component: WorkPage
  },
  {
    path: '/study',
    name: 'StudyPage',
    component: StudyPage
  },
  {
    path: '/places',
    name: 'PlacesToVisit',
    component: PlacesToVisit
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
