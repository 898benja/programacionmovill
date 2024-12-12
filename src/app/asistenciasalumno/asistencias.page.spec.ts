import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasPage } from './asistencias.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas de HttpClient
import { UserService } from '../user.service'; // Asegúrate de importar el servicio si es necesario

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenciasPage], // Declara el componente
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [UserService], // Proporciona UserService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtén la instancia del componente
    fixture.detectChanges(); // Detecta cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

