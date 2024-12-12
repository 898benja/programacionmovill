import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUsers = 'http://172.20.10.2:3000/users';
  private apiUrlProfes = 'http://172.20.10.2:3000/profes';
  private apiUrlAsignaturas = 'http://172.20.10.2:3000/asignaturas';
  private apiUrlAsistencias = 'http://172.20.10.2:3000/asistencias';
  private apiUrlSecciones = 'http://172.20.10.2:3000/secciones';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsers);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrlUsers).pipe(
      map(users => users.find(user => user.username === username))
    );
  }

  getAsignaturasByUser(userId: string | null, userSeccion: string | null): Observable<any[]> {
    if (!userId || !userSeccion) {
      return new Observable(observer => observer.next([]));
    }
    return this.http.get<any[]>(`${this.apiUrlAsignaturas}?userId=${userId}&seccion=${userSeccion}`);
  }

  getSeccionesByUser(userId: string | null): Observable<any[]> {
    if (!userId) {
      return new Observable(observer => observer.next([])); 
    }
    return this.http.get<any[]>(`${this.apiUrlSecciones}?userId=${userId}`);
  }

  getProfe(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProfes);
  }

  getProfeByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrlProfes).pipe(
      map(profes => profes.find(profe => profe.username === username))
    );
  }

  getAsignaturasByProfe(profeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAsignaturas}?profeId=${profeId}`);
  }

  registrarAsistencia(asistencia: any): Observable<any> {
    return this.http.post(this.apiUrlAsistencias, asistencia);
  }

  getAsistenciasByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAsistencias).pipe(
      map(asistencias => asistencias.filter(asistencia => asistencia.usuario_id === userId))
    );
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/${userId}`);
  }

  getAsignaturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAsignaturas);
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  validateUser(): Observable<any> {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.username) {
      return this.getUserByUsername(currentUser.username);
    } else {
      return new Observable(observer => observer.error('Usuario no encontrado en localStorage'));
    }
  }

  updatePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrlUsers}/${userId}`, { password: newPassword });
  }

  getUserData(userId: number, userSeccion: string | null): Observable<any> {
    const user$ = this.http.get<any>(`${this.apiUrlUsers}/${userId}`);
    const asignaturas$ = this.http.get<any[]>(`${this.apiUrlAsignaturas}?userId=${userId}&seccion=${userSeccion}`);
    const asistencias$ = this.http.get<any[]>(`${this.apiUrlAsistencias}?usuario_id=${userId}`);

    return forkJoin([user$, asignaturas$, asistencias$]).pipe(
      map(([user, asignaturas, asistencias]) => ({
        user,
        asignaturas,
        asistencias,
      }))
    );
  }
}

// PARA PRENDER EL SERVER: json-server --watch db.json 
// para prender server en jaifon: json-server --watch db.json --port 3000
