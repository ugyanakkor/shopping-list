import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { tap } from 'rxjs';

import { CartItem, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  public products = signal<Array<Product>>([]);
  public cart = signal<Array<CartItem>>([]);
  public productsLoading = signal<boolean>(true);
  private apiUrl = 'https://63c10327716562671870f959.mockapi.io/products';

  constructor(private readonly http: HttpClient) {
    this.http
      .get<Array<Product>>(this.apiUrl)
      .pipe(
        tap(products => {
          this.products.set(products);
          this.productsLoading.set(false);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public getCartItems(): Array<CartItem> {
    return this.cart();
  }
}
