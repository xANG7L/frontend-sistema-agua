import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { HOST } from '../data/utils.data';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = `${HOST}/clientes`

  constructor(
    private http: HttpClient
  ) { }

  getFiltrarClientesPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/filtro-por-nombre/${nombre}`)
  }

  getFiltrarClientesSegunFiltroSeleccionado(filter: number, value: string): Observable<Cliente[]> {
    console.log('realizando peticion')
    return this.http.get<Cliente[]>(`${this.url}/filtro-cliente/${filter}/${value}`)
  }

  getFiltrarClientesPorNombreYComunidad(nombre: string, codigo: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/filtro-por-comunidad/${codigo}/${nombre}`)
  }

  subidaMasivaDeExcelClientes(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('excelClientes', file);
    return this.http.post(`${this.url}/migrar-excel`, formData, {
      reportProgress: true,
      observe: 'events', // Para obtener el progreso
    });
  }

}
