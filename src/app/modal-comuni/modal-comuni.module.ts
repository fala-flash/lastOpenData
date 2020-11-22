import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalComuniPageRoutingModule } from './modal-comuni-routing.module';

import { ModalComuniPage } from './modal-comuni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalComuniPageRoutingModule
  ],
  declarations: [ModalComuniPage]
})
export class ModalComuniPageModule {}
