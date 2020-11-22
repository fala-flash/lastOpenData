import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBandiPageRoutingModule } from './modal-bandi-routing.module';

import { ModalBandiPage } from './modal-bandi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBandiPageRoutingModule
  ],
  declarations: [ModalBandiPage]
})
export class ModalBandiPageModule {}
