import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStaffsComponent } from './view-all-staffs.component';

describe('ViewAllStaffsComponent', () => {
  let component: ViewAllStaffsComponent;
  let fixture: ComponentFixture<ViewAllStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllStaffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
