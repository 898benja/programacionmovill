import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroasistprofePageRoutingModule } from './registroasistprofe-routing.module';

import { RegistroasistprofePage } from './registroasistprofe.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroasistprofePageRoutingModule
  ],
  declarations: [RegistroasistprofePage]
})
export class RegistroasistprofePageModule {}
