import { Component } from '@angular/core';
import { FiltroClientesComponent } from './filtro-clientes/filtro-clientes.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';

@Component({
  selector: 'app-form-lectura',
  standalone: true,
  imports: [
    FiltroClientesComponent,
    DatosClienteComponent
  ],
  templateUrl: './form-lectura.component.html',
  styleUrl: './form-lectura.component.css'
})
export class FormLecturaComponent {

}
