import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Proyecto } from '../../../../models/proyecto';
import { ComunidadService } from '../../../../services/comunidad.service';
import { Comunidad } from '../../../../models/comunidad';

@Component({
  selector: 'filtro-clientes',
  standalone: true,
  imports: [],
  templateUrl: './filtro-clientes.component.html',
  styleUrl: './filtro-clientes.component.css'
})
export class FiltroClientesComponent implements OnInit {

  proyectos: Proyecto[] = [];

  comunidades: Comunidad[] = [];

  @Output() comunidadEventEmitter: EventEmitter<Comunidad> = new EventEmitter();

  //filtrandoComunidades: boolean = false;

  constructor(
    private service: ComunidadService
  ) { }

  ngOnInit(): void {
    this.listarProyectos();
    this.listarComunidades();
  }

  listarProyectos(): void {
    this.service.getProyectos().subscribe({
      next: proyectos => {
        this.proyectos = proyectos
      },
      error: () => alert('Error al obtener los proyectos')
    })
  }

  listarComunidades(): void {
    this.service.getComunidades().subscribe({
      next: comunidades => this.comunidades = comunidades,
      error: () => alert('Error al obtener las comunidades')
    })
  }

  filtrarComunidadesByProyecto(event: any) {
    const codigo: string = event.target.value;
    if (codigo != undefined && codigo != '') {
      this.service.getComunidadesByProyecto(codigo).subscribe({
        next: comunidades => this.comunidades = comunidades,
        error: () => alert('Error al obtener las comunidades')
      })
    } else {
      this.listarComunidades();
    }
  }

  emitirFiltroComunidad(event: any) {
    const codigo = event.target.value;
    this.comunidadEventEmitter.emit(this.comunidades.find(comunidad => comunidad.codigo === codigo) || new Comunidad());
  }
}
