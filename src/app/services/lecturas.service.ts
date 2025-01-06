import { HttpClient } from '@angular/common/http';
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
}
