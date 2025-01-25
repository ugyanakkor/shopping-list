import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { Product } from '../../interfaces/product.interface';
import { ShoppingService } from '../../services/shopping.service';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    NgOptimizedImage,
    MatCardTitle,
    MatProgressSpinner,
    MatFormField,
    MatInput,
    ProductItemComponent,
  ],
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  public products = signal<Array<Product>>([]);
  constructor(protected readonly shoppingService: ShoppingService) {
    this.products = shoppingService.products;
  }
}
