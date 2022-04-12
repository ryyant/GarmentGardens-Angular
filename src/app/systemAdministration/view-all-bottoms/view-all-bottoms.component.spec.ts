import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBottomsComponent } from './view-all-bottoms.component';

describe('ViewAllBottomsComponent', () => {
  let component: ViewAllBottomsComponent;
  let fixture: ComponentFixture<ViewAllBottomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllBottomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllBottomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
