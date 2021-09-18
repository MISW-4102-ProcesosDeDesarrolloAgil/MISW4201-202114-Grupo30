import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../usuario/usuario.service';
import { Notificacion } from '../notificacion';
import { NotificacionService } from '../notificacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notificaciones: Notificacion[];
  cantidad:number = 0;

  get session(){
     return this.usuarioServicio.session;
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioServicio: UsuarioService,
    private notificacionService: NotificacionService) {}

  ngOnInit(): void {   
  }

  consultarNotificaciones(){
    if (this.session.id){    
      this.notificacionService.getNotificacionesUsuario(this.session.id)
      .subscribe(notificacion => {  
        this.notificaciones = notificacion;
        this.cantidad = this.notificaciones.length;
        console.log(this.notificaciones)        
      },
        error => {    
            this.showError(error.error)
        })
    }
  }

  cerrarSession() {
    this.usuarioServicio.cerrarSession();
    this.router.navigate(['/auth']);
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

}
