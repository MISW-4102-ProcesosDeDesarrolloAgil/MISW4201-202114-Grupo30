export class Comentario {

  comentario_id: number;
  usuario: number;
  texto: string;
  album_id: number;
  cancion_id: number;
  nombre_usuario: string;
  time: Date;

  constructor(comentario_id: number,
    usuario: number,
    texto: string,
    album_id: number,
    cancion_id: number,
    nombre_usuario: string,
    time: Date) {

      this.comentario_id = comentario_id;
      this.usuario = usuario;
      this.texto = texto;
      this.album_id = album_id;
      this.cancion_id = cancion_id;
      this.nombre_usuario = nombre_usuario;
      this.time = time;

    }

}
