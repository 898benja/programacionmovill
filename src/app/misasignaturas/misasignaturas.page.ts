import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importa el servicio

@Component({
  selector: 'app-misasignaturas',
  templateUrl: './misasignaturas.page.html',
  styleUrls: ['./misasignaturas.page.scss'],
})
export class MisasignaturasPage implements OnInit {

  asignaturas: any[] = [];  // Variable para almacenar las asignaturas del usuario
  userId: string = '';      // Variable para almacenar el ID del usuario
  userSeccion: string = ''; // Variable para almacenar la sección del usuario
  loading: boolean = false; // Estado de carga para mostrar un spinner
  errorMessage: string = ''; // Mensaje de error en caso de fallo

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario'); // Recupera el nombre del usuario desde localStorage
    if (nombreusuario) {
      this.loadUserName(nombreusuario); // Llama al método para cargar el nombre de usuario
    } else {
      // Si no hay nombre de usuario en localStorage, redirigir al login
      console.error('No se encontró el nombre de usuario en localStorage');
      // Opcional: Redirigir al login, si fuera necesario
      // this.router.navigate(['/login']);
    }
  }

  // Método para cargar el nombre de usuario y obtener el ID y sección del usuario
  loadUserName(username: string) {
    this.loading = true; // Activar la carga
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        this.loading = false; // Desactivar la carga
        if (user) {
          // Asigna el ID del usuario y la sección
          this.userId = user.id.toString();
          this.userSeccion = user.seccion || '';  // Si no hay sección, asigna una cadena vacía
          
          // Guarda el ID del usuario en localStorage
          localStorage.setItem('userId', this.userId);

          // Llama al método para cargar las asignaturas del usuario
          this.loadAsignaturas();
        } else {
          this.errorMessage = 'Usuario no encontrado'; // Error si no se encuentra el usuario
          console.error(this.errorMessage);
        }
      },
      (error) => {
        this.loading = false; // Desactivar la carga
        this.errorMessage = 'Error al obtener el nombre del usuario'; // Error si la solicitud falla
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }

  // Método para cargar las asignaturas del usuario
  loadAsignaturas() {
    if (this.userId && this.userSeccion) {
      this.loading = true; // Activar la carga
      this.userService.getAsignaturasByUser(this.userId, this.userSeccion).subscribe(
        (data: any) => {
          this.loading = false; // Desactivar la carga
          this.asignaturas = data;  // Asigna las asignaturas a la variable asignaturas
          if (data.length === 0) {
            this.errorMessage = 'No tienes asignaturas asignadas'; // Si no hay asignaturas
          }
        },
        (error) => {
          this.loading = false; // Desactivar la carga
          this.errorMessage = 'Error al obtener las asignaturas del usuario'; // Error si la solicitud falla
          console.error('Error al obtener las asignaturas del usuario:', error);
        }
      );
    } else {
      this.errorMessage = 'Datos del usuario no encontrados'; // Si no hay ID o sección
    }
  }
}
