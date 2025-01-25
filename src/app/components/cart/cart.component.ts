import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

import { CartItem } from '../../interfaces/product.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-cart',
  imports: [MatCard, MatCardHeader, MatCardContent, MatDivider],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public totalPrice = signal<number>(0);
  public cartItems = signal<Array<CartItem>>([]);
  constructor(private readonly shoppingService: ShoppingService) {
    this.cartItems = shoppingService.cart;

    for (const cartItem of shoppingService.getCartItems()) {
      this.totalPrice.update(previousValue => previousValue + cartItem.amount * cartItem.price);
    }
  }
}
