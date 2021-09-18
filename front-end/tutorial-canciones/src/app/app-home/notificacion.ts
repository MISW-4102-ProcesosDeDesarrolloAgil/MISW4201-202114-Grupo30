
export class Notificacion {
    id: number;
    mensaje: string;
    fecha_registro: Date;
    tipo: string;
    nombre: string;
    usuarios: string;

    constructor(
        nombre: string,
        tipo: string,
        usuarios: string
    ){
        this.nombre = nombre,
        this.tipo = tipo,
        this.usuarios = usuarios
    }
}
