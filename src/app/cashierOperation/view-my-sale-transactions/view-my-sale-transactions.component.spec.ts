import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMySaleTransactionsComponent } from './view-my-sale-transactions.component';

describe('ViewMySaleTransactionsComponent', () => {
  let component: ViewMySaleTransactionsComponent;
  let fixture: ComponentFixture<ViewMySaleTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMySaleTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMySaleTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
