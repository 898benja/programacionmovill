import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroasistprofePage } from './registroasistprofe.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo

describe('RegistroasistprofePage', () => {
  let component: RegistroasistprofePage;
  let fixture: ComponentFixture<RegistroasistprofePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroasistprofePage],
      imports: [HttpClientTestingModule] // Asegúrate de incluir esto
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroasistprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
