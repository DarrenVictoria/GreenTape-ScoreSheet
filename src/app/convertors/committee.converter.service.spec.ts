import { TestBed, inject } from '@angular/core/testing';

import { Committee.ConverterService } from './committee.converter.service';

describe('Committee.ConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Committee.ConverterService]
    });
  });

  it('should be created', inject([Committee.ConverterService], (service: Committee.ConverterService) => {
    expect(service).toBeTruthy();
  }));
});
