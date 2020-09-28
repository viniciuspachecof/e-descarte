import { TestBed } from '@angular/core/testing';

import { PontoDescarteItemService } from './ponto-descarte-item.service';

describe('PontoDescarteItemService', () => {
  let service: PontoDescarteItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontoDescarteItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
