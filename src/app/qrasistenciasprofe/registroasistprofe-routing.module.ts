import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroasistprofePage } from './registroasistprofe.page';


const routes: Routes = [
  {
    path: '',
    component: RegistroasistprofePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroasistprofePageRoutingModule {}
