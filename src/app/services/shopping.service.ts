import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

import { tap } from 'rxjs';

import { CartItem, Product, ProductForm } from '../interfaces/product.interface';

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

  public addToCart(product: Product, productForm: FormGroup<ProductForm>): void {
    const amount = productForm.controls.amount.value;
    if (amount <= product.availableAmount && amount >= product.minOrderAmount) {
      product.availableAmount -= amount;

      const cartProduct = this.cart().find(item => item.id === product.id);
      if (cartProduct) {
        cartProduct.amount += amount;
      } else {
        this.cart.update(cart => [...cart, { name: product.name, price: product.price, amount, id: product.id }]);
      }

      console.log(this.cart());
    } else {
      alert('Cannot add more than available or less than the minimum order amount.');
    }

    productForm.reset();
  }

  public getCartItems(): Array<CartItem> {
    return this.cart();
  }
}
