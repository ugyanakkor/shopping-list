import { CartItem, Product } from '../interfaces/product.interface';

export const productsMock: Array<Product> = [
  { id: '1', name: 'Apple', price: 1000, availableAmount: 10, minOrderAmount: 1, img: 'apple.jpg' },
  { id: '2', name: 'Windows', price: 800, availableAmount: 20, minOrderAmount: 2, img: 'windows.jpg' },
];

export const cartItemsMock: Array<CartItem> = [
  { id: '1', name: 'Apple', price: 1000, amount: 8 },
  { id: '2', name: 'Windows', price: 800, amount: 2 },
];
