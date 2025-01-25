import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { Product } from '../../interfaces/product.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-products',
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
  ],
  providers: [ShoppingService],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  public products = signal<Array<Product>>([]);
  private fallbackImage = 'missing-image.jpg';

  constructor(protected readonly shoppingService: ShoppingService) {
    this.products = shoppingService.products;
  }

  public onImageError(event: Event): void {
    // Replace the image source with the fallback image if the image fails to load
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
}
