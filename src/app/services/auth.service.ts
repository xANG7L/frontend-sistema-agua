import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../data/utils.data';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credencial } from '../models/credencial';
import { Usuario } from '../models/usuario';
import { Store } from '@ngrx/store';
import { IUserForm } from '../components/auth/form-user/form-user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${HOST}/auth`

  private _credencial: Credencial = new Credencial();

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: any }>
  ) {
    this.store.select('auth').subscribe(state => {
      this._credencial = state.credencial;
    })
    //   this.credencial = this.getCredencialesFromSession();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { username, password });
  }

  postCrearUsuario(usuario: IUserForm): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  isAuthenticated(): boolean {
    return this._credencial.isAuth;
  }

  isAdmin(): boolean {
    return this._credencial.admin;
  }

  getUsuario(): Usuario {
    return this._credencial.usuario;
  }

  getUsuarioId(): number {
    return this._credencial.usuario.id;
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
