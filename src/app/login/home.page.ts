import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';  
import { Router } from '@angular/router'; 
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreusuario: string = "";
  clave: string = "";
  correo: string = "";

  constructor(
    private toastController: ToastController, 
    private router: Router, 
    private userService: UserService 
  ) {}

  async ingresar() {
    if (!this.nombreusuario && !this.clave) {
      await this.mostrarToast('Por favor, ingrese su usuario y contraseña.', 'danger');
      return;
    } else if (!this.nombreusuario) {
      await this.mostrarToast('Por favor, ingrese su usuario.', 'danger');
      return;
    } else if (!this.clave) {
      await this.mostrarToast('Por favor, ingrese su contraseña.', 'danger');
      return;
    }

    this.userService.getUsers().subscribe(async (users) => {
      const foundUser = users.find(user => user.username === this.nombreusuario && user.password === this.clave);

      if (foundUser) {
        localStorage.setItem('nombreusuario', this.nombreusuario);
        localStorage.setItem('userId', foundUser.id.toString());
        localStorage.setItem('userSeccion', foundUser.seccion);
        await this.mostrarToast('Datos ingresados correctamente.', 'success');
        this.router.navigate(['/menuprincipal']);
      } else {
        this.userService.getProfe().subscribe(async (profesores) => {
          const foundProfe = profesores.find(profe => profe.username === this.nombreusuario && profe.password === this.clave);

          if (foundProfe) {
            localStorage.setItem('nombreusuario', this.nombreusuario);
            localStorage.setItem('userId', foundProfe.id.toString());
            localStorage.setItem('userSeccion', foundProfe.seccion);
            await this.mostrarToast('Bienvenido, profesor. Datos ingresados correctamente.', 'success');
            this.router.navigate(['/profe1']);
          } else {
            await this.mostrarToast('Nombre de usuario o contraseña incorrectos.', 'danger');
          }
        });
      }
    }, async () => {
      await this.mostrarToast('Hubo un problema al acceder a los usuarios. Intente nuevamente.', 'danger');
    });
  }

  async reestablecercontrasena() {
    await this.mostrarToast('Se ha enviado un enlace para restablecer su contraseña.', 'secondary');
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
