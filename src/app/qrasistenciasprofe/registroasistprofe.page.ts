import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

interface Asignatura {
  nombre: string;
  seccion: string;
  showQR: boolean;
}

@Component({
  selector: 'app-registroasistprofe',
  templateUrl: './Registroasistprofe.page.html',
  styleUrls: ['./Registroasistprofe.page.scss'],
})
export class RegistroasistprofePage implements OnInit {
  
  asignaturas: Asignatura[] = [];
  profeId: string = ''; // Variable para almacenar el ID del profesor

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario');
    if (nombreusuario) {
      this.loadProfeData(nombreusuario);
    }
  }

  // Método para cargar el ID del profesor y obtener sus asignaturas
  loadProfeData(username: string) {
    this.userService.getProfeByUsername(username).subscribe(
      (profe) => {
        if (profe) {
          this.profeId = profe.id.toString();
          localStorage.setItem('profeId', this.profeId);
          this.loadAsignaturas();
        }
      },
      (error) => {
        console.error('Error al obtener los datos del profesor:', error);
      }
    );
  }

  // Método para cargar las asignaturas que dicta el profesor
  loadAsignaturas() {
    if (this.profeId) {
      this.userService.getAsignaturasByProfe(this.profeId).subscribe(
        (data: Asignatura[]) => {
          this.asignaturas = data.map(asignatura => ({
            ...asignatura,
            showQR: false
          }));
        },
        (error) => {
          console.error('Error al cargar las asignaturas del profesor', error);
        }
      );
    }
  }

  // Método para alternar la visibilidad del QR
  toggleQR(asignatura: Asignatura) {
    asignatura.showQR = !asignatura.showQR;
  }

  // Método para generar el contenido del QR en formato JSON
  generateQRData(asignatura: Asignatura): string {
    const qrData = {
      asignaturaId: asignatura.nombre,  // Cambiar esto para usar el ID real de la asignatura si lo tienes
      seccion: asignatura.seccion,
      userId: this.profeId  // El ID del profesor para verificación
    };
    return JSON.stringify(qrData);
  }
}  