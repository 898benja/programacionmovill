import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

interface Asistencia {
  nombre: string;
  seccion: string;
  fecha: string;
  estado: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias: Asistencia[] = [];
  userId: string = '';
  asignaturas: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario');
    if (nombreusuario) {
      this.loadUserName(nombreusuario);
    }
    this.loadAsignaturas(); 
  }

  loadUserName(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        if (user) {
          this.userId = user.id.toString();
          localStorage.setItem('userId', this.userId);
          this.loadAsistencias();
        }
      },
      (error) => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }

  loadAsignaturas() {
    this.userService.getAsignaturas().subscribe(
      (data) => {
        this.asignaturas = data;
        this.loadAsistencias();
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  loadAsistencias() {
    if (this.userId && this.asignaturas.length > 0) {  
      this.userService.getAsistenciasByUser(this.userId).subscribe(
        (data: any) => {
          this.asistencias = data.map((asistencia: any) => {
            const asignatura = this.asignaturas.find(a => a.id === asistencia.asignatura_id);
            return {
              nombre: asignatura ? asignatura.nombre : 'Desconocida',
              seccion: asignatura ? asignatura.seccion : 'Desconocida',
              fecha: asistencia.fecha,
              estado: asistencia.asistio ? 'Presente' : 'Ausente',
              showDetails: false
            };
          });
        },
        (error) => {
          console.error('Error al obtener las asistencias del usuario:', error);
        }
      );
    }
  }

  toggleDetails(asistencia: Asistencia) {
    asistencia.showDetails = !asistencia.showDetails;
  }
}
