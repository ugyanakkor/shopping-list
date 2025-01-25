import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./components/product-list/products-list.component').then(m => m.ProductsListComponent),
  },
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: '**', redirectTo: 'products' },
];
