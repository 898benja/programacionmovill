import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';


@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html', // Asegúrate de que este archivo existe en la ruta correcta
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarClavePage {
  claveActual: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';

  constructor(
    private toastController: ToastController,
    private userService: UserService
  ) {}

  async cambiarClave() {
    const nombreUsuario = localStorage.getItem('nombreusuario');

    if (!nombreUsuario) {
      await this.mostrarToast('Usuario no autenticado.', 'danger');
      return;
    }

    if (this.nuevaClave !== this.confirmarClave) {
      await this.mostrarToast('Las contraseñas no coinciden.', 'danger');
      return;
    }

    this.userService.getUsers().subscribe(async (users) => {
      const user = users.find(u => u.username === nombreUsuario && u.password === this.claveActual);

      if (!user) {
        await this.mostrarToast('La clave actual es incorrecta.', 'danger');
        return;
      }

      this.userService.updatePassword(user.id, this.nuevaClave).subscribe(async () => {
        await this.mostrarToast('Contraseña actualizada con éxito.', 'success');
      }, async (error) => {
        await this.mostrarToast('Error al actualizar la contraseña.', 'danger');
        console.error(error);
      });
    });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: color,
    });
    await toast.present();
  }
}
