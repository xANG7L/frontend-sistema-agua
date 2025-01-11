import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lectura } from '../models/lectura';

@Injectable({
  providedIn: 'root'
})
export class LecturasService {

  url: string = "http://localhost:8085/api/nasacayub-lecturas/lecturas";

  constructor(
    private http: HttpClient
  ) { }

  postLectura(lectura: Lectura): Observable<any> {
    return this.http.post<any>(`${this.url}`, lectura);
  }

  putActualizarLectura(lectura:Lectura):Observable<Lectura>{
    return this.http.put<Lectura>(`${this.url}`,lectura)
  }

  getLecturaById(id:number): Observable<Lectura>{
    return this.http.get<Lectura>(`${this.url}/consultar/lectura/${id}`);
  }

  getLecturasPorDia(fecha: Date): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.url}/consultar/lecturas-por-dia/${fecha}`);
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
