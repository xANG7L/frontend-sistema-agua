import { Component } from '@angular/core';
import { Lectura } from '../../../models/lectura';
import { Store } from '@ngrx/store';
import { obtenerLecturasPorDia } from '../../../store/lectura/lectura.actions';
import { formatDate } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'consulta-lecturas',
  standalone: true,
  imports: [
    NgxPaginationModule
  ],
  templateUrl: './consulta-lecturas.component.html',
  styleUrl: './consulta-lecturas.component.css'
})
export class ConsultaLecturasComponent {

  lecturas: Lectura[] = []
  cargando: boolean = true;

  p: number = 1;

  constructor(
    private store: Store<{ lectura: any }>,
    private router: Router
  ) {
    this.store.select('lectura').subscribe(state => {
      this.lecturas = state.lecturas;
      this.cargando = state.cargando;
    })
  }

  consultarLecturas(event: any): void {
    const fecha = event.target.value as Date;
    this.store.dispatch(obtenerLecturasPorDia({ fecha }));
  }

  fechaFormateada(date:Date): string{
    return formatDate(date,"dd/MM/yyyy",'en')
  }

  actualizarLecturaEvt(id:number): void{
    this.router.navigate([`/modificar-lectura/${id}`]);
  }

}
