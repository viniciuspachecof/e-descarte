import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprovarPage } from './aprovar.page';

describe('AprovarPage', () => {
  let component: AprovarPage;
  let fixture: ComponentFixture<AprovarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprovarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
