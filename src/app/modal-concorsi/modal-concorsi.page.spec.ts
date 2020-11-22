import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalConcorsiPage } from './modal-concorsi.page';

describe('ModalConcorsiPage', () => {
  let component: ModalConcorsiPage;
  let fixture: ComponentFixture<ModalConcorsiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConcorsiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConcorsiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
