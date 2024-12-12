import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Asegúrate de incluir HttpClientTestingModule
      providers: [UserService], // Proveer el servicio
    });
    service = TestBed.inject(UserService); // Inyectar el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

