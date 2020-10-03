import { TestBed } from '@angular/core/testing';

import { PontoDescarteService } from './ponto-descarte.service';

describe('PontoDescarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PontoDescarteService = TestBed.get(PontoDescarteService);
    expect(service).toBeTruthy();
  });
});
