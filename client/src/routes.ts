import { lazy } from 'react';

import Home from './pages/Home';
const Shop = lazy(() => import('./pages/Shop'));
const Videos = lazy(() => import('./pages/Videos'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Collections = lazy(() => import('./pages/Collections'));

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
  },
  {
    path: '/privacy',
    component: Privacy,
  },
  {
    path: '/terms',
    component: Terms,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/collections',
    component: Collections,
  }
];