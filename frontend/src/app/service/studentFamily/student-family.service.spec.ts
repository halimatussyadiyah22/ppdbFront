import { TestBed } from '@angular/core/testing';

import { StudentFamilyService } from './student-family.service';

describe('StudentFamilyService', () => {
  let service: StudentFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
