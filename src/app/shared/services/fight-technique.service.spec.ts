import { TestBed } from '@angular/core/testing';

import { FightTechniqueService } from './fight-technique.service';

describe('FightTechniqueService', () => {
  let service: FightTechniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightTechniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
