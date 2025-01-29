import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { descargaExcelDeIngresoDeLecturas } from '../../../store/lectura/lectura.actions';
import Swal from 'sweetalert2';

export interface IDescargaArchivo {
  fecha: Date;
}

@Component({
  selector: 'app-descarga-lecturas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './descarga-lecturas.component.html',
  styleUrl: './descarga-lecturas.component.css'
})
export class DescargaLecturasComponent {

  selectedDate!: Date;

  cargando: boolean = false;

  constructor(
    private store: Store<{ lectura: any }>
  ) {
    this.store.select('lectura').subscribe((state) => {
      this.cargando = state.cargando;
    })
  }

  download() {
    if (this.selectedDate) {
      this.store.dispatch(descargaExcelDeIngresoDeLecturas({ fecha: this.selectedDate }));
    } else {
      Swal.fire('Error', 'Seleccione la fecha de cargos', 'info');
    }
  }

}
