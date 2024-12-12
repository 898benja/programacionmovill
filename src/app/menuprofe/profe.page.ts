import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importa el servicio

@Component({
  selector: 'app-profe1',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {
   
  profeNombre: string = '';  // Variable donde se almacenará el nombre del profesor
  profeId: string = '';      // Variable donde se almacenará el ID del profesor

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreprofe = localStorage.getItem('nombreprofe'); // Recupera el nombre del profesor desde localStorage
    if (nombreprofe) {
      this.loadProfeInfo(nombreprofe); // Llama al método para cargar el nombre del profesor
    }
  }

  // Método para cargar el nombre del profesor desde la API
  loadProfeInfo(username: string) {
    this.userService.getProfeByUsername(username).subscribe(  // Usa getProfeByUsername en lugar de getUserByUsername
      (profe) => {
        if (profe) {
          this.profeNombre = profe.username;  // Asigna el nombre del profesor al campo profeNombre
          this.profeId = profe.id.toString(); // Asigna el ID del profesor

          // Guardar el ID del profesor en localStorage
          localStorage.setItem('profeId', this.profeId); // Guarda el ID del profesor
        }
      },
      (error) => {
        console.error('Error al obtener la información del profesor:', error);
      }
    );
  }
}
