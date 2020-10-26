import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprovarPontodescartePage } from './aprovar-pontodescarte.page';

describe('AprovarPontodescartePage', () => {
  let component: AprovarPontodescartePage;
  let fixture: ComponentFixture<AprovarPontodescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovarPontodescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprovarPontodescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
