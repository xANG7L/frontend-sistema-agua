import { Component, input } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LecturasService } from '../../../services/lecturas.service';
import { HttpEventType } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subida-archivos',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
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
    // Swal.fire('Error', 'Servicio no disponible','info');
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

// Método para manejar la selección de archivos
  onFileSelected(event: Event, fileNum: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.name.endsWith('.xlsx')) {
        alert('¡Solo se permiten archivos .xlsx!');
        return;
      }
      switch(fileNum){
        case "01": {
          this.excelClientes = file;
          this.subidaArchivoClientes();
          break;
        }
        case "03": {
          this.excelLecturas = file;
          this.subidaArchivoLecturas();
          break;
        }
        default: {
          Swal.fire('Atencion', 'La opcion seleccionada no esta disponible ahorita', 'info')
        }
      }
      //this.showFileAlert(file, itemName);
      // Trabajar con el archivo...
    } 
  }

  // Método para mostrar el alert con el nombre del archivo
  showFileAlert(file: File, itemName: string): void {
    alert(`Archivo seleccionado para ${itemName}:\n\nNombre: ${file.name}\nTamaño: ${(file.size / 1024).toFixed(2)} KB`);
    console.log('Objeto File:', file); // Para debug en consola
  }

  // Método para simular el clic en el input file
  triggerFileInput(input: HTMLInputElement): void {
    input.click(); // Abre el explorador de archivos
  }

}
