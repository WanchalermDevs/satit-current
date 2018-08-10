import { TestBed, async, inject } from '@angular/core/testing';

import { LogedinGuard } from './logedin.guard';

describe('LogedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogedinGuard]
    });
  });

  it('should ...', inject([LogedinGuard], (guard: LogedinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
