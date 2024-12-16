import { Route } from '@strapi/admin';

const routes = [
  // ... other routes ...
  {
    path: '/my-page',
    component: () => import('../pages/home'),
  },
];

export default routes;