import { Component, Input, OnInit } from '@angular/core';
import { Comunidad } from '../../../../models/comunidad';
import { Cliente } from '../../../../models/cliente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'datos-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './datos-cliente.component.html',
  styleUrl: './datos-cliente.component.css'
})
export class DatosClienteComponent implements OnInit {

  @Input() comunidad!: Comunidad;

  @Input() cliente!: Cliente;

  clientes: Cliente[] = []

  constructor() { }

  ngOnInit(): void {

  }

}
