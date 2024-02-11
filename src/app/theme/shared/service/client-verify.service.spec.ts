import { TestBed } from '@angular/core/testing';

import { ClientVerifyService } from './client-verify.service';

describe('ClientVerifyService', () => {
  let service: ClientVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
