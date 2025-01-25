import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductItemComponent],
    });

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(ProductItemComponent);
  });
});
