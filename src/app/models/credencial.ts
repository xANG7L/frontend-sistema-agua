import { Usuario } from "./usuario";

export class Credencial {
    usuario!: Usuario;
    admin: boolean = false;
    isAuth: boolean = false;
}