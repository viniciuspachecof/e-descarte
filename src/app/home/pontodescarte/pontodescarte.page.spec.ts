import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PontodescartePage } from './pontodescarte.page';

describe('PontodescartePage', () => {
  let component: PontodescartePage;
  let fixture: ComponentFixture<PontodescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontodescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PontodescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
