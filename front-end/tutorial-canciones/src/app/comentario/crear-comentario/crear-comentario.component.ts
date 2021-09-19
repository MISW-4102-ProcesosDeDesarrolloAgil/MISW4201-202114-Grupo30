import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from '../comentario';

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

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.commentInfo = [];
    this.commentInfo = this.getListaComentarios();
    this.usercomment.emit(this.commentInfo);
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(this.maxNumberOfCharacters)]]
    });
  }

  getListaComentarios(): Array<object> {
    //To do: implementar la lògica del servicio de backend correspondiente
    if (this.commentInfo.length == 0)
    {

      let comentario = new Comentario( this.id++,
        new Date(),
        'Esta pieza me parece una obra de arte',
        'Clayderman',
        this.userId,
        this.resourceId,
        this.resourceType );

        let comentario2 = new Comentario( this.id++,
          new Date(),
          'Cuando esta agrupacion musical estaba en sus mejores momentos',
          'Jhina',
          this.userId,
          this.resourceId,
          this.resourceType );

          this.commentInfo.push(comentario);
          this.commentInfo.push(comentario2);
    }
    return this.commentInfo;
  }

  crearComentario(comentario: Comentario): boolean{
    //To do: implementar la lògica del servicio de backend correspondiente
    this.commentInfo.push(comentario);
    this.showSuccess();
    return true;
  }


  onSubmit() {
    this.submitted = true;
    if (!this.commentForm.invalid) {

      let comentario = new Comentario(  this.id++,
        new Date(),
        this.commentForm.controls['comment'].value,
        'Clayderman',
        this.userId,
        this.resourceId,
        this.resourceType );

      if (this.crearComentario(comentario))
      {
        this.commentInfo = this.getListaComentarios();
        this.usercomment.emit(this.commentInfo);
        this.commentForm.reset();
        this.numberOfCharacters = 0;
      }
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

  showSuccess() {
    this.toastr.success(`El comentario se agregó correctamente.`, "Creación exitosa");
  }


}
