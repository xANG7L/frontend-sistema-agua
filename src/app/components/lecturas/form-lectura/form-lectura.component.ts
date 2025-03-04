import { Component, OnInit } from '@angular/core';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Lectura } from '../../../models/lectura';
import { Comunidad } from '../../../models/comunidad';
import { Cliente } from '../../../models/cliente';
import { LecturasService } from '../../../services/lecturas.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-form-lectura',
  standalone: true,
  imports: [
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

  isAdmin: boolean = false;

  errors: any = {};

  constructor(
    private service: LecturasService,
    private route: ActivatedRoute,
    private router: Router,
    private authServie: AuthService
  ) {
    //this.obtenerFechaActual();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.consultarProducto(id);
      } else {
        this.lectura.fechaLectura = this.fechaActual();
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
    console.log(this.lectura);
    if (this.lectura.id > 0) {
      this.service.putActualizarLectura(this.lectura).subscribe({
        next: () => {
          this.errors = {};
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
            //console.log('error 400')
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
          //alert('Lectura aniadida')
          this.errors = {};
          Swal.fire({
            title: "Lectura registrada!",
            icon: "success",
            draggable: true
          });
          lecturaForm.resetForm();
          this.lectura = new Lectura();
          this.lectura.fechaLectura = this.fechaActual();
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
