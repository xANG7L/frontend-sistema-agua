import { Cliente } from "./cliente";

export class Lectura {
    id: number = 0;
    fechaLectura: Date = new Date();
    cliente!: Cliente;
    lecturaAnterior: number = 0;
    lecturaActual: number = 0;
    consumo: number = 0;
}