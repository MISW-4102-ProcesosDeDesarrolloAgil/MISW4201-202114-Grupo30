import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComentarioComponent } from './comentario.component';
import { CrearComentarioComponent } from './crear-comentario/crear-comentario.component';
import { ResponderComentarioComponent } from './responder-comentario/responder-comentario.component';
import { DatacontainerDirective, ListarComentariosComponent } from './listar-comentarios/listar-comentarios.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ComentarioComponent,
    CrearComentarioComponent,
    ListarComentariosComponent,
    ResponderComentarioComponent,
    DatacontainerDirective
  ],
  providers: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    ComentarioComponent,
    CrearComentarioComponent,
    ListarComentariosComponent,
    ResponderComentarioComponent,
    DatacontainerDirective
  ],
  entryComponents: [],
  bootstrap: [ComentarioComponent]
})
export class ComentarioModule { }
