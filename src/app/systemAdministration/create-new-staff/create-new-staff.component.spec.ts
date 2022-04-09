import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewStaffComponent } from './create-new-staff.component';

describe('CreateNewStaffComponent', () => {
  let component: CreateNewStaffComponent;
  let fixture: ComponentFixture<CreateNewStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
