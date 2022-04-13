import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyRewardsComponent } from './view-my-rewards.component';

describe('ViewMyRewardsComponent', () => {
  let component: ViewMyRewardsComponent;
  let fixture: ComponentFixture<ViewMyRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
