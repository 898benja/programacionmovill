import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./menuprincipal/menuprincipal.module').then(m => m.MenuprincipalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./login/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'misasignaturas',
    loadChildren: () => import('./misasignaturas/misasignaturas.module').then( m => m.MisasignaturasPageModule)
  },
  {
    path: 'asistenciasalumno',
    loadChildren: () => import('./asistenciasalumno/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'registrarasistencia',
    loadChildren: () => import('./registrarasistenciaalumnos/registrarasistencia.module').then( m => m.RegistrarasistenciaPageModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./cambioclavealumno/cambiarclave.module').then( m => m.CambiarclavePageModule)
  },
  {
    path: 'profe1',
    loadChildren: () => import('./menuprofe/profe.module').then( m => m.ProfePageModule)
  },
  {
    path: 'registroasistprofe',
    loadChildren: () => import('./qrasistenciasprofe/registroasistprofe.module').then( m => m.RegistroasistprofePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
