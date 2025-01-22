import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from '../../app.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsComponent],
    });

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(ProductsComponent);
  });
});
