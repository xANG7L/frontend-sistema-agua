import { Component } from '@angular/core';
import { Lectura } from '../../../models/lectura';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LecturasService } from '../../../services/lecturas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth.service';
import { IParamsClientes } from '../../../interfaces/iparams.interface';

@Component({
  selector: 'consulta-lecturas',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    DatePipe,
    MatTooltipModule
  ],
  templateUrl: './consulta-lecturas.component.html',
  styleUrl: './consulta-lecturas.component.css'
})
export class ConsultaLecturasComponent {

  lecturas: Lectura[] = []

  cargando: boolean = false;

  fechaInicio!: Date;

  fechaCierre!: Date;

  p: number = 1;

  isAdmin: boolean = false;

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

  filtroLecturasPorCliente(event: any): void {
    const value = event.target.value;
    if (value != '' && value != undefined) {
      this.cargando = true;
      this.lecturaService.postConsultaDeClientesPorFiltro(this.fechaInicio, this.fechaCierre, value, this.numberFilter).subscribe({
        next: (lecturas) => {
          this.cargando = false;
          this.lecturas = lecturas
        },
        error: (err: HttpErrorResponse) => {
          this.cargando = false;
          this.lecturas = [];
        }
      })
    } else {
      this.filtrarLecturas();
    }
  }

  actualizarLecturaEvt(id: number): void {
    this.router.navigate([`/modificar-lectura/${id}`]);
  }

}
