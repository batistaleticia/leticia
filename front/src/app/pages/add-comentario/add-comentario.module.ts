import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddComentarioPageRoutingModule } from './add-comentario-routing.module';

import { AddComentarioPage } from './add-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddComentarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddComentarioPage]
})
export class AddComentarioPageModule {}
