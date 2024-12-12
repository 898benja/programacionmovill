import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfePage } from './profe.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas de HttpClient
import { UserService } from '../user.service'; // Asegúrate de importar UserService si es necesario

describe('ProfePage', () => {
  let component: ProfePage;
  let fixture: ComponentFixture<ProfePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfePage], // Declara el componente
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para las pruebas HTTP
      providers: [UserService], // Proporciona UserService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(ProfePage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtén la instancia del componente
    fixture.detectChanges(); // Detecta los cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica si el componente se crea correctamente
  });
});
