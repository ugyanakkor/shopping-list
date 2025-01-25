import { FormControl } from '@angular/forms';

export interface Product {
  id: string;
  name: string;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
  price: number;
}

export interface CartItem {
  name: string;
  price: number;
  amount: number;
  id: string;
}

export interface ProductForm {
  amount: FormControl<number>;
}
