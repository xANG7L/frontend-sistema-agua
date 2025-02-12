import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ClienteService } from '../../../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { LecturasService } from '../../../../services/lecturas.service';

@Component({
  selector: 'app-reportes-auxiliares',
  standalone: true,
  imports: [
    MatTooltip,
    FormsModule
  ],
  templateUrl: './reportes-auxiliares.component.html',
  styleUrl: './reportes-auxiliares.component.css'
})
export class ReportesAuxiliaresComponent {

  fechaInicio!: Date;

  fechaCierre!: Date;

  descargandoArchivo: boolean = false;

  constructor(
    private _clienteService: ClienteService,
    private _lecturaService: LecturasService
  ) {
    this.fechaInicio = this.fechaActual();
    this.fechaCierre = this.fechaActual();
  }

  fechaActual(): any {
    return new Date().toISOString().slice(0, 10);
  }

  generarReporteClientes() {
    if (this.fechaInicio && this.fechaCierre) {
      this.descargandoArchivo = true;
      this._clienteService.descargarReporteClientesSinLecturas(this.fechaCierre).subscribe({
        next: (response: HttpResponse<Blob>) => {
          const pdfCliente = response.body!;
          const date: string = this.fechaCierre.toString();
          const anio = date.substring(0, 4);
          const month = date.substring(5, 7);
          //let fileName = `DescargaBitacoraPrueba.pdf`;
          // Crea la URL del Blob y descarga el archivo
          const blobUrl = URL.createObjectURL(pdfCliente);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `Clientes_sin_lecturas_grabadas_${month}_${anio}.pdf`;
          link.click();
          URL.revokeObjectURL(blobUrl);
          this.descargandoArchivo = false;
          Swal.fire(
            'Exito',
            'Descarga de reporte realizado',
            'success'
          )
        },
        error: () => {
          Swal.fire('Error inesperado', 'Intentelo mas tarde', 'error')
          this.descargandoArchivo = false;
        }

      })
    } else {
      Swal.fire('Digite el rango de fechas correctamente', '', 'info')
    }
  }

  descargarExcelLecturas(): void {
    if (this.fechaInicio && this.fechaCierre) {
      this.descargandoArchivo = true;
      this._lecturaService.generarExcelDeLecturas(this.fechaCierre).subscribe({
        next: (res: HttpResponse<Blob>) => {
          const date: string = this.fechaCierre.toString();
          const anio = date.substring(0, 4);
          const month = date.substring(5, 7);
          const blob = res.body!;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `LecturasGravadas_${month}_${anio}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(url);
          this.descargandoArchivo = false;
          Swal.fire(
            'Exito',
            'Descarga de lecturas realizadas, valide los datos antes de ingresar a OPTIMO',
            'success'
          )
        },
        error: (err) => {
          if (err.status == 500) {
            Swal.fire({
              title: 'ALERTA',
              text: 'Error al descargar el excel, error en el servidor',
              icon: 'error'
            })
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al descargar el excel, intentelo mas tarde',
              icon: 'error'
            })
          }
          this.descargandoArchivo = false;
        }
      })
    } else {
      Swal.fire('Digite el rango de fechas correctamente', '', 'info')
    }

  }

}
