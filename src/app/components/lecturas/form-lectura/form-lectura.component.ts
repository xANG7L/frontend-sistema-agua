import { Component, OnInit } from '@angular/core';
import { FiltroClientesComponent } from './filtro-clientes/filtro-clientes.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Lectura } from '../../../models/lectura';
import { formatDate } from '@angular/common';
import { Comunidad } from '../../../models/comunidad';
import { Cliente } from '../../../models/cliente';
import { LecturasService } from '../../../services/lecturas.service';
import Swal from 'sweetalert2';

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
export class FormLecturaComponent implements OnInit {

  comunidad: Comunidad = new Comunidad();

  lectura: Lectura = new Lectura();

  errors: any = {};

  constructor(
    private service: LecturasService
  ) {
    //this.obtenerFechaActual();
  }
  ngOnInit(): void {
    // this.lectura.fechaLectura = new Date();
  }

  setearComunidad(comunidad: Comunidad) {
    console.log(comunidad);
    this.comunidad = comunidad;
  }

  setearCliente(cliente: Cliente) {
    this.lectura.cliente = cliente;
  }

  fechaActual(): string {
    return new Date().toISOString().slice(0, 10);
  }

  onSubmit(lecturaForm: NgForm): void {
    console.log(this.lectura);
    this.service.postLectura(this.lectura).subscribe({
      next: () => {
        //alert('Lectura aniadida')
        this.errors = {};
        Swal.fire({
          title: "Lectura registrada!",
          icon: "success",
          draggable: true
        });
        this.lectura = new Lectura();
        lecturaForm.resetForm();
      },
      error: err => {
        if (err.status == 400) {
          //console.log('error 400')
          this.errors = err.error;
        } else {
          alert('lectura no ingresada, revize la consola')
        }
      }
    })

  }

}
