import { TestBed } from '@angular/core/testing';

import { EmployeeComponentService } from './employee-component-service';

describe('EmployeeComponentService', () => {
  let service: EmployeeComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
