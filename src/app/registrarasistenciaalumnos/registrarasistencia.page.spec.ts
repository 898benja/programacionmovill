import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarasistenciaPage } from './registrarasistencia.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas de HttpClient
import { UserService } from '../user.service'; // Importa el servicio si es necesario

describe('RegistrarasistenciaPage', () => {
  let component: RegistrarasistenciaPage;
  let fixture: ComponentFixture<RegistrarasistenciaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarasistenciaPage],
      imports: [HttpClientTestingModule], // Asegúrate de importar HttpClientTestingModule
      providers: [UserService], // Proveer UserService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
