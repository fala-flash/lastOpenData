import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalComuniPage } from './modal-comuni.page';

describe('ModalComuniPage', () => {
  let component: ModalComuniPage;
  let fixture: ComponentFixture<ModalComuniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComuniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComuniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
