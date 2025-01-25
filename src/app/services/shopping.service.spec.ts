import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { mockCartItems, mockProducts } from '../mocks/shopping-list.mock';
import { ShoppingService } from './shopping.service';

describe('ShoppingService', () => {
  let service: ShoppingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ShoppingService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush(mockProducts);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should create shopping service', () => {
    expect(service).toBeInstanceOf(ShoppingService);
  });

  it('should product to be fetched from constructor', () => {
    expect(service.productsLoading()).toBe(false);
    expect(service.products()).toEqual(mockProducts);
  });

  it('should get the cart items from the service', () => {
    expect(service.getCartItems()).toEqual([]);
    service.cart.set(mockCartItems);
    expect(service.getCartItems()).toEqual(mockCartItems);
  });
});
