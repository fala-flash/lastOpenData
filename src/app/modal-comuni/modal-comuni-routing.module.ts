import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalComuniPage } from './modal-comuni.page';

const routes: Routes = [
  {
    path: '',
    component: ModalComuniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalComuniPageRoutingModule {}
