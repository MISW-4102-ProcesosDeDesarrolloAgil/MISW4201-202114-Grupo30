import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  numberOfCharacters = 0;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(this.maxNumberOfCharacters)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.commentForm.invalid) {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: [],
        user_name: 'Clayderman'
      });
      this.usercomment.emit(this.commentInfo);
      this.showSuccess();
      this.commentForm.reset();
      this.numberOfCharacters = 0;
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
