import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarClavePage } from './cambiarclave.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs'; // Asegúrate de importar estas funciones para simular las respuestas

describe('CambiarClavePage', () => {
  let component: CambiarClavePage;
  let fixture: ComponentFixture<CambiarClavePage>;
  let userService: UserService;
  let toastController: ToastController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarClavePage],
      imports: [HttpClientTestingModule],
      providers: [UserService, ToastController],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarClavePage);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    toastController = TestBed.inject(ToastController);
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar un mensaje de error si el usuario no está autenticado', async () => {
    spyOn(toastController, 'create').and.returnValue(Promise.resolve({ present: () => {} } as any));

    localStorage.removeItem('nombreusuario');
    await component.cambiarClave();

    expect(toastController.create).toHaveBeenCalledWith({
      message: 'Usuario no autenticado.',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
  });

});
