import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { AppComponent } from '../../app.component';
import { ProductsListComponent } from './products-list.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsListComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsListComponent],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(ProductsListComponent);
  });
});
