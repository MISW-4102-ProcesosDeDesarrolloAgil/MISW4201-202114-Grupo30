import { Usuario } from "../usuario/usuario";

export class Album {

    id: number;
    titulo: string;
    anio: number;
    descripcion: string;
    medio: Medio;
    usuario: number;
    interpretes: Array<string>;
    canciones: Array<Cancion>;
    compartidos: Array<any>;
    propio: number;

    constructor(
        id: number,
        titulo: string,
        anio: number,
        descripcion: string,
        medio: Medio,
        usuario: number,
        interpretes: Array<string>,
        canciones: Array<Cancion>,
        compartidos: Array<any>,
        propio: number
    ){
        this.id = id,
        this.titulo = titulo,
        this.anio = anio,
        this.descripcion = descripcion,
        this.medio = medio,
        this.usuario = usuario,
        this.interpretes = interpretes,
        this.canciones = canciones,
        this.compartidos = compartidos,
        this.propio = propio
    }
}

export class Medio{
    llave: string;
    valor: number

    constructor(
        llave: string,
        valor:number
    ){
        this.llave = llave,
        this.valor = valor
    }
}

export class Cancion{
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete
    }
}
