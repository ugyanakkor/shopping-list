import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
