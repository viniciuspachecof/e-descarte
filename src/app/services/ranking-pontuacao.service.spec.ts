import { TestBed } from '@angular/core/testing';

import { RankingPontuacaoService } from './ranking-pontuacao.service';

describe('RankingPontuacaoService', () => {
  let service: RankingPontuacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingPontuacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
