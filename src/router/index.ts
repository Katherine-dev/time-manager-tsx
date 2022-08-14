import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import PlacesToVisit from '@/components/PlacesToVisit/PlacesToVisit';
import RecipesPage from '@/components/RecipesPage/RecipesPage';
import Home from '../components/HomePage/Home';
import WorkPage from '../components/WorkPage/WorkPage';
import StudyPage from '../components/StudyPage/StudyPage';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: process.env.BASE_URL,
    name: 'Home',
    component: Home,
  },
  {
    path: '/work',
    name: 'WorkPage',
    component: WorkPage,
  },
  {
    path: '/study',
    name: 'StudyPage',
    component: StudyPage,
  },
  {
    path: '/places',
    name: 'PlacesToVisit',
    component: PlacesToVisit,
  },
  {
    path: '/recipes',
    name: 'RecipesPage',
    component: RecipesPage,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
