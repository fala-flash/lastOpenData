import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalConcorsiPageRoutingModule } from './modal-concorsi-routing.module';

import { ModalConcorsiPage } from './modal-concorsi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalConcorsiPageRoutingModule
  ],
  declarations: [ModalConcorsiPage]
})
export class ModalConcorsiPageModule {}
