import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarPontoDescartePage } from './editar-pontodescarte.page';

describe('EditarPontoDescartePage', () => {
  let component: EditarPontoDescartePage;
  let fixture: ComponentFixture<EditarPontoDescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPontoDescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPontoDescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
