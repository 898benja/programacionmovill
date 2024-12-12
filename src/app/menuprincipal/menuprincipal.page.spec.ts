import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuprincipalPage } from './menuprincipal.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { UserService } from '../user.service'; // Asegúrate de importar UserService si es necesario
import { of } from 'rxjs'; // Utiliza 'of' para crear un observable simulado

describe('MenuprincipalPage', () => {
  let component: MenuprincipalPage;
  let fixture: ComponentFixture<MenuprincipalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuprincipalPage], // Declara el componente
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para las pruebas
      providers: [UserService], // Proporciona el servicio UserService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(MenuprincipalPage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtén la instancia del componente
    fixture.detectChanges(); // Detecta cambios
  });

  it('Debería crear el componente correctamente', () => {
    expect(component).toBeTruthy(); // Verifica si el componente se crea correctamente
  });


  it('Debería no cargar el nombre de usuario si no hay un nombre en localStorage', () => {
    localStorage.removeItem('nombreusuario');
    component.ngOnInit();
    expect(component.username).toBe('');
  });

  it('Debería llamar a loadUserName cuando el nombre de usuario está disponible en localStorage', () => {
    spyOn(component, 'loadUserName');
    localStorage.setItem('nombreusuario', 'usuario1');
    component.ngOnInit();
    expect(component.loadUserName).toHaveBeenCalledWith('usuario1');
  });

});
