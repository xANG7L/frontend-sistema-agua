import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { subirExcelDeClientesParaSincronizarDatos } from '../../../store/cliente/clientes.actions';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subida-archivos',
  standalone: true,
  imports: [],
  templateUrl: './subida-archivos.component.html',
  styleUrl: './subida-archivos.component.css'
})
export class SubidaArchivosComponent {

  excelClientes: File | null = null;

  migrandoArchivo: boolean = false;

  constructor(private storeClientes: Store<{ cliente: any }>) {
    this.storeClientes.select('cliente').subscribe((state) => {
      this.migrandoArchivo = state.cargando;
    })
  }

  subidaArchivo(): void {
    if (this.excelClientes != null) {
      this.storeClientes.dispatch(subirExcelDeClientesParaSincronizarDatos({ file: this.excelClientes}));
    }
  }

  onFileSelected(event: Event): void {
    const archivo = event.target as HTMLInputElement;
    if (archivo.files && archivo.files.length > 0) {
      this.excelClientes = archivo.files[0];
      console.log(archivo.files[0].name);
    }
  }
}
