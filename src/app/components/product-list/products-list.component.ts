import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { Product } from '../../interfaces/product.interface';
import { ShoppingService } from '../../services/shopping.service';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent, MatProgressSpinner],
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
