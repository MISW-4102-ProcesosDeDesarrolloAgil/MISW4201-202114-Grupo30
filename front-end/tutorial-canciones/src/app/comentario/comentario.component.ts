import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Comentario } from './comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})

export class ComentarioComponent implements OnInit {

  comments: Array<Comentario> = [];
  count: number;
  constructor() { }

  @Input() userId: number;
  @Input() token: string;
  @Input() resourceId: number;
  @Input() resourceType: string;

  ngOnInit() {
    this.count = 0;
  }

  receiveComment($event: Array<Comentario> = []) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event: Array<Comentario> = []) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
