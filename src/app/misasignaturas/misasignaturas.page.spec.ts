import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisasignaturasPage } from './misasignaturas.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { UserService } from '../user.service'; // Asegúrate de importar UserService si es necesario
import { of } from 'rxjs'; // Utiliza 'of' para crear un observable simulado

describe('MisasignaturasPage', () => {
  let component: MisasignaturasPage;
  let fixture: ComponentFixture<MisasignaturasPage>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisasignaturasPage], // Declara el componente
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para las pruebas
      providers: [UserService], // Proporciona el servicio UserService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(MisasignaturasPage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtén la instancia del componente
    userService = TestBed.inject(UserService); // Inyecta el servicio UserService
    fixture.detectChanges(); // Detecta cambios
  });

  it('Debería crear el componente correctamente', () => {
    expect(component).toBeTruthy(); // Verifica si el componente se crea correctamente
  });

  it('Debería no cargar el nombre de usuario si no hay un nombre en localStorage', () => {
    localStorage.removeItem('nombreusuario');
    component.ngOnInit();
    expect(component.userId).toBe('');
    expect(component.userSeccion).toBe('');
  });

  it('Debería llamar a loadUserName cuando el nombre de usuario está disponible en localStorage', () => {
    spyOn(component, 'loadUserName');
    localStorage.setItem('nombreusuario', 'usuario1');
    component.ngOnInit();
    expect(component.loadUserName).toHaveBeenCalledWith('usuario1');
  });

  it('Debería no cargar asignaturas si el ID del usuario no está disponible', () => {
    component.userId = '';
    component.loadAsignaturas();
    expect(component.asignaturas).toEqual([]);
  });

  it('Debería almacenar el ID del usuario en localStorage al cargar el nombre', () => {
    const mockUser = { username: 'usuario1', id: 1, seccion: 'A' };
    spyOn(userService, 'getUserByUsername').and.returnValue(of(mockUser));

    component.loadUserName('usuario1');

    expect(localStorage.getItem('userId')).toBe('1');
  });

  it('Debería no cargar asignaturas si el usuario no tiene ID o sección', () => {
    component.userId = '';
    component.userSeccion = '';
    component.loadAsignaturas();
    expect(component.asignaturas).toEqual([]);
  });

  it('Debería establecer la sección como una cadena vacía si no está definida en el usuario', () => {
    const mockUser = { username: 'usuario1', id: 1 };
    spyOn(userService, 'getUserByUsername').and.returnValue(of(mockUser));

    component.loadUserName('usuario1');

    expect(component.userSeccion).toBe('');
  });

  it('Debería llamar al servicio getAsignaturasByUser con el ID y la sección correctos', () => {
    const mockUser = { username: 'usuario1', id: 1, seccion: 'A' };
    spyOn(userService, 'getAsignaturasByUser').and.returnValue(of([]));
    spyOn(userService, 'getUserByUsername').and.returnValue(of(mockUser));

    component.loadUserName('usuario1');
    component.loadAsignaturas();

    expect(userService.getAsignaturasByUser).toHaveBeenCalledWith('1', 'A');
  });

  it('Debería mostrar el nombre de usuario en la UI después de cargarlo', () => {
    const mockUser = { username: 'usuario1', id: 1 };
    spyOn(userService, 'getUserByUsername').and.returnValue(of(mockUser));

    component.loadUserName('usuario1');
    fixture.detectChanges();

    expect(component.userId).toBe('1');
    expect(component.userSeccion).toBe('');
  });

  it('Debería limpiar la lista de asignaturas si la respuesta de la API está vacía', () => {
    spyOn(userService, 'getAsignaturasByUser').and.returnValue(of([]));

    component.loadAsignaturas();

    expect(component.asignaturas).toEqual([]);
  });

  it('Debería no realizar una nueva llamada a la API si las asignaturas ya están cargadas', () => {
    component.asignaturas = [{ nombre: 'Matemáticas' }];
    spyOn(userService, 'getAsignaturasByUser');

    component.loadAsignaturas();

    expect(userService.getAsignaturasByUser).not.toHaveBeenCalled();
  });

});
