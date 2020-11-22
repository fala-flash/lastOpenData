import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-comuni',
    loadChildren: () => import('./modal-comuni/modal-comuni.module').then( m => m.ModalComuniPageModule)
  },
  {
    path: 'modal-bandi',
    loadChildren: () => import('./modal-bandi/modal-bandi.module').then( m => m.ModalBandiPageModule)
  },
  {
    path: 'modal-concorsi',
    loadChildren: () => import('./modal-concorsi/modal-concorsi.module').then( m => m.ModalConcorsiPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
