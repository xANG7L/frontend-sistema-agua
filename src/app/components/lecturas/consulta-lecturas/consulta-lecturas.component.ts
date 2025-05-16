import { Component, OnInit } from '@angular/core';
import { Lectura } from '../../../models/lectura';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LecturasService } from '../../../services/lecturas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth.service';
import { IParamsClientes } from '../../../interfaces/iparams.interface';
import { debounceTime, distinctUntilChanged, exhaustMap, map, Observable, of, Subject } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'consulta-lecturas',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    DatePipe,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterLink
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

  idUsuario: number = 0;

  // busquedaControl = new FormControl('');

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

  busquedaValue = new Subject<string>();

  numberFilter: number = 1;


  constructor(
    private router: Router,
    private lecturaService: LecturasService,
    private authService: AuthService
  ) {
    this.fechaInicio = Utils.getFechaActual();
    this.fechaCierre = Utils.getFechaActual();
  }
  ngOnInit(): void {
    this.inicializarFiltros();
    this.isAdmin = this.authService.isAdmin;
    this.idUsuario = this.authService.usuarioId;
  }

  filtrarLecturas(): void {
    if (this.fechaInicio && this.fechaCierre) {
      this.cargando = true;
      if (this.isAdmin) {
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
        this.lecturaService.getLecturasPorRangoDeFechaYUsuario(this.fechaInicio, this.fechaCierre, this.idUsuario).subscribe({
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

      }
    } else {
      Swal.fire('Error', 'Ingrese el rango de fechas', 'error')
    }
  }

  private _filter(value: string): Observable<Lectura[]> {
    let filterValue = typeof value === 'string' ? value.toLowerCase().trim() : '';
    // console.log('buscando');
    this.p = 1;
    if (this.fechaInicio && this.fechaCierre) {
      this.cargando = true;
      if (filterValue != '' && filterValue != undefined) {
        if (this.isAdmin) {
          return this.lecturaService.postConsultaDeClientesPorFiltro(this.fechaInicio, this.fechaCierre, filterValue, this.numberFilter);
        } else {
          return this.lecturaService.postConsultaDeClientesPorFiltroPorUsuario(this.fechaInicio, this.fechaCierre, filterValue, this.numberFilter, this.idUsuario);
        }
      }
      if (this.isAdmin) {
        return this.lecturaService.getLecturasPorRangoDeFecha(this.fechaInicio, this.fechaCierre);
      } else {
        return this.lecturaService.getLecturasPorRangoDeFechaYUsuario(this.fechaInicio, this.fechaCierre, this.idUsuario);
      }
    }
    return of([]);
  }


  inicializarFiltros(): void {
    this.busquedaValue.pipe(
      debounceTime(300), // Espera 300ms después de la última tecla presionada
      distinctUntilChanged()
    ).subscribe(value => {
      this._filter(value).subscribe(lecturas => {
        this.cargando = false;
        this.lecturas = lecturas;
      });
    });

  }

  onKeyUp(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.busquedaValue.next(value);
  }

  actualizarLecturaEvt(id: number): void {
    this.router.navigate([`/modificar-lectura/${id}`]);
  }

}
