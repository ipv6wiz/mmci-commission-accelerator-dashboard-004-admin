import { TestBed } from '@angular/core/testing';

import { MlsListService } from './mls-list.service';

describe('MlsListService', () => {
  let service: MlsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MlsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
