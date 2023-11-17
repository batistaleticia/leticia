import { TestBed } from '@angular/core/testing';

import { InfoAssistenciaisService } from './info-assistenciais.service';

describe('InfoAssistenciaisService', () => {
  let service: InfoAssistenciaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAssistenciaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
