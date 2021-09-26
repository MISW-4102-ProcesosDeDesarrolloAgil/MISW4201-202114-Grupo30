import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private backUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  comentarRecurso(id_usuario: number, texto: string, id_recurso: number, tipo_recurso: string, token: string):Observable<Comentario> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    if (tipo_recurso === 'ALBUM')
    {
      return this.http.post<Comentario>(`${this.backUrl}/comentario`,
      {
        "usuario": id_usuario,
        "texto": texto,
        "album_id": id_recurso
      },
      {headers: headers})

    }
    else
    {
      return this.http.post<Comentario>(`${this.backUrl}/comentario`,
      {
        "usuario": id_usuario,
        "texto": texto,
        "cancion_id": id_recurso
      },
      {headers: headers})
    }

}

getComentarios(id_recurso: number, tipo_recurso: string): Observable<Comentario[]>{
  return this.http.get<Comentario[]>(`${this.backUrl}/comentario/${id_recurso}/${tipo_recurso}`)
}

}
