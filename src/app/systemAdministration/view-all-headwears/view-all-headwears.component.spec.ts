import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllHeadwearsComponent } from './view-all-headwears.component';

describe('ViewAllHeadwearsComponent', () => {
  let component: ViewAllHeadwearsComponent;
  let fixture: ComponentFixture<ViewAllHeadwearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllHeadwearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllHeadwearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
