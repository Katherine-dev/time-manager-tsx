import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../components/HomePage/Home'
import WorkPage from '../components/WorkPage/WorkPage'
import StudyPage from '../components/StudyPage/StudyPage'
import PlacesToVisit from '@/components/PlacesToVisit/PlacesToVisit'
import RecipesPage from '@/components/RecipesPage/RecipesPage'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {name: 'Home'}
  },
  {
    path: '/time-manager-tsx/',
    name: 'Home',
    component: Home
  },
  {
    path: '/time-manager-tsx/work',
    name: 'WorkPage',
    component: WorkPage
  },
  {
    path: '/time-manager-tsx/study',
    name: 'StudyPage',
    component: StudyPage
  },
  {
    path: '/time-manager-tsx/places',
    name: 'PlacesToVisit',
    component: PlacesToVisit
  },
  {
    path: '/time-manager-tsx/recipes',
    name: 'RecipesPage',
    component: RecipesPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
