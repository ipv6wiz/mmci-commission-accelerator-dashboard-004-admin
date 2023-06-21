import { TestBed } from '@angular/core/testing';

import { CustomsThemeService } from './customs-theme.service';

describe('CustomsThemeService', () => {
  let service: CustomsThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomsThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
