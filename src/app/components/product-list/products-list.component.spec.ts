import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let fixture: ComponentFixture<ProductsListComponent>;
  let component: ProductsListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [provideHttpClient()],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(ProductsListComponent);
  });
});
