import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprovarPontodescarteItemPage } from './aprovar-pontodescarte-item.page';

describe('AprovarPontodescarteItemPage', () => {
  let component: AprovarPontodescarteItemPage;
  let fixture: ComponentFixture<AprovarPontodescarteItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovarPontodescarteItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprovarPontodescarteItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
