import { TestBed, inject } from '@angular/core/testing';

import { CongregationService } from './congregation.service';

describe('CongregationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongregationService]
    });
  });

  it('should be created', inject([CongregationService], (service: CongregationService) => {
    expect(service).toBeTruthy();
  }));
});
