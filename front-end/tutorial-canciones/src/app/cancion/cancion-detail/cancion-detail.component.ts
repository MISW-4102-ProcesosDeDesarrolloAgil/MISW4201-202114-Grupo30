import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioComponent } from 'src/app/comentario/comentario.component';
import { Usuario } from 'src/app/usuario/usuario';
import { Cancion } from '../cancion';
import { CancionShareComponent } from '../cancion-share/cancion-share.component';
import { CancionService } from '../cancion.service';

@Component({
  selector: 'app-cancion-detail',
  templateUrl: './cancion-detail.component.html',
  styleUrls: ['./cancion-detail.component.css']
})


export class CancionDetailComponent implements OnInit {

  //@ViewChild (ComentarioComponent) comentarioComponent: ComentarioComponent;

  @Input() cancion: Cancion;
  @Output() deleteCancion = new EventEmitter();
  @Output() mostrarComentarios = new EventEmitter();

  userId: number;
  token: string;
  displayedColumns: string[] = ['titulo', 'anio', 'medio'];
  mostrarCompartidosCancion: Array<Usuario>
  displayedColumnsCompartidos: string[] = ['nombre'];
  users_names: string;

  constructor(
    private cancionService: CancionService,
    private router: ActivatedRoute,
    private routerPath: Router,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
  }

  ngOnChanges() {
    this.getUsuariosCompartidos()
    //this.comentarioComponent.resourceId = this.cancion.id;
    //this.comentarioComponent.resourceType = 'CANCION';
    //console.log(this.cancion);
  }

  eliminarCancion(){
    this.deleteCancion.emit(this.cancion.id)
  }

  goToEdit(){
    this.routerPath.navigate([`/ionic/canciones/edit/${this.cancion.id}/${this.userId}/${this.token}`])
  }

  getUsuariosCompartidos() {
    if (this.cancion !== undefined) {
      this.cancionService.getUsuariosCompartidos(this.cancion.id)
      .subscribe(compartidos => {
        this.mostrarCompartidosCancion = compartidos
      },
      error => {
        console.log(error)
      })
    }

  }

  openDialog(cancion: Cancion): void {
    const dialogRef = this.dialog.open(CancionShareComponent, {
      width: '250px',
      data: {
        users_names: this.users_names,
        cancion_id: cancion.id,
        titulo: cancion.titulo,
        userId: this.userId,
        token: this.token
      }
    });
  }


}
