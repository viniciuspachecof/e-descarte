import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastrarPontoDescartePage } from './cadastrar-pontodescarte.page';

describe('CadastrarPontoDescartePage', () => {
  let component: CadastrarPontoDescartePage;
  let fixture: ComponentFixture<CadastrarPontoDescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPontoDescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarPontoDescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
