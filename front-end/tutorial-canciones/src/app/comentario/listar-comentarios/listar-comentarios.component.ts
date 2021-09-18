import { Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { Comentario } from '../comentario';
import { ResponderComentarioComponent } from '../responder-comentario/responder-comentario.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})

export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
})

export class ListarComentariosComponent implements OnInit, OnChanges {

  @Input() postComment: Array<Comentario> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<Comentario> = [];

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }


  ngOnChanges() {
    if (this.postComment !== undefined) {
    }
  }

  removeComment(no: number) {
    this.postComment.splice(no, 1);
    this.countComments.emit(this.postComment);
  }

  replyComment(index: number) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ResponderComentarioComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment(event: Array<Comentario>, i: number) {
    this.reply = event;
    this.postComment.forEach((element) => {
      /*if (element['commentId'] === i) {
        element['replyComment'].push(...event);
      }*/
    });
    this.loadComponent = false;
  }

}
