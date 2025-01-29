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



  actualizarLecturaEvt(id: number): void {
    this.router.navigate([`/modificar-lectura/${id}`]);
  }

}
