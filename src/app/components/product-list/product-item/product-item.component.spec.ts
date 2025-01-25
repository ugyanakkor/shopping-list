import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { beforeEach, describe, expect, it } from 'vitest';

import { Product, ProductForm } from '../../../interfaces/product.interface';
import { mockProducts } from '../../../mocks/shopping-list.mock';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductItemComponent],
      providers: [provideHttpClient(), provideAnimationsAsync()],
    });

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(ProductItemComponent);
  });

  it('should check minimum amount of the product', () => {
    component.product = signal(mockProducts[0]);
    component.ngOnInit();
    expect(component.productForm.controls.amount.value).toEqual(component.product().minOrderAmount);
  });

  it('should set the fallback image src', () => {
    const errorEvent = {
      target: {
        src: '',
      } as HTMLImageElement,
    };
    component.onImageError(errorEvent as unknown as Event);
    expect(errorEvent.target.src).toEqual('missing-image.jpg');
  });

  it('should add to cart a valid from amount', () => {
    const product: Product = {
      id: '1',
      img: '',
      name: 'Test Product',
      price: 100,
      availableAmount: 10,
      minOrderAmount: 2,
    };

    const productFormInvalid = new FormGroup<ProductForm>({
      amount: new FormControl(1, { nonNullable: true }), // Invalid amount
    });

    component.addToCart(product, productFormInvalid);
    expect(product.availableAmount).toBe(10);

    const productFormValid = new FormGroup<ProductForm>({
      amount: new FormControl(3, { nonNullable: true }), // Invalid amount
    });

    component.addToCart(product, productFormValid);
    expect(product.availableAmount).toBe(7);
  });
});
