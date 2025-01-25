import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartItem, Product, ProductForm } from '../../../interfaces/product.interface';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'app-product-item',
  imports: [MatFormField, ReactiveFormsModule, MatButton, MatInput, TitleCasePipe, MatError, MatPrefix],
  templateUrl: './product-item.component.html',
  standalone: true,
  styleUrl: './product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  public product = input.required<Product>();
  public productForm: FormGroup<ProductForm>;

  private fallbackImage = 'missing-image.jpg';

  constructor(
    protected readonly shoppingService: ShoppingService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.productForm = new FormGroup<ProductForm>({
      amount: new FormControl<number>(this.product().minOrderAmount, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(this.product().minOrderAmount),
          Validators.max(this.product().availableAmount),
        ],
      }),
    });
  }

  public onImageError(event: Event): void {
    // Replace the image source with the fallback image if the image fails to load
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }

  public addToCart(product: Product, productForm: FormGroup<ProductForm>): void {
    const amount = productForm.controls.amount.value;
    const cart = this.shoppingService.cart;
    if (amount <= product.availableAmount && amount >= product.minOrderAmount) {
      product.availableAmount -= amount;

      const cartProduct = cart().find((item: CartItem) => item.id === product.id);
      if (cartProduct) {
        cartProduct.amount += amount;
      } else {
        cart.update((cart: Array<CartItem>) => [
          ...cart,
          { name: product.name, price: product.price, amount, id: product.id },
        ]);
      }

      this.snackBar.open(`${amount} ${product.name} added to the cart successfully!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-toast'],
      });
    } else {
      alert('Cannot add more than available or less than the minimum order amount.');
    }

    productForm.reset();
  }
}
