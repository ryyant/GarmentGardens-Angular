import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRewardDetailsComponent } from './view-reward-details.component';

describe('ViewRewardDetailsComponent', () => {
  let component: ViewRewardDetailsComponent;
  let fixture: ComponentFixture<ViewRewardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRewardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRewardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
