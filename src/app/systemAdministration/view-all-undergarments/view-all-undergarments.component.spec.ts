import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllUndergarmentsComponent } from './view-all-undergarments.component';

describe('ViewAllUndergarmentsComponent', () => {
  let component: ViewAllUndergarmentsComponent;
  let fixture: ComponentFixture<ViewAllUndergarmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllUndergarmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllUndergarmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
