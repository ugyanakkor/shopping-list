import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { Product, ProductForm } from '../../../interfaces/product.interface';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'app-product-item',
  imports: [MatFormField, ReactiveFormsModule, MatButton, MatInput],
  templateUrl: './product-item.component.html',
  standalone: true,
  styleUrl: './product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  public product = input.required<Product>();
  public productForm: FormGroup<ProductForm>;

  private fallbackImage = 'missing-image.jpg';

  constructor(protected readonly shoppingService: ShoppingService) {}

  public ngOnInit(): void {
    this.productForm = new FormGroup<ProductForm>({
      amount: new FormControl<number>(this.product().minOrderAmount, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public onImageError(event: Event): void {
    // Replace the image source with the fallback image if the image fails to load
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
}
