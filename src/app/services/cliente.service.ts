import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = "http://localhost:8085/api/nasacayub-lecturas/clientes";

  constructor(
    private http: HttpClient
  ) { }

  getFiltrarClientesPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/filtro-por-nombre/${nombre}`)
  }

  getFiltrarClientesPorNombreYComunidad(nombre: string, codigo:string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/filtro-por-comunidad/${codigo}/${nombre}`)
  } 

}
