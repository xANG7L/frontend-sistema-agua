import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../data/utils.data';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credencial } from '../models/credencial';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${HOST}/auth`

  //credencial: Credencial = new Credencial();

  private authState = new BehaviorSubject<Credencial>(this.getCredencialesFromSession());

  authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient
  ) {
 //   this.credencial = this.getCredencialesFromSession();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { username, password });
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuth;
  }

  isAdmin(): boolean {
    return this.authState.value.admin;
  }

  getUsuario(): Usuario {
    return this.authState.value.usuario;
  }

  getUsuarioId(): number {
    return this.authState.value.usuario.id;
  }

  getCredencialesFromSession(): Credencial {
    if (typeof window !== 'undefined' && window.localStorage) {
      const credencialesString = sessionStorage.getItem('credenciales');
      if (credencialesString) {
        try {
          return JSON.parse(credencialesString);
        } catch (error) {
          console.error('Error parsing credenciales from sessionStorage:', error);
          return new Credencial();
        }
      }
    }
    return new Credencial();
  }


}
