import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PontodescarteitemPage } from './pontodescarteitem.page';

describe('PontodescarteitemPage', () => {
  let component: PontodescarteitemPage;
  let fixture: ComponentFixture<PontodescarteitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontodescarteitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PontodescarteitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
