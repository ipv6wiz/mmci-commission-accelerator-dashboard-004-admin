import { TestBed } from '@angular/core/testing';

import { EscrowCompanyService } from './escrow-company.service';

describe('EscrowCompanyService', () => {
  let service: EscrowCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscrowCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
