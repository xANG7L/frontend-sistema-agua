import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { Comunidad } from '../models/comunidad';
import { HOST } from '../data/utils.data';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  //url: string = "http://localhost:8085/api/nasacayub-lecturas/comunidades";
  url: string = `${HOST}/comunidades`

  constructor(
    private http: HttpClient
  ) {
  }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.url}/proyectos`);
  }

  getComunidades(): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(this.url);
  }

  getComunidadesByProyecto(codigo: string): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(`${this.url}/${codigo}`);
  }

}
