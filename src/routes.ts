import { lazy } from 'react';

import Home from './pages/Home';
const Shop = lazy(() => import('./pages/Shop'));
const Videos = lazy(() => import('./pages/Videos'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const appRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/shop',
    component: Shop,
  },
  {
    path: '/videos',
    component: Videos,
  },
  {
    path: '*',
    component: NotFound
  }
];