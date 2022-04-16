import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisputeComponent } from './create-dispute.component';

describe('CreateDisputeComponent', () => {
  let component: CreateDisputeComponent;
  let fixture: ComponentFixture<CreateDisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
