import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTransactionsComponent } from './view-my-transactions.component';

describe('ViewMyTransactionsComponent', () => {
  let component: ViewMyTransactionsComponent;
  let fixture: ComponentFixture<ViewMyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
