import { Component, OnInit } from '@angular/core';
import { Lectura } from '../../../models/lectura';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LecturasService } from '../../../services/lecturas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth.service';
import { IParamsClientes } from '../../../interfaces/iparams.interface';
import { debounceTime, distinctUntilChanged, exhaustMap, map, Observable, of } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'consulta-lecturas',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    DatePipe,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInput,
    AsyncPipe
  ],
  templateUrl: './consulta-lecturas.component.html',
  styleUrl: './consulta-lecturas.component.css'
})
export class ConsultaLecturasComponent implements OnInit {

  lecturasFiltradas!: Observable<Lectura[]>;

  lecturas: Lectura[] = []

  cargando: boolean = false;

  fechaInicio!: Date;

  fechaCierre!: Date;

  p: number = 1;

  isAdmin: boolean = false;

  busquedaControl = new FormControl('');

  parametrosBusqueda: IParamsClientes[] = [
    {
      filter: 1,
      name: "Nombre de cliente"
    },
    {
      filter: 2,
      name: "Codigo"
    },
    {
      filter: 3,
      name: "Medidor"
    },
  ];

  numberFilter: number = 1;


  constructor(
    private router: Router,
    private lecturaService: LecturasService,
    private authService: AuthService
  ) {
    this.isAdmin = authService.isAdmin
  }
  ngOnInit(): void {
    this.inicializarFiltros();
  }

  filtrarLecturas(): void {
    if (this.fechaInicio && this.fechaCierre) {
      this.cargando = true;
      this.lecturaService.getLecturasPorRangoDeFecha(this.fechaInicio, this.fechaCierre).subscribe({
        next: (lecturas) => {
          this.cargando = false;
          this.lecturas = lecturas
        },
        error: (err: HttpErrorResponse) => {
          this.cargando = false;
          if (err.status == 400) {
            Swal.fire('Error', err.error.error, 'error');
          } else {
            throw err;
          }
        }
      })
    } else {
      Swal.fire('Error', 'Ingrese el rango de fechas', 'error')
    }
  }

  private _filter(value: string): Observable<Lectura[]> {
    let filterValue = typeof value === 'string' ? value.toLowerCase().trim() : '';
    console.log('buscando');
    if (filterValue != '' && filterValue != undefined && this.fechaInicio && this.fechaCierre) {
      this.cargando = true;
      return this.lecturaService.postConsultaDeClientesPorFiltro(this.fechaInicio, this.fechaCierre, filterValue, this.numberFilter);
    }
    return of([]);
  }

  inicializarFiltros(): void {
    this.lecturasFiltradas = this.busquedaControl.valueChanges //MUCHO MEJOR
      .pipe(
        debounceTime(300), // Controla la frecuencia de las emisiones
        distinctUntilChanged(), // Solo pasa valores distintos al anterior
        exhaustMap(value =>
          this._filter(value || '').pipe(
            map(lecturas => {
              this.cargando = false; // Terminar el indicador de carga
              this.lecturas = lecturas;
              return lecturas || []; // Asegurarse de devolver una lista vacía si no hay resultados
            })
          )
        )
      );
  }

  // filtroLecturasPorCliente(event: any): void {
  //   const value = event.target.value;
  //   if (value != '' && value != undefined) {
  //     this.cargando = true;
  //     this.lecturaService.postConsultaDeClientesPorFiltro(this.fechaInicio, this.fechaCierre, value, this.numberFilter).subscribe({
  //       next: (lecturas) => {
  //         this.cargando = false;
  //         this.lecturas = lecturas
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.cargando = false;
  //         this.lecturas = [];
  //       }
  //     })
  //   } else {
  //     this.filtrarLecturas();
  //   }
  // }

  actualizarLecturaEvt(id: number): void {
    this.router.navigate([`/modificar-lectura/${id}`]);
  }

}
