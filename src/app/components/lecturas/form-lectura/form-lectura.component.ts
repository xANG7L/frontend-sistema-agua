import { Component, OnInit } from '@angular/core';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Lectura } from '../../../models/lectura';
import { Comunidad } from '../../../models/comunidad';
import { Cliente } from '../../../models/cliente';
import { LecturasService } from '../../../services/lecturas.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-form-lectura',
  standalone: true,
  imports: [
    DatosClienteComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './form-lectura.component.html',
  styleUrl: './form-lectura.component.css'
})
export class FormLecturaComponent implements OnInit {

  comunidad: Comunidad = new Comunidad();

  lectura: Lectura = new Lectura();

  isAdmin: boolean = false;

  errors: any = {};

  ingresando: boolean = false;

  constructor(
    private service: LecturasService,
    private route: ActivatedRoute,
    private router: Router,
    private authServie: AuthService
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.consultarProducto(id);
      } else {
        this.lectura.fechaLectura = Utils.getFechaActual();
      }
    })
    this.isAdmin = this.authServie.isAdmin;
    // this.lectura.fechaLectura = new Date();
  }

  setearCliente(cliente: Cliente) {
    this.lectura.cliente = cliente;
  }

  fechaActual(): any {
    return new Date().toISOString().slice(0, 10);
  }

  onSubmit(lecturaForm: NgForm): void {
    this.errors = {};
    this.ingresando = true;
    if (this.lectura.id > 0) {
      this.service.putActualizarLectura(this.lectura).subscribe({
        next: () => {
          this.errors = {};
          this.ingresando = false;
          Swal.fire({
            title: "Lectura actualizada!",
            icon: "success",
            draggable: true
          });
          this.lectura = new Lectura();
          lecturaForm.resetForm();
          this.router.navigate(['/ingreso-lectura']);
        },
        error: (err) => {
          if (err.status == 400) {
            
            this.ingresando = false;
            this.errors = err.error;
          } else {
            alert('lectura no actualizada, revize la consola')
          }
        }
      }
      )
    } else {
      this.service.postLectura(this.lectura, this.authServie.usuarioId).subscribe({
        next: () => {
          this.errors = {};
          Swal.fire({
            title: "Lectura registrada!",
            icon: "success",
            draggable: true
          });
          lecturaForm.resetForm();
          this.lectura = new Lectura();
          this.ingresando = false;
          this.lectura.fechaLectura = this.fechaActual();
        },
        error: err => {
          if (err.status == 400) {
            console.log('error 400')
            console.log(err)
            this.ingresando = false;
            this.errors = err.error;
          } else {
            alert('lectura no ingresada, revize la consola')
          }
        }
      })
    }

  }

  consultarProducto(id: number): void {
    this.service.getLecturaById(id).subscribe({
      next: lectura => this.lectura = lectura,
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: err.error,
          icon: 'error'
        }).then(() => this.router.navigate(['/consulta-lectura']))
      }
    })
  }

}
