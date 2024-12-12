import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {

  username: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario');
    if (nombreusuario) {
      this.loadUserName(nombreusuario);
    } else {
      console.error('No se encontró el nombre de usuario en localStorage');
    }
  }

  loadUserName(username: string) {
    this.loading = true;
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        this.loading = false;
        if (user) {
          this.username = user.username;
          localStorage.setItem('userId', user.id.toString());
        } else {
          this.errorMessage = 'Usuario no encontrado';
          console.error(this.errorMessage);
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Error al obtener el nombre del usuario';
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }
}
