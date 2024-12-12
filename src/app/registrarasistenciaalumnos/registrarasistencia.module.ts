import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarasistenciaPageRoutingModule } from './registrarasistencia-routing.module';

import { RegistrarasistenciaPage } from './registrarasistencia.page';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  imports: [
    ZXingScannerModule,
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarasistenciaPageRoutingModule
  ],
  declarations: [RegistrarasistenciaPage]
})
export class RegistrarasistenciaPageModule {}







   

