import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface IDescargaArchivo{
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

  selectedDate: any;

  download() {
    if (this.selectedDate) {
      console.log(`Fecha seleccionada: ${this.selectedDate}`);
      alert(`Fecha seleccionada: ${this.selectedDate}`);
    } else {
      console.log('No se seleccionó ninguna fecha');
      alert('No se seleccionó ninguna fecha');
    }
  }

}
