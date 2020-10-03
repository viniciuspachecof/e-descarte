import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaPontodescartePage } from './listar-pontodescarte.page';

describe('ListaPontodescartePage', () => {
  let component: ListaPontodescartePage;
  let fixture: ComponentFixture<ListaPontodescartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPontodescartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPontodescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
