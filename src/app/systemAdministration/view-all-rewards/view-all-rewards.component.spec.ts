import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRewardsComponent } from './view-all-rewards.component';

describe('ViewAllRewardsComponent', () => {
  let component: ViewAllRewardsComponent;
  let fixture: ComponentFixture<ViewAllRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
