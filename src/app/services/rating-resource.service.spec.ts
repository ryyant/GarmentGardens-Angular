import { TestBed } from '@angular/core/testing';

import { RatingResourceService } from './rating-resource.service';

describe('RatingResourceService', () => {
  let service: RatingResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
