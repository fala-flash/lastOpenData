import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBandiPage } from './modal-bandi.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBandiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBandiPageRoutingModule {}
