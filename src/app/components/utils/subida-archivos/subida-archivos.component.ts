import { Component, input } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LecturasService } from '../../../services/lecturas.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-subida-archivos',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './subida-archivos.component.html',
  styleUrl: './subida-archivos.component.css'
})
export class SubidaArchivosComponent {

  excelClientes: File | null = null;

  excelLecturas: File | null = null;

  excelComunidades: File | null = null;

  migrandoArchivo: boolean = false;

  uploadProgress: number | null = null;

  constructor(
    private _clienteService: ClienteService,
    private _lecturaService: LecturasService,
  ) {

  }

  subidaArchivoClientes(): void {
    if (this.excelClientes) {
      this.migrandoArchivo = true;
      this._clienteService.subidaMasivaDeExcelClientes(this.excelClientes).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.migrandoArchivo = false;
            setTimeout(() => {
              this.uploadProgress = null;
              Swal.fire(
                'Clientes migrados exitosamente',
                event.mensaje,
                'success'
              ).then(() => window.location.reload());
            }, 500);
          }
        },
        error: () => {
          this.migrandoArchivo = false;
          //   alert('ERROR')
          Swal.fire(
            'Error',
            'Error en la subida de clientes, intentelo mas tarde',
            'error'
          );
        }
      })
    } else {
      Swal.fire(
        'Seleccione el archivo de excel',
        '',
        'info'
      );
    }
  }

  subidaArchivoLecturas(): void {
    if (this.excelLecturas) {
      this.migrandoArchivo = true;
      this._lecturaService.subidaMasivaDeLecturas(this.excelLecturas).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.migrandoArchivo = false;
            setTimeout(() => {
              this.uploadProgress = null;
              Swal.fire(
                'Lecturas migradas exitosamente',
                '',
                'success'
              ).then(() => window.location.reload());
            }, 500);
          }
        },
        error: () => {
          this.migrandoArchivo = false;
          this.uploadProgress = null;
          Swal.fire(
            'Error al migrar lecturas',
            '',
            'warning'
          )
        }
      })
    } else {
      Swal.fire(
        'Seleccione el archivo de excel',
        '',
        'info'
      );
    }
  }

  onFileClientesSelected(event: Event): void {
    const archivo = event.target as HTMLInputElement;
    if (archivo.files && archivo.files.length > 0) {
      this.excelClientes = archivo.files[0];
      console.log(archivo.files[0].name);
    }
  }
  onFileComunidadesSelected(event: Event): void {
    const archivo = event.target as HTMLInputElement;
    if (archivo.files && archivo.files.length > 0) {
      this.excelComunidades = archivo.files[0];
      console.log(archivo.files[0].name);
    }
  }
  onFileLecturasSelected(event: Event): void {
    const archivo = event.target as HTMLInputElement;
    if (archivo.files && archivo.files.length > 0) {
      this.excelLecturas = archivo.files[0];
      console.log(archivo.files[0].name);
    }
  }
}
