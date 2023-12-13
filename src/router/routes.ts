import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/OutsideLayout.vue'),
    children: [
      { path: 'login', meta: { transition: 'fade-left' }, component: () => import('pages/LoginPage.vue'), name: 'login' },
      { path: 'register', meta: { transition: 'fade-left' }, component: () => import('pages/RegisterPage.vue'), name: 'register' },
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', meta: { transition: 'fade-left' }, component: () => import('pages/IndexPage.vue'), name: 'home_page' },
      { path: 'picture', meta: { transition: 'fade-left' }, component: () => import('pages/AddNewPicturePage.vue'), name: 'add_picture' },
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
