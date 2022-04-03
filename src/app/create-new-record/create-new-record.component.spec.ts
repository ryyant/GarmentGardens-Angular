import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewRecordComponent } from './create-new-record.component';

describe('CreateNewRecordComponent', () => {
  let component: CreateNewRecordComponent;
  let fixture: ComponentFixture<CreateNewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
