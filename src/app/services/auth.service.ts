import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../data/utils.data';
import { Observable } from 'rxjs';
import { Credencial } from '../models/credencial';
import { IUserForm } from '../components/auth/form-user/form-user.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${HOST}/auth`

  private _credencial: Credencial = new Credencial();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.usuario;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { username, password });
  }

  postCrearUsuario(usuario: IUserForm): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  get isAuthenticated(): boolean {
    return this._credencial.isAuth;
  }

  get isAdmin(): boolean {
    return this._credencial.admin;
  }

  get usuario() {
    if (this._credencial.isAuth) {
      return this._credencial.usuario;
    } else {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (sessionStorage.getItem('credenciales') != null) {
          this._credencial = JSON.parse(sessionStorage.getItem('credenciales') || '{}');
        }
      }
      return this._credencial.usuario;
    }
  }

  get usuarioId(): number {
    return this._credencial.usuario.id;
  }

  set credenciales(credencial: Credencial) {
    this._credencial = credencial;
    if (typeof window !== 'undefined' && window.localStorage) {
      sessionStorage.setItem('credenciales', JSON.stringify(this._credencial));
    }
  }

  logOut(): void {
    this._credencial = new Credencial();
    if (typeof window !== 'undefined' && window.localStorage) {
      sessionStorage.removeItem('credenciales');
    }
    this.router.navigate(['/login']);
  }


}
