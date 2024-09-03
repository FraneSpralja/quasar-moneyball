import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        name: 'entries',
        path: '', 
        component: () => import('pages/PageEntries.vue') 
      },
      { 
        name: 'settings',
        path: 'settings', 
        component: () => import('pages/PageSettings.vue') 
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
