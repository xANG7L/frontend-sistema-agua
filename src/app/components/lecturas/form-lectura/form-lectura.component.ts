import { Component } from '@angular/core';
import { FiltroClientesComponent } from './filtro-clientes/filtro-clientes.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lectura } from '../../../models/lectura';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-lectura',
  standalone: true,
  imports: [
    FiltroClientesComponent,
    DatosClienteComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './form-lectura.component.html',
  styleUrl: './form-lectura.component.css'
})
export class FormLecturaComponent {

  lectura: Lectura = new Lectura();

  constructor(){
    //this.obtenerFechaActual();
  }

  obtenerFechaActual(): string {
    //console.log(formatDate(new Date(),"yyyy-MM-dd", 'en-En'));
    return formatDate(new Date(),'yyyy-MM-dd', 'en-En');
  }

}
