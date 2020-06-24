import { TestBed } from '@angular/core/testing';

import { LoginMockService } from './login-mock.service';

describe('LoginMockService', () => {
  let service: LoginMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
