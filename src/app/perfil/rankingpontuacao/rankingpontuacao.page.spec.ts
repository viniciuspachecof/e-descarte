import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingpontuacaoPage } from './rankingpontuacao.page';

describe('RankingpontuacaoPage', () => {
  let component: RankingpontuacaoPage;
  let fixture: ComponentFixture<RankingpontuacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingpontuacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingpontuacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
