import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBandiPage } from './modal-bandi.page';

describe('ModalBandiPage', () => {
  let component: ModalBandiPage;
  let fixture: ComponentFixture<ModalBandiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBandiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBandiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
