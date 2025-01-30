import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lectura } from '../models/lectura';
import { HOST } from '../data/utils.data';

@Injectable({
  providedIn: 'root'
})
export class LecturasService {

  //url: string = "http://localhost:8085/api/nasacayub-lecturas/lecturas";
  url: string = `${HOST}/lecturas`

  constructor(
    private http: HttpClient
  ) { }

  postLectura(lectura: Lectura, idUsuario: number): Observable<any> {
    return this.http.post<any>(`${this.url}/${idUsuario}`, lectura);
  }

  subidaMasivaDeLecturas(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('subidaMasivaDeLecturas', file);
    return this.http.post<any>(`${this.url}/migrar-excel`, formData, {
      reportProgress: true,
      observe: 'events', // Para obtener el progreso
    });
  }

  postConsultaDeClientesPorFiltro(fechaInicio: Date, fechaCierre: Date, value: string, filter: number): Observable<Lectura[]> {
    return this.http.post<Lectura[]>(`${this.url}/consultar/segun-filtro`, {
      fechaInicio,
      fechaCierre,
      value,
      filter
    });
  }

  putActualizarLectura(lectura: Lectura): Observable<Lectura> {
    return this.http.put<Lectura>(`${this.url}`, lectura)
  }

  getLecturaById(id: number): Observable<Lectura> {
    return this.http.get<Lectura>(`${this.url}/consultar/lectura/${id}`);
  }

  getLecturasPorDia(fecha: Date): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.url}/consultar/lecturas-por-dia/${fecha}`);
  }

  getLecturasPorRangoDeFecha(fechaInicio: Date, fechaCierre: Date): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.url}/consultar/lecturas-por-fechas/${fechaInicio}/${fechaCierre}`);
  }

  generarExcelDeLecturas(fecha: Date): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(
      `${this.url}/reportes/excel/exportar-lecturas-por-mes-anio/${fecha}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json'
      }
    );
  }

}
