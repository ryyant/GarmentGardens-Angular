import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProductsPfComponent } from './view-all-products-pf.component';

describe('ViewAllProductsPfComponent', () => {
  let component: ViewAllProductsPfComponent;
  let fixture: ComponentFixture<ViewAllProductsPfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllProductsPfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProductsPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
