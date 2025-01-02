import { Component } from '@angular/core';
import { FiltroClientesComponent } from './filtro-clientes/filtro-clientes.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lectura } from '../../../models/lectura';

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

  constructor(){}

}
