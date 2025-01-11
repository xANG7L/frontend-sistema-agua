import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { descargaExcelDeIngresoDeLecturas } from '../../../store/lectura/lectura.actions';

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
      console.log(`Fecha seleccionada: ${this.selectedDate}`);
      alert(`Fecha seleccionada: ${this.selectedDate}`);
      this.store.dispatch(descargaExcelDeIngresoDeLecturas({ fecha: this.selectedDate }));
    } else {
      console.log('No se seleccionó ninguna fecha');
      alert('No se seleccionó ninguna fecha');
    }
  }

}
