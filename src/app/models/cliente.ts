import { Comunidad } from "./comunidad";

export class Cliente {
    codigo: string = '';
    nombre: string = '';
    direccion: string = '';
    telefono: string = '';
    medidor: string = '';
    comunidad!: Comunidad;
}