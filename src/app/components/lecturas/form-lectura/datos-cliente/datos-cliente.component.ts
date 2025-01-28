import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comunidad } from '../../../../models/comunidad';
import { Cliente } from '../../../../models/cliente';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, exhaustMap, map, of } from 'rxjs';
import { ClienteService } from '../../../../services/cliente.service';
import { IParamsClientes } from '../../../../interfaces/iparams.interface';

@Component({
  selector: 'datos-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe
  ],
  templateUrl: './datos-cliente.component.html',
  styleUrl: './datos-cliente.component.css'
})
export class DatosClienteComponent implements OnInit {

  @Input() cliente!: Cliente;

  @Output() clienteEventEmitter: EventEmitter<Cliente> = new EventEmitter();

  clientes: Cliente[] = []

  clientesFiltrados!: Observable<Cliente[]>;

  filtroClientes = new FormControl('');

  filtrando: boolean = false;

  parametrosBusqueda: IParamsClientes[] = [
    {
      filter: 1,
      name: "Nombre"
    },
    {
      filter: 2,
      name: "Codigo"
    },
    {
      filter: 1,
      name: "Medidor"
    },
  ];

  numberFilter: number = 1;

  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.inicializarFiltros();
  }

  private _filter(value: string): Observable<Cliente[]> {
    let filterValue = typeof value === 'string' ? value.toLowerCase().trim() : '';

    if (filterValue != '' && filterValue != undefined) {
      //console.log('buscando');
      this.filtrando = true;
      return this.service.getFiltrarClientesPorNombre(filterValue);
    }
    return of([]);
  }

  inicializarFiltros(): void {
    this.clientesFiltrados = this.filtroClientes.valueChanges
      .pipe(
        exhaustMap(value => this._filter(value || '')
          .pipe(
            map(clientes => {
              this.filtrando = false;
              return clientes ? clientes : []
            })
          ))
      )
  }

  seleccionarCliente(event: MatAutocompleteSelectedEvent): void {
    const cliente = event.option.value as Cliente;
    if (cliente != undefined || cliente != null) {
      this.clienteEventEmitter.emit(cliente);
    }
    this.filtroClientes.setValue('');
    event.option.focus();
    event.option.deselect();

  };

  mostrarCliente(cliente?: Cliente): any {
    return cliente ? cliente.nombre : '';
  }

}
