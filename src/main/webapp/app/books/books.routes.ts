import { Routes } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/book-list.component').then((m) => m.default),
    title: 'books.home.title',
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'delete',
    loadComponent: () => import('./delete/book-delete.component').then((m) => m.default),
    title: 'books.home.title',
  },
  {
    path: 'add',
    loadComponent: () => import('./add/book-add.component').then((m) => m.default),
    title: 'books.home.title',
  },
  {
    path: 'update',
    loadComponent: () => import('./update/book-update.component').then((m) => m.default),
    title: 'books.home.title',
  },

];

export default routes;
