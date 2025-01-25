import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mock, vi } from 'vitest';

import { mockCartItems } from '../../mocks/shopping-list.mock';
import { ShoppingService } from '../../services/shopping.service';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;
  let shoppingServiceMock: {
    getCartItems: Mock;
    cart: ReturnType<typeof signal>;
  };

  beforeEach(() => {
    shoppingServiceMock = {
      getCartItems: vi.fn(() => mockCartItems),
      cart: signal(mockCartItems),
    };

    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideHttpClient(), { provide: ShoppingService, useValue: shoppingServiceMock }],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create cart component', () => {
    expect(component).toBeInstanceOf(CartComponent);
  });

  it('should calculate the price of the items from cart', () => {
    expect(component.cartItems()).toEqual(mockCartItems);
    expect(component.totalPrice()).toEqual(9600);
  });
});
