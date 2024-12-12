import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisasignaturasPage } from './misasignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: MisasignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisasignaturasPageRoutingModule {}
