import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalConcorsiPage } from './modal-concorsi.page';

const routes: Routes = [
  {
    path: '',
    component: ModalConcorsiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalConcorsiPageRoutingModule {}
