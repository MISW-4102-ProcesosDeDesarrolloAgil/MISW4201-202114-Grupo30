import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Comentario } from '../comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})

export class CrearComentarioComponent implements OnInit {

  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  @Output() usercomment = new EventEmitter();

  @Input()
  maxNumberOfCharacters = 1000;

  @Input() userId: number;
  @Input() token: string;
  @Input() resourceId: number;
  @Input() resourceType: string;

  numberOfCharacters = 0;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private usuarioServicio: UsuarioService,
    private routerPath: Router,
    private comentarioService: ComentarioService) { }

  ngOnInit() {
    this.createForm();
    this.commentInfo = [];
    this.getListaComentarios();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(this.maxNumberOfCharacters)]]
    });
  }

  getListaComentarios() {
      this.comentarioService.getComentarios(this.resourceId, this.resourceType)
      .subscribe(comentarios => {
        this.commentInfo = comentarios
        this.usercomment.emit(this.commentInfo);
      },
      error => {
        console.log(error)
      })
  }

  crearComentario(comentario: Comentario): boolean{
    if (comentario.texto) {
      this.comentarioService.comentarRecurso(comentario.usuario, comentario.texto, this.resourceId, this.resourceType, this.token)
        .subscribe(recurso => {
          this.showSuccess(comentario)
          this.commentForm.reset();
          this.numberOfCharacters = 0;
          this.getListaComentarios();
        },
          error => {
            console.log(error)
            if (error.error) {
              this.showError(error.error + "")
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
          this.showError("El texto del comentario es requerido.")
        }
    return false;
  }


  onSubmit() {
    this.submitted = true;
    if (!this.commentForm.invalid) {

      let comentario = new Comentario( this.id++,
        this.userId,
        this.commentForm.controls['comment'].value,
        this.resourceId,
        this.resourceId,
        '',
        new Date() );

      this.crearComentario(comentario);
    }
  }

  cancelCreate() {

  }

  onModelChange(textValue: string): void {
    if (textValue !== null)
    {
      this.numberOfCharacters = textValue.length;
    }
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(comentario: Comentario) {
    this.toastr.success(`El comentario se agregó correctamente.`, "Creación exitosa");
  }

  cerrarSession() {
    this.usuarioServicio.cerrarSession();
    this.routerPath.navigate(['/auth']);
  }

}
