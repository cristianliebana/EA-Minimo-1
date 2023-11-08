import { TestBed } from '@angular/core/testing';

import { DenunciaService } from './denuncias.service';

describe('DenunciaService', () => {
  let service: DenunciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
