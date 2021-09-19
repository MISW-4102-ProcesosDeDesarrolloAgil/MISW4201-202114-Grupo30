import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Notificacion } from './notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private backUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getNotificacionesUsuario(usuario: number): Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>(`${this.backUrl}/usuario/${usuario}/notificaciones`)
  }

  crearNotificacion(idUsuario: number, token: string, tipo:string, nombre:string, usuario: string):Observable<Notificacion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    let notificacion = new Notificacion(nombre,tipo,usuario);
    console.log(notificacion);
    return this.http.post<Notificacion>(`${this.backUrl}/usuario/${idUsuario}/notificaciones`, notificacion, {headers: headers})
  }

  

}
