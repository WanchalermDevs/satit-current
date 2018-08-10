import { TestBed, inject } from '@angular/core/testing';

import { EqaService } from './eqa.service';

describe('EqaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EqaService]
    });
  });

  it('should be created', inject([EqaService], (service: EqaService) => {
    expect(service).toBeTruthy();
  }));
});
