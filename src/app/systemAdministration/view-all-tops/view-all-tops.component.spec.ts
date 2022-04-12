import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTopsComponent } from './view-all-tops.component';

describe('ViewAllTopsComponent', () => {
  let component: ViewAllTopsComponent;
  let fixture: ComponentFixture<ViewAllTopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
