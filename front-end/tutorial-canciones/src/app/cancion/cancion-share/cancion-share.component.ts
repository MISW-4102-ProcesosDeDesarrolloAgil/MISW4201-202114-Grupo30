import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Cancion } from '../cancion';
import { SharedResource } from '../sharedresource';
import { CancionService } from '../cancion.service';
import { NotificacionService } from 'src/app/app-home/notificacion.service';
import { RecursoAlbum } from 'src/app/album/recurso_album';

@Component({
  selector: 'app-cancion-share',
  templateUrl: './cancion-share.component.html',
  styleUrls: ['./cancion-share.component.css']
})
export class CancionShareComponent implements OnInit {

  @Input() cancion: Cancion;

  userId: number;
  token: string;

  constructor(
    private cancionService: CancionService,
    private toastr: ToastrService,
    private usuarioServicio: UsuarioService,
    public dialogRef: MatDialogRef<CancionShareComponent>,
    private router: ActivatedRoute,
    private routerPath: Router,
    private notificacionService: NotificacionService,
    @Inject(MAT_DIALOG_DATA) public data: SharedResource) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  shareCancion() {
    if (this.data.users_names) {
    this.cancionService.compartirCancion(this.data.cancion_id, this.data.users_names, this.data.userId, this.data.token)
      .subscribe(recurso => {
        this.showSuccess(this.cancion)
        this.crearNotificacion();
      },
        error => {
          console.log(error)
          if (error.error) {
            this.showError(error.error + "")
            this.routerPath.navigate([`/ionic/canciones/${this.userId}/${this.token}`])
          }
          else if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
            this.cerrarSession();
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
            this.cerrarSession();
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
      }
      else {
        this.showError("El nombre de usuario es requerido.")
      }

  }

  crearNotificacion(){
    this.notificacionService.crearNotificacion(this.data.userId, this.data.token, "COMPARTIR_CANCION", this.data.titulo, this.data.users_names)
    .subscribe(notificacion => {         
      this.routerPath.navigate([`/ionic/canciones/${this.userId}/${this.token}`])
    },
      error => {
        if (error.error) {
          this.showError(error.error)
          this.routerPath.navigate([`/ionic/albumes/${this.userId}/${this.token}`])
        }
        else if (error.statusText === "UNAUTHORIZED") {
          this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          this.cerrarSession();
        }
        else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          this.cerrarSession();
        }
        else {
          this.showError("Ha ocurrido un error. " + error.message)
        }
      })
  }

  cerrarSession() {
    this.usuarioServicio.cerrarSession();
    this.routerPath.navigate(['/auth']);
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(cancion: Cancion) {
    this.toastr.success(`La canción ${this.data.titulo} se compartió correctamente.`, "Creación exitosa");
  }

}
