import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

export const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', redirectTo: 'products'},
]
