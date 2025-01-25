import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';

import { ShoppingService } from './shopping.service';

describe('ShoppingServiceService', () => {
  let service: ShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
