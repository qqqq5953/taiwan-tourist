import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: () => import('../views/SearchResult.vue'),
    props: route => {
      return {
        inputKeywords: route.query.q,
        type: route.query.type,
        city: route.query.city
      };
    }
  },
  {
    path: '/moreResult',
    name: 'MoreResult',
    component: () => import('../views/MoreResult.vue')
  },
  {
    path: '/cardDetail',
    name: 'CardDetail',
    component: () => import('../views/CardDetail.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/PageNotFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
