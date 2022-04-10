import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSellerProductsComponent } from './view-seller-products.component';

describe('ViewSellerProductsComponent', () => {
  let component: ViewSellerProductsComponent;
  let fixture: ComponentFixture<ViewSellerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSellerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSellerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
