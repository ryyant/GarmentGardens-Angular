import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidRefundComponent } from './void-refund.component';

describe('VoidRefundComponent', () => {
  let component: VoidRefundComponent;
  let fixture: ComponentFixture<VoidRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoidRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
