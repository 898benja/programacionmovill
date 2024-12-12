import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisasignaturasPageRoutingModule } from './misasignaturas-routing.module';

import { MisasignaturasPage } from './misasignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisasignaturasPageRoutingModule
  ],
  declarations: [MisasignaturasPage]
})
export class MisasignaturasPageModule {}
