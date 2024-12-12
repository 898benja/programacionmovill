import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { HomePage } from './home.page';
import { UserService } from '../user.service'; // Asegúrate de importar el servicio si es necesario
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs'; // Utiliza 'of' para crear un observable simulado

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [
        UserService, // Proporciona UserService si es necesario
        {
          provide: ActivatedRoute, // Simula ActivatedRoute
          useValue: { snapshot: { paramMap: of({}) } } // Valor simulado para ActivatedRoute
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente correctamente', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });


  it('Debería mostrar un mensaje de alerta cuando se haga clic en "Restablecer contraseña"', async () => {
    spyOn(component, 'mostrarToast');
    
    await component.reestablecercontrasena();
    
    expect(component.mostrarToast).toHaveBeenCalledWith('Se ha enviado un enlace para restablecer la contraseña.', 'secondary');
  });
});
