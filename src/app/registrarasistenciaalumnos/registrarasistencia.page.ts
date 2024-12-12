import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.page.html',
  styleUrls: ['./registrarasistencia.page.scss'],
})
export class RegistrarasistenciaPage {
  scanResult: string | null = null;
  userId: string = '';
  userName: string = '';
  alumnoSeccion: string = '';
  asignaturas: any[] = [];
  secciones: any[] = [];
  asignaturaId: number | null = null;
  seccionSeleccionada: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private userService: UserService
  ) {
    this.userName = localStorage.getItem('nombreusuario') || '';
    this.userId = localStorage.getItem('userId') || '';
    this.alumnoSeccion = localStorage.getItem('userSeccion') || '';

    if (!this.userId || !this.userName || !this.alumnoSeccion) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadAsignaturas();
    this.loadSecciones();
  }

  loadAsignaturas() {
    if (this.userId && this.alumnoSeccion) {
      this.loading = true;
      this.userService.getAsignaturasByUser(this.userId, this.alumnoSeccion).subscribe(
        (asignaturas) => {
          this.loading = false;
          this.asignaturas = asignaturas;
          if (asignaturas.length === 0) {
            this.errorMessage = 'No tienes asignaturas asignadas.';
          }
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Error al cargar las asignaturas.';
          console.error('Error al cargar las asignaturas:', error);
        }
      );
    } else {
      this.errorMessage = 'No se han encontrado los datos del usuario.';
    }
  }

  loadSecciones() {
    if (this.userId) {
      this.loading = true;
      this.userService.getSeccionesByUser(this.userId).subscribe(
        (secciones: any[]) => {
          this.loading = false;
          this.secciones = secciones;
          if (secciones.length === 0) {
            this.errorMessage = 'No tienes secciones asignadas.';
          }
        },
        (error: any) => {
          this.loading = false;
          this.errorMessage = 'Error al cargar las secciones.';
          console.error('Error al cargar las secciones:', error);
        }
      );
    }
  }

  onScanSuccess(result: string) {
    this.scanResult = result;

    if (this.scanResult) {
      try {
        const qrData = JSON.parse(this.scanResult);

        if (qrData?.asignaturaId && qrData?.seccion && qrData?.userId) {
          const qrSeccion = String(qrData.seccion).trim();
          const qrUserId = qrData.userId;

          if (qrUserId === this.userId) {
            if (qrSeccion === this.alumnoSeccion.trim()) {
              this.registrarAsistencia(qrData.asignaturaId, qrData.seccion);
            } else {
              this.mostrarToast('¡Error! La sección del QR no coincide con la asignada.', 'danger');
            }
          } else {
            this.mostrarToast('¡Error! El ID del usuario no coincide con el del QR.', 'danger');
          }
        } else {
          this.mostrarToast('¡Error! El QR no contiene la información válida.', 'danger');
        }
      } catch (error) {
        this.mostrarToast('¡Error! El formato del QR es incorrecto.', 'danger');
      }
    }
  }

  registrarAsistencia(asignaturaId: number, seccion: string) {
    const asistenciaData = {
      usuario_id: this.userId,
      asignatura_id: asignaturaId,
      fecha: new Date().toISOString(),
      asistio: true,
      seccion: seccion
    };

    this.userService.registrarAsistencia(asistenciaData).subscribe(
      async (response) => {
        const asistencias = JSON.parse(localStorage.getItem('asistencias') || '[]');
        asistencias.push(asistenciaData);
        localStorage.setItem('asistencias', JSON.stringify(asistencias));

        await this.mostrarToast('Asistencia registrada correctamente.', 'success');
        this.router.navigate(['/menuprincipal']);
      },
      async (error) => {
        await this.mostrarToast('Hubo un error al registrar la asistencia.', 'danger');
      }
    );
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

  registrarAsistenciaManual() {
    if (this.asignaturaId && this.alumnoSeccion) {
      this.registrarAsistencia(this.asignaturaId, this.alumnoSeccion);
    } else {
      this.mostrarToast('¡Error! Debes seleccionar asignatura y tener una sección asignada.', 'danger');
    }
  }
}
