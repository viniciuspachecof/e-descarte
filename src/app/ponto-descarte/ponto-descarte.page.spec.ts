import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PontoDescartePage } from './ponto-descarte.page';

describe('PontoDescartePage', () => {
  let component: PontoDescartePage;
  let fixture: ComponentFixture<PontoDescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontoDescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PontoDescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
