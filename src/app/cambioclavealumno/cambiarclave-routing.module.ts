import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarClavePage } from './cambiarclave.page';


const routes: Routes = [
  {
    path: '',
    component: CambiarClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarclavePageRoutingModule {}
